import { observable, computed, action, toJS, intercept } from 'mobx'

import { addReq, editReq, getListReq, reportCountReq, logigStaff, getPayoutInStaffReq } from './request'

import { message } from 'antd';
import { MessageConfig } from '../../app_constants'

message.config(MessageConfig);

class Basic {
    @action test() {
        return this.model
    }

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
        this.form.view = true
    }

    @action resetForm() {
        this.setModel(this.formModel())
    }

    @action cancelForm() {
        this.form.view = false
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

    /* request */
    @action saveFormRequest(object) {
        addReq(object).then(data => {
			if(data.success) {
                this.addSuccess(data.body)
            } else {
                message.error('Ошибка сохранения работника!')
            }
		}, error => {
			message.error('Ошибка сохранения работника!')
		})
    }

    @action editFormRequest(object) {
        editReq(object).then(data => {
			if(data.success) {
                console.log(data.body, 'result edit')
                this.addSuccess(data.body)
            } else {
                message.error('Ошибка редактирования работника!')
            }
		}, error => {
			message.error('Ошибка редактирования работника!')
		})
    }

    @action addSuccess(object) {
        this.form.view = false
        this.requestObject.page = 1
        this.getList()
    }

    @action getList() {
        getListReq(this.requestObject).then(data => {
			if(data.success) {
                this.listResult = data.body
            } else {
                message.error('Ошибка получения списка!')
            }
		}, error => {
			message.error('Ошибка получения списка!')
        })
    }

    @action reportCount(field, callback) {
        reportCountReq(field).then(data => {
			if(data.success) {
                callback(data.body)
            } else {
                message.error('Ошибка получения отчёта!')
            }
		}, error => {
			message.error('Ошибка получения отчёта!')
        })
    }

    @action changeStatus(status) {
        logigStaff(this.model.id, {position: status}).then(data => {
			if(data.success) {
                this.resetForm()
                this.getList()
            } else {
                message.error('Ошибка смены сатуса работника!')
            }
		}, error => {
			message.error('Ошибка смены сатуса работника!')
        })
    }
}

export default Basic