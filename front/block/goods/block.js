import React from 'react';
import { observer, inject } from 'mobx-react';

import { Row, 
            Col, 
            Menu, 
            Icon, 
            Button } from 'antd';

import TreeElem from './tree/component'

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
        // this.props.goodsStore.getTree()
        // this.props.orderStore.getList()
	}
	render() {
        //const { form, requestObject } = this.props.orderStore

		return (
            <Row gutter={16}>
                <Col span={12}>
                    <TreeElem />
                </Col>
                <Col span={12}>
                    2
                </Col>
            </Row>
		)
	}
}

export default GoodsBlock