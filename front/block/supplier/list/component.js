import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table } from 'antd';

@inject("supplierStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Название',
                dataIndex: 'doc.name',
                key: 'doc.name',
                width: 150,
                sorter: true,
                defaultSortOrder: 'ascend'
            }, {
                title: 'Сайт',
                dataIndex: 'doc.url',
                key: 'doc.url',
                width: 150,
            }, {
                title: 'eMail',
                dataIndex: 'doc.mail',
                key: 'doc.mail',
                width: 150,
            }, {
                title: 'Телефон',
                dataIndex: 'doc.phone',
                key: 'doc.phone',
                width: 150,
            }
        ]}
    }
    self(name, params) {
		this.props.supplierStore.list[name](params)
	}
	componentWillMount() {
		this.props.supplierStore.list.getList()
	}
	render() {
        const { listResult, requestObject, viewCount } = this.props.supplierStore.list

		return (
            <div style={{marginTop: '20px'}}>
                {listResult.data ? <div>
                    <h4 className='header-table'>
                        Список персонала: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                        найдены {listResult.searchCount} из {listResult.count}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={listResult.data.toJS()}
                            rowKey='id'
                            onChange={(pagination, filters, sorter)  => this.self('changeSorterPage', sorter)}
                            onRow={record => ({
                                onClick: () => this.props.supplierStore.form.viewForm(record)
                            })}
                            pagination={{
                                total: listResult.searchCount,
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