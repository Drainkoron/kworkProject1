import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'

import Basic from '../../../pattern/basic'

import { getListReq } from './request'


class ListStore extends Basic {
    @observable listResult
    @observable requestObject

    constructor() {
        super()
        this.listResult = [],
        this.requestObject = this.searchModel()
    }

    /* model */

    searchModel() {
        return {
            filterField: {
                goods_supplier_id: 0,
            }
        }
    }

    @action setIdGoodsSupplier(id) {
        console.log(id)
        this.requestObject.filterField.goods_supplier_id = id
        this.getList()
    }

    @action getList() {
        getListReq(this.requestObject).then(data => {
            this.listResult = data
		}, error => {
			this.messageError('Ошибка получения списка просчётов!')
        })
    }
}

const listStore = new ListStore()
export default listStore