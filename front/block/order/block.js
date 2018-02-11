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

import Filter from  './component/filter.js'
import List from './component/list.js'
import ViewForm from './component/view_form.js'


@inject("mainStore", "orderStore") @observer
class OrderBlock extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.orderStore[name](params)
	}
	componentWillMount() {
        // this.props.taskStore.user = Object.assign({}, this.props.mainStore.user)
        // this.props.taskStore.history = this.props.history
        this.props.orderStore.resetSearchModel()
        this.props.orderStore.getList()
	}
	render() {
		const { form, requestObject } = this.props.orderStore
		return (
            <div>
                <div>
                    <Search
                        onChange={event => this.self('onChangeFullSearch', event)}
                        value={requestObject.full_search}
                        placeholder="Поиск по заявкам"
                        style={{ width: 250 }}
                        onSearch={value => this.self('changeFullSearch', value)}/> 
                    <Button style={{ float: 'right' }} 
                            onClick={() => this.self('newForm')}
                            type="primary">Добавить заявку</Button>
                </div>
                <Filter />
                <List />
            </div>
		)
	}
}

export default OrderBlock