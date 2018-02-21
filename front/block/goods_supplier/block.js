

import React from 'react';
import { observer, inject } from 'mobx-react';

import { Row, 
            Col, 
            Menu, 
            Icon, 
            Button } from 'antd';

// import TreeElem from './tree/component'
// import List from './list/component'
import ModalForm from './form/component'

@inject("goodsSupplierStore") @observer
class GoodsSupplierBlock extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.goodsSupplierStore.form[name](params)
	}
	componentWillMount() {
        // this.props.goodsStore.getTree()
        // this.props.orderStore.getList()
	}
	render() {
        //const { form, requestObject } = this.props.orderStore

		return (
            <div>
                <ModalForm />
                <div style={{height: '50px'}}>
                    <Button style={{float: 'right', marginLeft: '20px'}} 
                            onClick={() => this.self('newForm')}
                            type="primary">
                            Новый поставщик
                    </Button>
                </div>
                
            </div>
		)
	}
}

export default GoodsSupplierBlock


