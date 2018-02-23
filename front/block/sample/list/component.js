import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table } from 'antd';

@inject("sampleStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Тираж',
                dataIndex: 'doc.count',
                key: 'doc.count',
                width: 150,
                sorter: true,
                defaultSortOrder: 'ascend'
            }, {
                title: 'Цена',
                dataIndex: 'doc.cost',
                key: 'doc.cost',
                width: 150,
            }, {
                title: 'Вес',
                dataIndex: 'doc.weight',
                key: 'doc.weight',
                width: 150,
            }, {
                title: 'Примечание',
                dataIndex: 'doc.note',
                key: 'doc.note',
                width: 150,
            }
        ]}
    }
    self(name, params) {
		this.props.sampleStore.list[name](params)
	}
	componentWillMount() {

	}
	render() {
        const { listResult, requestObject, viewCount } = this.props.sampleStore.list

		return (
            <div style={{marginTop: '20px'}}>
                {listResult.data ? <div>
                    <h4 className='header-table'>
                        Список сэмплов: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                        найдены {listResult.searchCount} из {listResult.count}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={listResult.data.toJS()}
                            rowKey='id'
                            onChange={(pagination, filters, sorter)  => this.self('changeSorterPage', sorter)}
                            onRow={record => ({
                                onClick: () => this.props.sampleStore.form.viewForm(record)
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