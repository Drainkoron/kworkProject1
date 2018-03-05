import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'

import Basic from '../../basic'

import { getListReq } from './request'


class ListStore extends Basic {
    @observable listResult

    constructor() {
        super()
        this.listResult = {}
    }

    /* model */

    @action getList() {
        getListReq().then(data => {
            this.listResult = data
		}, error => {
			this.messageError('Ошибка получения списка пользователей!')
        })
    }
}

const listStore = new ListStore()
export default listStore