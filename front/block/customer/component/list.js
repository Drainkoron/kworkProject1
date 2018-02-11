import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table } from 'antd';

import { Type } from '../dictionary'

@inject("customerStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Название',
                dataIndex: 'doc.customer',
                key: 'doc.customer',
                width: 150,
                sorter: true,
                defaultSortOrder: 'ascend'
            }, {
                title: 'Телефон',
                dataIndex: 'doc.phone',
                key: 'doc.phone',
                width: 100,
            }, {
                title: 'Адрес',
                dataIndex: 'doc.address',
                key: 'doc.address',
                width: 100,
            },{
                title: 'Статус',
                dataIndex: 'doc.status',
                key: 'doc.status',
                width: 100,
            }]
        }
    }
    self(name, params) {
		this.props.customerStore[name](params)
	}
	componentWillMount() {
		
	}
	render() {
        const { listResult, requestObject, viewCount, model } = this.props.customerStore
 
		return (
            <div style={{marginTop: '20px'}}>
                {listResult.data ? <div>
                    <h4 className='header-table'>
                        Список заказчиков: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                        найдены {listResult.searchCount} из {listResult.all_count}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={listResult.data.toJS()}
                            rowKey='id'
                            onChange={(pagination, filters, sorter)  => this.self('changeSorterPage', sorter)}
                            onRow={record => ({
                                onClick: () => this.self('viewForm', record)
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