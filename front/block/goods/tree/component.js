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
    getNode(node, pointer) {
        if(pointer.includes('*')) {
            var arrayPoint = pointer.split('*')
            var key = arrayPoint[arrayPoint.length - 1]
        } else {
            var key = pointer
        }

        if(Object.keys(node[key]).length) {
            return <TreeNode title={key} key={pointer}>
                    {Object.keys(node[key]).map((nextKey) => {
                        return this.getNode(node[key], `${pointer}*${nextKey}`)
                    })}
                </TreeNode>
        } else {
            return <TreeNode title={key} key={pointer} />  
        }
        
    }
	render() {
        const { nodeName, tree, point } = this.props.goodsStore.tree

		return (
            <div>
                <h3>Категории</h3>
                <div style={{margin: '20px 0 10px 0'}}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Input placeholder="Новая категория" 
                                    value={nodeName}
                                    onChange={(event) => this.self('changeNodeName', event.target.value)}/>
                        </Col>
                        <Col span={5}>
                            { nodeName ? <Button type="primary" 
                                                    onClick={() => this.self('addNode')}>Добавить</Button> : null }
                        </Col>
                        <Col span={2}>
                            { point[0] ? point[0].split('*').length > 1 && !nodeName ? <Button shape="circle"
                                                                icon="rollback"  
                                                                onClick={() => this.self('folderGoRoot')}/> : null : null} 
                        </Col>
                        <Col span={2}>
                            { point.length && !nodeName ? <Button shape="circle"
                                                                icon="check" 
                                                                onClick={() => this.self('checkNode')}/> : null }
                        </Col>
                        <Col span={2}>
                            { point.length && !nodeName ? <Button shape="circle" 
                                                            type="danger" 
                                                            icon="delete" 
                                                            onDoubleClick={() => this.self('deleteNode')}/> : null }
                        </Col>
                    </Row>
                </div>
                <div style={{margin: '10px 0 10px 0'}}>
                    <Tree 
                        defaultSelectedKeys={point.toJS()}
                        defaultExpandedKeys={point.toJS()}
                        showLine
                        draggable
                        onDragStart={data => this.self('onDragStart', data.node)}
                        onDrop={data => this.self('onDragDrop', data)}
                        onSelect={keys => this.self('selectNode', keys)}>
                        {Object.keys(tree).map((key) => {
                            return this.getNode(tree, key)
                        })}
                    </Tree>
                </div>
            </div>
            
		)
	}
}

export default TreeElem

