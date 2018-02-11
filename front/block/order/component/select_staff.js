import React from 'react';
import { observer, inject } from 'mobx-react';

import { Modal,
            Table,
            Button} from 'antd';


@inject("orderStore") @observer
class SelectStaff extends React.Component {
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
            },{
                title: 'Состояние',
                dataIndex: 'json_data.position',
                key: 'json_data.position',
                width: 100,
            },{
                title: 'Добавить',
                dataIndex: 'id',
                width: 50,
                render: (id, record) => <Button shape="circle" icon="plus" onClick={() => this.self('addStaffInOrder', record)} />,
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
			<Modal
                title="Подбор работников"
                visible={selectStaff.view}
                okText="Закрыть"
                width={1000}
                onOk={() => this.self('setViewSelectStaff')}
                onCancel={() => this.self('setViewSelectStaff')}>
                    <div style={{margin: '20px'}}>
                        {selectStaff.freeList ? <div>
                            <h4 className='header-table'>
                                Свободные работники: {selectStaff.freeList.length}
                            </h4>
                            <Table columns={this.state.columns} 
                                    dataSource={selectStaff.freeList.toJS()}
                                    rowKey='id'
                                    pagination={false} />
                            </div> : ''}
                    </div>

                    
            </Modal>
		)
	}
}

export default SelectStaff





// <StaffFilter/>
// <StaffList data={{click: (elem) => this.self('clickStaffInAll', elem),
//                     selection: {
//                         onSelect: (record, selected) =>  this.self('onSelectStaffInAll', {record: record, selected: selected}),
//                         getCheckboxProps: (record) => ({disabled: this.self('getChecked', record)})
//                     }}}/>
