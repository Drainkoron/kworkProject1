import React from 'react';
import { observer, inject } from 'mobx-react';

import { Table, 
            Row, 
            Col, 
            Button, 
            Dropdown, 
            Menu, 
            Icon,
            Input,
            Checkbox } from 'antd';

const Search = Input.Search

var typesEvent = {
    add: 'Создание',
    edit: 'Редактирование',
    delete: 'Удаление'
}

var typesBlock = {
    supplier: 'Поставщик',
    customer: 'Клиент',
    tree: 'Дерево',
    calculation: 'Расчет',
    goods_supplier: 'Поставщик по товару',
    goods: 'Товар',
    options: 'Настройки',
    orders: 'Заявки',
    sample: 'Сэмпл',
    staff: 'Персонал'
}

@inject("logStore") @observer
class ListLog extends React.Component {
	constructor(props) {
        super(props);
        this.self = this.self.bind(this)
        this.state = {
            columns: [{
                title: 'Блок',
                dataIndex: 'doc.name',
                key: 'doc.name',
                render: text => typesBlock[text]
            }, {
                title: 'Событие',
                dataIndex: 'doc.event',
                key: 'doc.event',
                render: text => typesEvent[text]
            }, {
                title: 'Пользователь',
                dataIndex: 'doc.user',
                key: 'doc.user'
            }
        ]}
    }
    self(store, name, params) {
		this.props.logStore[store][name](params)
	}
	componentWillMount() {
		this.props.logStore.getList()
	}
	render() {
        const { listResult, requestObject, viewCount } = this.props.logStore

		return (
            <div>
                <div style={{margin: '10px 0 10px 0'}}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Search onChange={event => this.props.logStore.onChangeFullSearch(event)}
                                value={requestObject.fullSearch}
                                placeholder="Поиск по логам"
                                style={{ width: 250 }}
                                onSearch={value => this.props.logStore.changeFullSearch(value)}/> 
                        </Col>
                    </Row>
                </div>
                <div style={{marginTop: '20px'}}>
                    {listResult.data ? <div>
                        <h4 className='header-table'>
                            Список логов: показаны с {(requestObject.page * requestObject.limit) - requestObject.limit + 1} по {viewCount} - 
                            найдены {listResult.searchCount} из {listResult.count}
                        </h4>
                        <Table columns={this.state.columns} 
                                dataSource={listResult.data.toJS()}
                                rowKey='id'
                                onChange={(pagination, filters, sorter)  => this.props.logStore.changeSorterPage(sorter)}
                                pagination={{
                                    total: listResult.searchCount,
                                    current: requestObject.page,
                                    onChange: page => this.props.logStore.changePaginationPage(page),
                                    pageSize: requestObject.limit,
                                    showSizeChanger: true,
                                    onShowSizeChange: (current, pageSize) => this.props.logStore.changePaginationSizePage(pageSize)
                                }}/>
                        </div> : ''}
                </div>
            </div>
		)
	}
}

export default ListLog