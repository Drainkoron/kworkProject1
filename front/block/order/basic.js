import { observable, computed, action, toJS, intercept } from 'mobx'

import { addReq, editReq, getReq, getListReq, reportCountReq, logicOrder, getStaffinOrderReq } from './request'

import mainStore from '../../pattern/stores/main_store'

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

    interceptorKeys() {
        return intercept(this.keys, change => {
            if(change.name == 'customer') {
                
            }
            return change
        })
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
                this.addSuccess(data.body)
            } else {
                message.error('Ошибка редактирования работника!')
            }
		}, error => {
			message.error('Ошибка редактирования работника!')
		})
    }

    @action addSuccess(object) {
        this.model.id = object.id
        message.success('Заказ успешно сохранён!')
    }

    @action getList() {
        getListReq(this.requestObject).then(data => {
			if(data.success) {
                this.listResult = data.body
            } else {
                message.error('Ошибка получения списка заявок!')
            }
		}, error => {
			message.error('Ошибка получения списка заявок!')
        })
    }

    @action getFormRequest(id) {
        getReq(id).then(data => {
			if(data.success) {
                this.getSuccess(data.body)
            } else {
                console.log("error requests")
            }
		}, error => {
			
		})
    }

    @action getSuccess(object) {
        this.keys.customer = object.customer.id
        object.json_data.id = object.id
        this.setModel(object.json_data)
        this.getStaffinOrder()
        this.getAct()
        this.getPayout()
    }

    @action getStaffinOrder() {
        getStaffinOrderReq(this.order.id).then(data => {
			if(data.success) {
                this.tabel.staff = data.body
            } else {
                message.error('Ошибка получения списка работников по заявке!')
            }
		}, error => {
			message.error('Ошибка получения списка работников по заявке!')
        })
    }


    // @action reportCount(field, callback) {
    //     reportCountReq(field).then(data => {
	// 		if(data.success) {
    //             callback(data.body)
    //         } else {
    //             message.error('Ошибка получения отчёта!')
    //         }
	// 	}, error => {
	// 		message.error('Ошибка получения отчёта!')
    //     })
    // }

    @action changeStatusSend(status) {
        logicOrder(this.model.id, {status: status}).then(data => {
			if(data.success) {
                this.model.status = status
                this.updateStatusData()
            } else {
                message.error('Ошибка смены сатуса заказа!')
            }
		}, error => {
			message.error('Ошибка смены сатуса заказа!')
        })
    } 

    @action updateStatusData() {
        switch(this.model.status) {
            case 'Исполнение':
                this.getStaffinOrder()
                    break;
        }
    }
            



}

export default Basic