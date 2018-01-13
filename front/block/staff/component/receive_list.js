import React from 'react';
import { observer, inject } from 'mobx-react';
import moment from 'moment'

import { Form, 
            Icon, 
            Input,
            Modal,
            Table } from 'antd';





@inject("staffStore") @observer
class ReceiveList extends React.Component {
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
                    title: 'Тип выплаты',
                    dataIndex: 'json_data.type',
                    key: 'json_data.type',
                    width: 80,
                },{
                    title: 'Сумма',
                    dataIndex: 'json_data.sum',
                    key: 'json_data.sum',
                    width: 80,
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
		this.props.staffStore.getReceiveList()
	}
	render() {
        const { receive } = this.props.staffStore 

		return (
            <div>
                <Table
                    columns={this.state.columns} 
                    dataSource={receive.toJS()}
                    rowKey='id'
                    pagination={true}/> 
            </div>
		)
	}
}

export default ReceiveList
