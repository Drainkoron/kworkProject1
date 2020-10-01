import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table, Checkbox } from 'antd';

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
                title: 'Цена поставщик',
                dataIndex: 'doc.cost',
                key: 'doc.cost',
                sorter: true
            }, {
                title: 'Закуп цена с БР',
                dataIndex: 'doc.slow_cost_in_brand',
                key: 'doc.slow_cost_in_brand',
                sorter: true,
                render: (text, row) => text || row.doc.rus_cost_in_brand
            }, {
                title: 'Цена продажи с БР',
                dataIndex: 'doc.slow_cost_out_brand',
                key: 'doc.slow_cost_out_brand',
                sorter: true,
                render: (text, row) => text || row.doc.rus_cost_out_brand
            }, {
                title: 'Срок',
                dataIndex: 'doc.time_production',
                key: 'doc.time_production',
                render: (time_production, row) => (row.doc.time_production * 1) + (row.doc.slow_time || row.doc.rus_time  * 1) + (row.doc.time_branding * 1)
            }, 
            {
                title: 'Название поставщика',
                dataIndex: 'doc.supplier_name',
                key: 'doc.supplier_name',
            },
            {
                title: 'Страна',
                dataIndex: 'doc.sCountry',
                key: 'doc.sCountry'
            },
            ,{
                title: 'Примечание',
                dataIndex: 'doc.note',
                key: 'doc.note',
                width: 150,
            }, {
                title: 'Выгружать в КП',
                dataIndex: 'doc.default',
                key: 'doc.default',
                render: (checked, row) => <Checkbox checked={checked} onClick={(event) => this.props.calculationStore.form.changeDefault(event, row)}/>
            }
        ]}
    }
    self(name, params) {
		this.props.calculationStore.list[name](params)
	}
	componentWillMount() {

	}
	render() {
        const { listResult } = this.props.calculationStore.list

        console.log(listResult, 'listResult')

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
                                onClick: () => this.props.calculationStore.form.viewForm(record)
                            })}
                            pagination={true} />
                    </div> : ''}
            </div>
		)
	}
}

export default List