import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table } from 'antd';

@inject("calculationStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Название',
                dataIndex: 'doc.name',
                key: 'doc.name',
                sorter: true,
                defaultSortOrder: 'ascend'
            }, {
                title: 'Тираж',
                dataIndex: 'doc.count',
                key: 'doc.count',
                sorter: true,
            }, {
                title: 'Цена',
                dataIndex: 'doc.cost',
                key: 'doc.cost',
                sorter: true
            }, {
                title: 'Срок производства',
                dataIndex: 'doc.time_production',
                key: 'doc.time_production',
            }, {
                title: 'Примечание',
                dataIndex: 'doc.note',
                key: 'doc.note',
                width: 150,
            }
        ]}
    }
    self(name, params) {
		this.props.calculationStore.list[name](params)
	}
	componentWillMount() {

	}
	render() {
        const { listResult, requestObject, viewCount } = this.props.calculationStore.list

		return (
            <div style={{marginTop: '20px'}}>
                {listResult.data ? <div>
                    <h4 className='header-table'>
                        Список просчётов: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                        найдены {listResult.searchCount} из {listResult.count}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={listResult.data.toJS()}
                            rowKey='id'
                            onChange={(pagination, filters, sorter)  => this.self('changeSorterPage', sorter)}
                            onRow={record => ({
                                onClick: () => this.props.calculationStore.form.viewForm(record)
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