import { observable, computed, action, intercept } from 'mobx'

import { getTableReq, createTableReq, dropTableReq } from './request'

import Basic from '../basic.js'

class TableStore extends Basic {
	@observable table
	@observable tableName

	constructor() {
		super()
		this.table = []
		this.tableName = ''
	}

	@action getTable() {
		getTableReq().then(data => {
			this.table = data
		}, error => {
			this.messageError('Ошибка получения списка таблиц!')
		})
	}

	@action selectTable(elem) {
		console.log(elem.table_name)
	}
	
	@action changeName(name) {
		this.tableName = name
	}

	@action addTable() {
		createTableReq({name: this.tableName}).then(data => {
			this.tableName = ''
			this.getTable()
		}, error => {
			this.messageError('Ошибка создания таблицы!')
		})
	}

	@action dropTable(elem) {
		if(elem.table_name == 'users') {
			this.messageError('Не нужно удалять таблицу юзеров!')
		} else {
			dropTableReq({name: elem.table_name}).then(data => {
				this.getTable()
			}, error => {
				this.messageError('Ошибка удаления таблицы!')
			})
		}
	} 
	
}
	



const tableStore = new TableStore()
export default tableStore