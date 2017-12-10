import { observable, computed, action, toJS, intercept } from 'mobx'

import { message } from 'antd';
import { MessageConfig } from '../app_constants'
message.config(MessageConfig)

class Basic {
    
    // constructor() {
    //     this.changeKeys = this.interceptorKeys()
    // }

    // interceptorKeys() {
    //     return intercept(this.keys, change => {
    //         return change
    //     })
    // }

    /* message */
    
    @action messageError(text) {
        message.error(text)
    }

    /* key */

    get(params) {
        return this[params]
    }

    @action set(params, value) {
        this[params] = value
    }
    
    /* form */

    @action setModel(data) {
        for(var i in data) {
            this.model[i] = data[i]
        }
    }

    @action setModelValue(params, value) {
        this.model[params] = value
    }

    @action setModelKey(params, value) {
        this.keys[params] = value
    }

    @action newForm() {
        this.setModel(this.formModel())
        this.viewModal()
    }

    @action resetForm() {
        this.setModel(this.formModel())
    }

    @action cancelForm() {
        this.form.view = false
    }

    @action viewModal() {
        this.form.view = true
    }

    /* search */

    @action resetSearchModel() {
        this.requestObject = this.searchModel()
    }

    @action onChangeFullSearch(event) {
        this.requestObject.full_search = event.target.value
    }

    @action changeFullSearch(text) {
        this.requestObject.full_search = text
        this.getList()
    }

    /* Pagination */

    @action changePaginationPage(page) {
        this.requestObject.page = page
        this.getList()
    }

    @action changePaginationSizePage(pageSize) {
        this.requestObject.limit = pageSize
        this.requestObject.page = 1
        this.getList()
    }

    @computed get viewCount() {
        var stopPage = this.requestObject.page * this.requestObject.limit
        if(this.listResult.search_count < stopPage) {
            stopPage = this.listResult.search_count
        }
        return stopPage
    }
            



}

export default Basic