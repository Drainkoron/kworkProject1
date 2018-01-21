import React from 'react';
import { observer, inject } from 'mobx-react';

import { Row, 
            Col, 
            Menu, 
            Icon, 
            Input,
            Button,
            Tabs } from 'antd';

const MenuItemGroup = Menu.ItemGroup
const Search = Input.Search
const TabPane = Tabs.TabPane;

import ModalForm from './component/form'
import Filter from  './component/filter'
import List from './component/list'
import ViewForm from './component/view_form'
import PayoutList from './component/payout_list'
import ReceiveList from './component/receive_list'

@inject("mainStore", "staffStore") @observer
class StaffBlock extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.staffStore[name](params)
	}
	componentWillMount() {
        this.props.staffStore.resetSearchModel()
        this.props.staffStore.getList()
	}
	render() {
		const { form, requestObject, model } = this.props.staffStore
		return (
            <div>
                <div>
                    <Search
                        onChange={event => this.self('onChangeFullSearch', event)}
                        value={requestObject.fullSearch}
                        placeholder="Поиск по персоналу"
                        style={{ width: 250 }}
                        onSearch={value => this.self('changeFullSearch', value)}/> 
                    <Button style={{ float: 'right' }} 
                            onClick={() => this.self('newForm')}
                            type="primary">Добавить соискателя</Button>
                </div>
                <Row gutter={20} type="flex" justify="space-around" align="top">
                    <Col span={14}>
                        <Filter />
                        <List />
                    </Col>
                    <Col span={10} style={{paddingTop: '35px'}}>
                        {model.id ? <Tabs defaultActiveKey="1" type="card" size="small">
                                        <TabPane tab="Форма" key="1">
                                            <ViewForm />
                                        </TabPane>
                                        <TabPane tab="Ведомости" key="2">
                                            <PayoutList />
                                        </TabPane>
                                        <TabPane tab="Выплаты" key="3">
                                            <ReceiveList />
                                        </TabPane>
                                    </Tabs> : null }
                    </Col>
                </Row>
                <ModalForm />
            </div>
		)
	}
}

export default StaffBlock