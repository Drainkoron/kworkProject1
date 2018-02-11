import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Table, Button, Icon } from 'antd';

@inject("orderStore") @observer
class PayoutList extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [
                {
                    title: 'Дата формирования',
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
                    title: 'Рабочий',
                    dataIndex: 'json_data.fio',
                    key: 'json_data.fio',
                    width: 150,
                },{
                    title: 'Кол-во асов',
                    dataIndex: 'json_data.count',
                    key: 'json_data.count',
                    width: 100,
                },{
                    title: 'Ставка',
                    dataIndex: 'json_data.rate',
                    key: 'json_data.rate',
                    width: 100,
                },{
                    title: 'Штраф',
                    dataIndex: 'json_data.penalty',
                    key: 'json_data.penalty',
                    width: 100,
                },{
                    title: 'Сумма',
                    dataIndex: 'json_data.sum',
                    key: 'json_data.sum',
                    width: 100,
                },{
                    title: 'Выплатить',
                    dataIndex: 'json_data.receive',
                    key: 'json_data.receive',
                    width: 80,
                    render: (receive, record) => receive == null ? <Button shape="circle" icon="wallet" onClick={() => this.self('addReceive', record)} /> : 'Выплачено',
                }]
        }
    }
    self(name, params) {
		this.props.orderStore[name](params)
	}
	componentWillMount() {
		
	}
	render() {
        const { payout } = this.props.orderStore
 
		return (
            <div style={{marginTop: '20px'}}>
                <div style={{paddingBottom: '2px'}}>
                    <Button style={{float: 'right'}} type="primary"
                            onClick={() => this.self('setDataPrintPayuot')}>
                            Скачать ведомость
                    </Button>
                </div>
                <div style={{marginTop: '20px'}}>
                    <h4 className='header-table'>
                        Список ведомостей: {payout.length}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={payout.toJS()}
                            rowKey='id'
                            pagination={false}/>
                </div>
            </div>
		)
	}
}

export default PayoutList