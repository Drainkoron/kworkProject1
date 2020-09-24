import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import mainStore from '../../../pattern/main/main_store'
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
            tags: [],
            sortBy: { 
                field: 'name',
                reverse: false
            }
        }
    }

    @action setPoint(tags) {
        this.requestObject.tags = tags ? tags.split('*') : []
        this.requestObject.page = 1
        this.getList()
    }

    @action getList() {
        getListReq(this.requestObject).then(data => {
            this.listResult = data
		}, error => {
			this.messageError('Ошибка получения списка товаров!')
        })
    }

    @action changeFilterType(value) {
        this.requestObject.filterField.country = value
        this.requestObject.page = 1
        this.getList()
    }
    
    @action changeFullSearch(value){
        this.requestObject.fullSearch = value
        this.getList()
    }

    @action goForm(elem) {
        //mainStore.history.push(`/cabinet/goods-page/${elem.id}`)
    }
    
}

const listStore = new ListStore()
export default listStore