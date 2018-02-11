import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Table } from 'antd';

const columns = [{
        title: 'Дата формирования',
        dataIndex: 'json_data.date',
        key: 'json_data.date',
        width: 150,
        render: date => moment(date).format('DD-MM-YYYY')
    }, {
        title: 'Интервал',
        dataIndex: 'json_data.start',
        key: 'json_data.start',
        width: 150,
        render: (start, elem) => `${moment(elem.json_data.start).format('DD-MM-YYYY')} - ${moment(elem.json_data.end).format('DD-MM-YYYY')}`
    }, {
        title: 'Сумма',
        dataIndex: 'json_data.sum',
        key: 'json_data.sum',
        width: 100,
    },{
        title: 'Статус',
        dataIndex: 'json_data.status',
        key: 'json_data.status',
        width: 100,
    }
];

@inject("orderStore") @observer
class ActList extends React.Component {
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
        const { act } = this.props.orderStore
 
		return (
            <div style={{marginTop: '20px'}}>
                <div>
                    <h4 className='header-table'>
                        Список актов: {act.length}
                    </h4>
                    <Table columns={columns} 
                            dataSource={act.toJS()}
                            rowKey='id'
                            pagination={false}/>
                </div>
            </div>
		)
	}
}

export default ActList