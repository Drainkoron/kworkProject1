import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'

import Basic from '../../../pattern/basic'

import { getListReq } from './request'

import GoodsFormStore from '../../goods/page/store'

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
                goods_id: 0,
            },
            sortBy: { 
                field: 'supplier',
                reverse: false
            }
        }
    }

    @action getList() {
        this.requestObject.filterField.goods_id = GoodsFormStore.model.id
        getListReq(this.requestObject).then(data => {
            this.listResult = data
		}, error => {
			this.messageError('Ошибка получения списка поставщиков!')
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