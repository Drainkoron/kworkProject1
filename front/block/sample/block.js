import React from 'react';
import { observer, inject } from 'mobx-react';

import { Input,
            Button } from 'antd';

const Search = Input.Search

import ModalForm from './form/component'
import List from './list/component'

@inject("sampleStore") @observer
class SampleBlock extends React.Component {
	constructor(props) {
        super(props);
    }
    componentWillReceiveProps(nextProps) {
        // Компоненты разные стор общий, стор обслуживает текущий компонент
        if(nextProps.current.includes(nextProps.id)) {
            this.props.sampleStore.list.setIdGoodsSupplier(nextProps.id)
            this.props.sampleStore.form.setIdGoodsSupplier(nextProps.id, nextProps.country)
        }
    }
	componentWillMount() {
        this.props.sampleStore.list.setIdGoodsSupplier(this.props.id)
        this.props.sampleStore.form.setIdGoodsSupplier(this.props.id, this.props.country)
	}
	render() {
		return (
            this.props.id == this.props.current[0] ? <div>
                <ModalForm />
                <div style={{height: '40px'}}>
                    <Button style={{ float: 'right' }} 
                            onClick={() => this.props.sampleStore.form.addForm()}
                            type="primary">Добавить сэмпл</Button>
                </div>
                <List />
            </div> : null
		)
	}
}

export default SampleBlock