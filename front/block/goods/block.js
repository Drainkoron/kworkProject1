import React from 'react';
import { observer, inject } from 'mobx-react';

import { Row, 
            Col, 
            Menu, 
            Icon, 
            Button,
            Tabs } from 'antd';

const TabPane = Tabs.TabPane;

import TreeElem from './tree/component'
import List from './list/component'
import ModalForm from './form/component'
import SelectList from './select_list/component'

@inject("goodsStore") @observer
class GoodsBlock extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.goodsStore[name](params)
	}
	componentWillMount() {
        this.props.goodsStore.selectList.setSelect(this.props.match.params.keys)
	}
	render() {
        //const { form, requestObject } = this.props.orderStore

		return (
            <div>
                <ModalForm />
                <Row gutter={16}>
                    <Col span={12}>
                        <TreeElem />
                    </Col>
                    <Col span={12}>
                        <Tabs defaultActiveKey="1">
                            <TabPane tab="Товары" key="1">
                                <List />
                            </TabPane>
                            <TabPane tab="Товары для экспорта" key="2">
                                <SelectList />
                            </TabPane>
                        </Tabs>
                    </Col>
                </Row>
            </div>
		)
	}
}

export default GoodsBlock