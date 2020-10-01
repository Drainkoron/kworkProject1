import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table, 
            Button, 
            Tabs, 
            Checkbox } from 'antd';

const TabPane = Tabs.TabPane;

import CalculationBlock from '../../calculation/block'
import SampleBlock from '../../sample/block'

@inject("goodsSupplierStore") @observer
class List extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Название поставщика',
                dataIndex: 'doc.supplier',
                key: 'doc.supplier',
                width: 200,
                sorter: true,
                defaultSortOrder: 'ascend',
                render: supplier => <span>{supplier} <Button shape="circle" 
                                                                icon="search" 
                                                                onClick={event => this.props.goodsSupplierStore.view.viewForm(event, supplier)}/></span>
            }, {
                title: 'Страна',
                dataIndex: 'doc.country',
                key: 'doc.country',
            }, {
                title: 'Минимальная партия',
                dataIndex: 'doc.minOrder',
                key: 'doc.minOrder',
            }, {
                title: 'Выгружать в КП',
                dataIndex: 'doc.default',
                key: 'doc.default',
                render: (checked, row) => <Checkbox checked={checked} onClick={(event) => this.props.goodsSupplierStore.form.changeDefault(event, row)}/>
            }
        ]}
    }
    
    self(name, params) {
		this.props.goodsSupplierStore.list[name](params)
    }
    
	componentWillMount() {
		this.props.goodsSupplierStore.list.getSuppliersPageID()
    }
    
	render() {
        const { listResult, requestObject, viewCount, expandedRows } = this.props.goodsSupplierStore.list

		return (
            <div>
                <Tabs type="card">
                    <TabPane tab="Просчёты" key="1">
                        <CalculationBlock 
                            id={listResult}/>
                    </TabPane>
                    <TabPane tab="Сэмплы" key="2">
                        <SampleBlock 
                            id={listResult}/>
                    </TabPane>
                </Tabs>
            </div>
		)
	}
}

export default List