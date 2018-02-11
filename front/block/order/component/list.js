import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'
import { Table } from 'antd';

import { StatusForm } from '../dictionary'

const columns = [{
        title: 'Дата начала работ',
        dataIndex: 'json_data.start',
        key: 'json_data.start',
        width: 150,
        render: start => moment(start).format('HH:mm:ss DD-MM-YYYY')
    }, {
        title: 'Заказчик',
        dataIndex: 'json_data.customer',
        key: 'json_data.customer',
        width: 150,
    }, {
        title: 'Телефон',
        dataIndex: 'json_data.phone',
        key: 'json_data.phone',
        width: 100,
    }, {
        title: 'Адрес',
        dataIndex: 'json_data.address',
        key: 'json_data.address',
        width: 100,
    },{
        title: 'Тип работ',
        dataIndex: 'json_data.typeJob',
        key: 'json_data.typeJob',
        width: 100,
    },{
        title: 'Кол-во',
        dataIndex: 'json_data.count',
        key: 'json_data.count',
        width: 50,
    },{
        title: 'Дней',
        dataIndex: 'json_data.duration',
        key: 'json_data.duration',
        width: 50,
    },{
        title: 'Статус',
        dataIndex: 'json_data.status',
        key: 'json_data.status',
        width: 100
    }
];

@inject("orderStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
    }
    self(name, params) {
		this.props.orderStore[name](params)
	}
	componentWillMount() {
		
	}
	render() {
        const { listResult, requestObject, viewCount, model } = this.props.orderStore
 
		return (
            <div style={{marginTop: '20px'}}>
                {listResult.object_list ? <div>
                    <h4 className='header-table'>
                        Список работ: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                        найдены {listResult.search_count} из {listResult.all_count}
                    </h4>
                    <Table columns={columns} 
                            dataSource={listResult.object_list.toJS()}
                            onRowClick={elem => this.self('goForm', elem)}
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