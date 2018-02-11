import React from 'react';
import { observer, inject } from 'mobx-react';

import { Row, 
            Col, 
            Menu, 
            Icon, 
            Input,
            Button } from 'antd';
const MenuItemGroup = Menu.ItemGroup
const Search = Input.Search

import ModalForm from './component/form.js'
import Filter from  './component/filter.js'
import List from './component/list.js'
import ViewForm from './component/view_form.js'


@inject("customerStore") @observer
class CustomerBlock extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.customerStore[name](params)
	}
	componentWillMount() {
        this.props.customerStore.resetSearchModel()
        this.props.customerStore.getList()
	}
	render() {
		const { form, requestObject } = this.props.customerStore
		return (
            <div>
                <Row gutter={20} type="flex" justify="space-around" align="top">
                   
                    <Col span={16}>
                        <div>
                            <Search
                                onChange={event => this.self('onChangeFullSearch', event)}
                                value={requestObject.full_search}
                                placeholder="Поиск по заказчикам"
                                style={{ width: 250 }}
                                onSearch={value => this.self('changeFullSearch', value)}/> 
                            <Button style={{ float: 'right' }} 
                                    onClick={() => this.self('newForm')}
                                    type="primary">Добавить заказчика</Button>
                        </div>
                        <Filter />
                        <List />
                    </Col>
                    <Col span={8}>
                        <ViewForm />
                    </Col>
                </Row>
                <ModalForm />
            </div>
		)
	}
}

export default CustomerBlock