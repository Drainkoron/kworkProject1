import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Form, 
            Icon, 
            Input,
            Modal,
            Table } from 'antd';





@inject("staffStore") @observer
class PayoutList extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.getFooter = this.getFooter.bind(this)
        
        this.state = {
            columns: [
                {
                    title: 'Дата',
                    dataIndex: 'date', 
                    key: 'date',
                    width: 150,
                    render: date => moment(date).format('DD-MM-YYYY')
                },{
                    title: 'Интервал',
                    dataIndex: 'json_data.start',
                    key: 'json_data.start',
                    width: 150,
                    render: (start, elem) => `${moment(elem.json_data.start).format('DD-MM-YYYY')} - ${moment(elem.json_data.end).format('DD-MM-YYYY')}`
                },{
                    title: 'Кол-во ч',
                    dataIndex: 'json_data.count',
                    key: 'json_data.count',
                    width: 100,
                },{
                    title: 'Ставка',
                    dataIndex: 'json_data.rate',
                    key: 'json_data.rate',
                    width: 80,
                },{
                    title: 'Штраф',
                    dataIndex: 'json_data.penalty',
                    key: 'json_data.penalty',
                    width: 80,
                },{
                    title: 'Сумма',
                    dataIndex: 'json_data.sum',
                    key: 'json_data.sum',
                    width: 80,
                }, {
                    title: 'Статус',
                    dataIndex: 'json_data.receive',
                    key: 'json_data.receive',
                    width: 80,
                    render: receive => receive == null ? 'Не выплачено' : 'Выплачено',
                }]
        }
    }
    self(name, params) {
		this.props.staffStore[name](params)
    }
    getFooter() {
        return <div className='custom-table-footer'>
                    <div style={{width: '162px', textAlign: 'right'}}>{this.props.staffStore.act.json_data.count}</div>
                    <div style={{width: '228px', textAlign: 'right'}}>{this.props.staffStore.act.json_data.sum}</div>
                </div>
    }
	componentWillMount() {
		this.props.staffStore.getPayoutList()
	}
	render() {
        const { payout } = this.props.staffStore 

		return (
            <div>
                <Table
                    columns={this.state.columns} 
                    dataSource={payout.toJS()}
                    rowKey='id'
                    pagination={true}/> 
            </div>
		)
	}
}

export default PayoutList
