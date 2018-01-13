import React from 'react';
import { observer, inject } from 'mobx-react';
import { Table, Button } from 'antd';


@inject("tableStore") @observer
class TableList extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)

        this.state = {
            columns: [{
                title: 'Название таблицы',
                dataIndex: 'table_name',
                key: 'table_name',
            }, {
                title: '',
                render: name => <Button onDoubleClick={(event) => this.self('dropTable', name)} shape="circle" icon="delete"/>
            }]
        }
    }
    self(name, params) {
		this.props.tableStore[name](params)
    }
	componentWillMount() {
		
	}
	render() {
        const { table } = this.props.tableStore
 
		return (
            <div style={{marginTop: '20px'}}>
                <div>
                    <h4 className='header-table'>
                        Список таблиц: {table.length}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={table.toJS()}
                            rowKey='table_name'
                            onRow={record => ({
                                onClick: () => this.self('selectTable', record)
                            })}
                            pagination={true}
                            size="middle" />
                </div>
            </div>
		)
	}
}

export default TableList

// onRow={(record) => ({
//     onClick: () => {},
//     onDoubleClick: () => {},
//     onContextMenu: () => {},
//     onMouseEnter: () => {},
//     onMouseLeave: () => {},
//   })}