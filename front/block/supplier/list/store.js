import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'

import Basic from '../../../pattern/basic'

import { getListReq } from './request'


class ListStore extends Basic {
    @observable listResult
    @observable requestObject
    @observable currentRow

    constructor() {
        super()
        this.listResult = {},
        this.requestObject = this.searchModel()
        this.currentRow = null
    }

    /* model */

    searchModel() {
        return {
            page: 1,
            limit: 10,
            fullSearch: '',
            filterField: {
                country: 'all',
            },
            sortBy: { 
                field: 'name',
                reverse: false
            }
        }
    }

    @action getList() {
        getListReq(this.requestObject).then(data => {
            this.listResult = data
		}, error => {
			message.error('Ошибка получения списка поставщиков!')
        })
    }

    /* Filter */
    @action changeFilterType(value) {
        this.requestObject.filterField.country = value
        this.requestObject.page = 1
        this.getList()
    }
}

const listStore = new ListStore()
export default listStore