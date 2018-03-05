import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table } from 'antd';

@inject("userStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Логин',
                dataIndex: 'doc.login',
                key: 'doc.login',
            }, {
                title: 'Тип пользователя',
                dataIndex: 'doc.type',
                key: 'doc.type',
            }
        ]}
    }
    self(name, params) {
		this.props.userStore.list[name](params)
	}
	componentWillMount() {
		this.props.userStore.list.getList()
	}
	render() {
        const { listResult } = this.props.userStore.list

		return (
            <div style={{marginTop: '20px'}}>
                {listResult.length ? <div>
                    <h4 className='header-table'>
                        Список пользователей: {listResult.length}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={listResult.toJS()}
                            rowKey='id'
                            onRow={record => ({
                                onClick: () => this.props.userStore.form.viewForm(record)
                            })}
                            pagination={true} />
                    </div> : ''}
            </div>
		)
	}
}

export default List