import React from 'react';

import { URL, API } from '../../app_constants'
import { Upload, Icon, Modal, message } from 'antd';

message.config({
    top: 150,
    duration: 1,
});

import { getFileList, deleteFile } from './request_element'

class PicturesWall extends React.Component {
	constructor(props) {
        super(props);
		this.handleCancel = this.handleCancel.bind(this)
		this.handlePreview = this.handlePreview.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		this.mutation = this.mutation.bind(this)
		
		this.state = {
			previewVisible: false,
			previewImage: '',
			fileList: [],
		};
    }
    handleCancel() {
		this.setState({ previewVisible: false })
	}
	handlePreview(file) {
		this.setState({
			previewImage: file.url || file.thumbUrl,
			previewVisible: true,
		})
	}
	handleChange(event) {
		if(event.file.status == 'done') {
			event.fileList[event.fileList.length - 1].deleteKey = event.file.response.id
		}
		this.setState({ fileList: event.fileList })
	}
	getFiles(data) {
		var requestsObject = {
			object: data.object,
			id: data.id
		}
		getFileList(requestsObject).then(data => {
			this.mutation(data)
		}, error => {
			message.error('Ошибка получения файлов!')
		})
	}
	mutation(files) {
		var result = []
		files.forEach(elem => {
			result.push({
				uid: elem.id,
				deleteKey: elem.id,
				name: elem.doc.name,
				status: 'done',
				url: `${URL}/${elem.doc.path}`
			})
		})
		this.setState({ fileList: result })
	} 
	handleRemove(file) {
		deleteFile({id: file.deleteKey}).then(data => {
			
		}, error => {
			message.error('Ошибка удаления файла!')
		})
	}
	componentWillReceiveProps(nextProps) {
		if(this.props.data.object != nextProps.data.object || this.props.data.id != nextProps.data.id) {
			this.getFiles(nextProps.data)
		}
	}
	componentWillMount() {
		this.getFiles(this.props.data)
	}
	render() {
		const { previewVisible, previewImage, fileList } = this.state
		const { object, id } = this.props.data

		return (
			<div className="clearfix" style={{marginTop: '20px'}}>
				<Upload
					action={`${URL}/upload_file`}
					withCredentials={true}
					data={{id: id,
							object: object}}
					listType="picture-card"
					fileList={fileList}
					onPreview={this.handlePreview}
					onChange={this.handleChange}
					onRemove={this.handleRemove}>
					<div>
						<Icon type="plus" />
						<div className="ant-upload-text">Загрузить</div>
					</div>
				</Upload>
				<Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
					<img alt="example" style={{ width: '100%' }} src={previewImage} />
				</Modal>
		  </div>
		)
	}
}

export default PicturesWall