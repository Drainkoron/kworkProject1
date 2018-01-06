import React from 'react'
import { observer, inject } from 'mobx-react'

import { Row, 
			Col, 
			Input,
			Button } from 'antd'

import TableList from './component/table_list' 

@inject("mainStore", "tableStore") @observer
class TableBlock extends React.Component {
	constructor(props) {
		super(props);
		this.self = this.self.bind(this)
	}
	self(name, params) {
		this.props.tableStore[name](params)
    }
	componentWillMount() {
		this.props.tableStore.getTable()
	}
	render() {
		const { tableName } = this.props.tableStore
		
		return (
			<div>
				<Row gutter={40}>
                    <Col span={12}>
						<Row gutter={10}>
							<Col span={12}>
								<Input placeholder="Имя таблицы" 
                                    value={tableName}
                                    onChange={(event) => this.self('changeName', event.target.value)} />
							</Col>
							<Col span={12}>
							{ tableName ? <Button onClick={() => this.self('addTable')}
                                                                        shape="circle" 
                                                                        icon="plus"/> : null }
							</Col>
						</Row>
						
						<TableList />
					</Col>
					<Col span={12}>
					</Col>
				</Row>
			</div>
		)
	}
}

export default TableBlock;

//<UserList />