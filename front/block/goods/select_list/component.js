import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table, 
            Row, 
            Col, 
            Button, 
            Dropdown, 
            Menu, 
            Icon,
            Input } from 'antd';

const Search = Input.Search

@inject("goodsStore") @observer
class SelectList extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Название',
                dataIndex: 'doc.name',
                key: 'doc.name',
            }, {
                title: 'Удалить',
                dataIndex: 'id',
                key: 'id',
                render: id => <Button shape="circle" 
                                        icon="minus-circle-o" 
                                        onClick={event => this.self('selectList', 'deleteGoods', {event: event, id: id})}/> 
            }
        ]}
    }
    self(store, name, params) {
		this.props.goodsStore[store][name](params)
	}
	componentWillMount() {
		
	}
	render() {
        const { list } = this.props.goodsStore.selectList

		return (
            <div>
                <div style={{margin: '10px 0 10px 0'}}>
                    <Row gutter={16}>
                        <Col span={20}>
                            
                        </Col>
                        <Col span={2}>
                            <Button shape="circle" 
                                    icon="file-pdf"
                                    onClick={() => this.self('selectList', 'makePdf')}/>
                        </Col>
                        <Col span={2}>
                            <Button shape="circle" icon="file-excel"/>
                        </Col>
                    </Row>
                </div>
                <div style={{marginTop: '20px'}}>
                    {list ? <div>
                        <h4 className='header-table'>
                            Список товаров для экспорта: {list.length}
                        </h4>
                        <Table columns={this.state.columns} 
                                dataSource={list.toJS()}
                                rowKey='id'
                                onRow={record => ({
                                    onClick: () => this.props.goodsStore.page.viewForm(record)
                                })}
                                pagination={true}/>
                        </div> : ''}
                </div>
            </div>
		)
	}
}

export default SelectList