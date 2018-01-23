import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table } from 'antd';

import { Type } from '../dictionary'

@inject("staffStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'ФИО',
                dataIndex: 'doc.fio',
                key: 'doc.fio',
                width: 150,
                sorter: true,
                sortOrder: 'descend'
            }, {
                title: 'Телефон',
                dataIndex: 'doc.phone',
                key: 'doc.phone',
                width: 150,
            }, {
                title: 'Ставка',
                dataIndex: 'doc.rate',
                key: 'doc.rate',
                width: 100,
            },{
                title: 'Статус',
                dataIndex: 'doc.status',
                key: 'doc.status',
                width: 100,
            }
        ]}
    }
    self(name, params) {
		this.props.staffStore[name](params)
	}
	componentWillMount() {
		
	}
	render() {
        const { listResult, requestObject, viewCount } = this.props.staffStore
 
		return (
            <div style={{marginTop: '20px'}}>
                {listResult.data ? <div>
                    <h4 className='header-table'>
                        Список персонала: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                        найдены {listResult.searchCount} из {listResult.count}
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