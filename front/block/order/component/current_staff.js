import React from 'react';
import { observer, inject } from 'mobx-react';

import { Modal,
            Table,
            Button} from 'antd';


@inject("orderStore") @observer
class CurrentStaff extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
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
            }, {
                title: 'Состояние',
                dataIndex: 'json_data.position',
                key: 'json_data.position',
                width: 100,
            }, {
                title: 'Удалить',
                dataIndex: 'interval',
                width: 50,
                render: (interval, record) => <Button shape="circle" icon="minus" onClick={() => this.self('deleteStaffInOrder', interval)} />,
              }
            ]
        }
    }
    self(name, params) {
		this.props.orderStore[name](params)
    }
    setModelValue(name, value) {
        this.props.orderStore.setModelValue(name, value)
    }
	componentWillMount() {
       
	}
	render() {
        const { selectStaff } = this.props.orderStore
        
		return (
            <div>
                <div style={{paddingBottom: '2px'}}>
                    <Button style={{float: 'right'}} type="primary"
                            onClick={() => this.self('setViewSelectStaff')}>
                            Подбор работников
                    </Button>
                </div>
                {selectStaff.freeList ? <div style={{marginTop: '20px'}}>
                    <h4 className='header-table'>
                        Работники по заявке: {selectStaff.currentList.length}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={selectStaff.currentList.toJS()}
                            rowKey='id'
                            pagination={false} />
                    </div> : ''}
            </div>
		)
	}
}

export default CurrentStaff