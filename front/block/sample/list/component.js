import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table, Checkbox } from 'antd';

@inject("sampleStore") @observer
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
                title: 'Цена поставщик',
                dataIndex: 'doc.cost',
                key: 'doc.cost',
                sorter: true
            }, {
                title: 'Закуп цена с БР',
                dataIndex: 'doc.fast_cost_in_brand',
                key: 'doc.fast_cost_in_brand',
                sorter: true,
                render: (text, row) => text || row.doc.rus_cost_in_brand
            }, {
                title: 'Цена продажи с БР',
                dataIndex: 'doc.fast_cost_out_brand',
                key: 'doc.fast_cost_out_brand',
                sorter: true,
                render: (text, row) => text || row.doc.rus_cost_out_brand
            }, {
                title: 'Срок',
                dataIndex: 'doc.time_production',
                key: 'doc.time_production',
                render: (time_production, row) => (row.doc.time_production * 1) + (row.doc.slow_time || row.doc.rus_time  * 1) + (row.doc.time_branding * 1)
            }, {
                title: 'Примечание',
                dataIndex: 'doc.note',
                key: 'doc.note',
                width: 150,
            }, {
                title: 'Выгружать в КП',
                dataIndex: 'doc.default',
                key: 'doc.default',
                render: (checked, row) => <Checkbox checked={checked} onClick={(event) => this.props.sampleStore.form.changeDefault(event, row)}/>
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
                {listResult.length ? <div>
                    <h4 className='header-table'>
                        Список просчётов: {listResult.length}
                    </h4>
                    <Table columns={this.state.columns} 
                            dataSource={listResult.toJS()}
                            rowKey='id'
                            onChange={(pagination, filters, sorter)  => this.self('changeSorterPage', sorter)}
                            onRow={record => ({
                                onClick: () => this.props.sampleStore.form.viewForm(record)
                            })}
                            pagination={true} />
                    </div> : ''}
            </div>
		)
	}
}

export default List