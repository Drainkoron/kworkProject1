import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table, 
            Button, 
            Tabs, 
            Checkbox } from 'antd';

const TabPane = Tabs.TabPane;

import CalculationBlock from '../../calculation/block'
import SampleBlock from '../../sample/block'

@inject("goodsSupplierStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Название поставщика',
                dataIndex: 'doc.supplier',
                key: 'doc.supplier',
                width: 200,
                sorter: true,
                defaultSortOrder: 'ascend',
                render: supplier => <span>{supplier} <Button shape="circle" 
                                                                icon="search" 
                                                                onClick={event => this.props.goodsSupplierStore.view.viewForm(event, supplier)}/></span>
            }, {
                title: 'Страна',
                dataIndex: 'doc.country',
                key: 'doc.country',
            }, {
                title: 'Минимальная партия',
                dataIndex: 'doc.minOrder',
                key: 'doc.minOrder',
            }, {
                title: 'Выгружать в КП',
                dataIndex: 'doc.default',
                key: 'doc.default',
                render: (checked, row) => <Checkbox checked={checked} onClick={(event) => this.props.goodsSupplierStore.form.changeDefault(event, row)}/>
            }
        ]}
    }
    self(name, params) {
		this.props.goodsSupplierStore.list[name](params)
	}
	componentWillMount() {
		this.props.goodsSupplierStore.list.getList()
	}
	render() {
        const { listResult, requestObject, viewCount, expandedRows } = this.props.goodsSupplierStore.list

		return (
            <div>
                {listResult.data ? <div>
                    <h4 className='header-table'>
                        Список поставщиков: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                        найдены {listResult.searchCount} из {listResult.count}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={listResult.data.toJS()}
                            expandedRowRender={record => <div style={{backgroundColor: '#fbfbfb', padding: '10px'}}>
                                                            <Tabs type="card">
                                                                <TabPane tab="Просчёты" key="1">
                                                                    <CalculationBlock id={record.id} 
                                                                                        country={record.doc.country} 
                                                                                        current={expandedRows}/>
                                                                </TabPane>
                                                                <TabPane tab="Сэмплы" key="2">
                                                                    <SampleBlock id={record.id} 
                                                                                country={record.doc.country} 
                                                                                current={expandedRows}/>
                                                                </TabPane>
                                                            </Tabs>
                                                        </div>}
                            expandedRowKeys={expandedRows.toJS()}
                            onExpand={(expanded, record) => this.self('onExpand', {expanded: expanded, 
                                                                                        rows: record.id})}
                            rowKey={record => record.id}
                            onChange={(pagination, filters, sorter)  => this.self('changeSorterPage', sorter)}
                            onRow={record => ({
                                onClick: () => this.props.goodsSupplierStore.form.viewForm(record)
                            })}
                            pagination={{
                                total: listResult.searchCount,
                                current: requestObject.page,
                                onChange: page => this.self('changePaginationPage', page),
                                pageSize: requestObject.limit,
                                showSizeChanger: true,
                                onShowSizeChange: (current, pageSize) => this.self('changePaginationSizePage', pageSize)
                            }} />
                    </div> : ''}
            </div>
		)
	}
}

export default List