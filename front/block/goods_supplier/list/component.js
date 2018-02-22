import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table } from 'antd';

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
                width: 150,
                sorter: true,
                defaultSortOrder: 'ascend'
            }, {
                title: 'Минимальная партия',
                dataIndex: 'doc.minOrder',
                key: 'doc.minOrder',
                width: 150,
            }, {
                title: 'По умолчанию',
                dataIndex: 'doc.default',
                key: 'doc.default',
                width: 150,
                render: values => values ? 'Да' : 'Нет'
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
        const { listResult, requestObject, viewCount } = this.props.goodsSupplierStore.list

		return (
            <div>
                {listResult.data ? <div>
                    <h4 className='header-table'>
                        Список поставщиков: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                        найдены {listResult.searchCount} из {listResult.count}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={listResult.data.toJS()}
                            rowKey='id'
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