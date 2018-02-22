import React from 'react';

import { URL, API } from '../../app_constants'
import { Upload, Icon, Modal, message } from 'antd';

message.config({
    top: 150,
    duration: 1,
});

import { getFileList, deleteFile } from './request_element'

class Avatar extends React.Component {
	constructor(props) {
        super(props);
		this.handleCancel = this.handleCancel.bind(this)
		this.handlePreview = this.handlePreview.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleRemove = this.handleRemove.bind(this)
		
		this.state = {
			loading: false,
		};
    }
    handleCancel() {
		//this.setState({ previewVisible: false })
	}
	handlePreview(file) {
		// this.setState({
		// 	previewImage: file.url || file.thumbUrl,
		// 	previewVisible: true,
		// })
	}
	handleChange(event) {
        if(event.file.status === 'uploading') {
            this.setState({ loading: true })
            return;
        }
        if(event.file.status === 'done') {
            var pathAvatar = encodeURIComponent(event.file.response.path)
            this.props.data.change(`${URL}/${pathAvatar}`)
        }
	}
	handleRemove(file) {
		// deleteFile({id: file.deleteKey}).then(data => {
        // 123
		// }, error => {
		// 	message.error('Ошибка удаления файла!')
		// })
	}
	componentWillReceiveProps(nextProps) {

	}
	componentWillMount() {
		
	}
	render() {
        const { value } = this.props.data
        
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Загрузить</div>
            </div>
        );

        const view = (
            <div className="ant-avatar-img" style={{backgroundImage: `url(${value})` }} />
        );

		return (
            <div>
                <Upload
                    name="file"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action={`${URL}/upload_avatar`}
                    onChange={this.handleChange} >
                    {value ? view : uploadButton}
                </Upload>
		    </div>
		)
	}
}

export default Avatar