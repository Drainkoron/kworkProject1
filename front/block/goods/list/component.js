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
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Название',
                dataIndex: 'doc.name',
                key: 'doc.name',
                width: 150,
                sorter: true,
                defaultSortOrder: 'ascend'
            }
        ]}
    }
    self(store, name, params) {
		this.props.goodsStore[store][name](params)
	}
	componentWillMount() {
		this.props.goodsStore.list.getList()
	}
	render() {
        const { listResult, requestObject, viewCount } = this.props.goodsStore.list
        const { nodeName, point } = this.props.goodsStore.tree

		return (
            <div>
                <h3>Товары</h3>
                <div style={{margin: '20px 0 10px 0'}}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Search onChange={event => this.props.goodsStore.list.onChangeFullSearch(event)}
                                value={requestObject.fullSearch}
                                placeholder="Поиск по товарам"
                                style={{ width: 250 }}
                                onSearch={value => this.props.goodsStore.list.changeFullSearch(value)}/> 
                        </Col>
                        <Col span={2}>
                            <Dropdown overlay={<Menu>
                                                    <Menu.Item key="1">Категория</Menu.Item>
                                                    <Menu.Item key="2">Выбранные</Menu.Item>
                                                </Menu>}>
                                <Button shape="circle" icon="file-pdf"/>
                            </Dropdown>
                        </Col>
                        <Col span={2}>
                            <Dropdown overlay={<Menu>
                                                    <Menu.Item key="1">Категория</Menu.Item>
                                                    <Menu.Item key="2">Выбранные</Menu.Item>
                                                </Menu>}>
                                <Button shape="circle" icon="file-excel"/>
                            </Dropdown>
                        </Col>
                        <Col span={8}>
                            { point.length ? <Button type="primary" 
                                                        style={{float: 'right'}}
                                                        onClick={() => this.self('form', 'newGoods')}>Добавить товар</Button> : null }
                        </Col>
                    </Row>
                </div>
                <div style={{marginTop: '20px'}}>
                    {listResult.data ? <div>
                        <h4 className='header-table'>
                            Список товаров: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                            найдены {listResult.searchCount} из {listResult.count}
                        </h4>
                        <Table columns={this.state.columns} 
                                dataSource={listResult.data.toJS()}
                                rowKey='id'
                                onChange={(pagination, filters, sorter)  => this.self('list', 'changeSorterPage', sorter)}
                                onRow={record => ({
                                    onClick: () => this.props.supplierStore.form.viewForm(record)
                                })}
                                pagination={{
                                    total: listResult.searchCount,
                                    current: requestObject.page,
                                    onChange: page => this.self('list', 'changePaginationPage', page),
                                    pageSize: requestObject.limit,
                                    showSizeChanger: true,
                                    onShowSizeChange: (current, pageSize) => this.self('list', 'changePaginationSizePage', pageSize)
                                }} />
                        </div> : ''}
                </div>
            </div>
		)
	}
}

export default List