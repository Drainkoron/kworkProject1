import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table } from 'antd';

import { Type } from '../dictionary'

const columns = [{
        title: 'ФИО',
        dataIndex: 'json_data.fio',
        key: 'json_data.fio',
        width: 150,
    }, {
        title: 'Телефон',
        dataIndex: 'json_data.phone',
        key: 'json_data.phone',
        width: 150,
    }, {
        title: 'Ставка',
        dataIndex: 'json_data.rate',
        key: 'json_data.rate',
        width: 100,
    },{
        title: 'Статус',
        dataIndex: 'json_data.status',
        key: 'json_data.status',
        width: 100,
    }
];

@inject("staffStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.staffStore[name](params)
	}
	componentWillMount() {
		
	}
	render() {
        const { listResult, requestObject, viewCount, model } = this.props.staffStore
 
		return (
            <div style={{marginTop: '20px'}}>
                {listResult.object_list ? <div>
                    <h4 className='header-table'>
                        Список персонала: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                        найдены {listResult.search_count} из {listResult.all_count}
                    </h4>
                    <Table columns={columns} 
                            dataSource={listResult.object_list.toJS()}
                            onRowClick={elem => this.props.data.click(elem)}
                            rowSelection={this.props.data.selection}
                            rowKey='id'
                            pagination={{
                                total: listResult.search_count,
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