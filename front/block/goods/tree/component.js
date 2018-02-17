import React from 'react';
import { observer, inject } from 'mobx-react';

import { Row, 
            Col, 
            Menu, 
            Icon, 
            Button,
            Input,
            Tree } from 'antd';
            
const TreeNode = Tree.TreeNode;

@inject("goodsStore") @observer
class TreeElem extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.goodsStore.tree[name](params)
	}
	componentWillMount() {
        this.props.goodsStore.tree.getTree()
        // this.props.orderStore.getList()
    }
    getNode(node, key) {
        return <TreeNode title={key} key={key}></TreeNode>
    }
	render() {
        const { nodeName, tree } = this.props.goodsStore.tree

		return (
            <div>
                <Row gutter={16}>
                    <Col span={14}>
                        <Input placeholder="Новая категория" 
                                value={nodeName}
                                onChange={(event) => this.self('changeNodeName', event.target.value)}/>
                    </Col>
                    <Col span={10}>
                        { nodeName ? <Button type="primary" 
                                                onClick={() => this.self('addNode')}
                                                >Добавить</Button> : null }
                    </Col>
                </Row>
                <Tree>
                    {Object.keys(tree).map((key) => {
                        return this.getNode(tree, key)
                    })}
                </Tree>
                
            </div>
            
		)
	}
}

export default TreeElem

