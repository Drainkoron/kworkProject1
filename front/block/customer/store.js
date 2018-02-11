import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../common/form_validate'
import observeModel from '../../common/observe_model'
import copyProperty from '../../common/copy_property'
import Basic from '../../pattern/basic'

import mainStore from '../../pattern/main/main_store'
import { addReq, editReq, getListReq } from './request'


class CustomerStore extends Basic {
    @observable scheme
    @observable model
    @observable form
    @observable listResult
    @observable requestObject

    constructor() {
        super()
        this.model = this.formModel()
        this.scheme = blockScheme(this)
        this.changeSheme = observeModel(this)
        this.form = {
            view: false,
            error: ''
        },
        this.listResult = {},
        this.requestObject = this.searchModel()
    }

    /* model */

    searchModel() {
        return {
            page: 1,
            limit: 10,
            fullSearch: '',
            filterField: {
                type: 'all',
            },
            sortBy: { 
                param: 'customer',
                reverse: true
            }
        }
    }

    formModel() {
        return {
            id: false,
            date: moment(Date.now()).utc().format(),
            customer: '',
            address: '',
            persone: '',
            phone: '',
            payDetails: '',
            manager: mainStore.model.login,
            costHour: 200,
            durationHours: 0,
            source: '',
            status: 'Нет заказов',
            type: 'Компания',
            typeJob: '',
        }
    }

    @action getList() {
        getListReq(this.requestObject).then(data => {
            this.listResult = data
		}, error => {
			this.messageError('Ошибка получения списка работников!')
        })
    }


    /* Filter */

    @action changeFilterType(value) {
        this.requestObject.filterField.type = value
        this.requestObject.page = 1
        this.getList()
    }

    @action validateForm() {
        this.form.error = formValidate(this.scheme)
        if(this.form.error == false) {
            if(this.model.id) {
                this.editForm()
            } else {
                this.saveForm()
            }
        }
    }

    @action saveForm() {
        addReq(this.model).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка сохранения заказчика!')
		})
    }

    @action editForm() {
        editReq(this.model).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка редактирования заказчика!')
		})
    }

    @action addSuccess(object) {
        this.form.view = false
        this.requestObject.page = 1
        this.getList()
    }

    /* event Form */
    @action viewForm(elem) {
        elem.doc.id = elem.id
        this.setModel(elem.doc)
    }

    /* external */
    
    @action changeSelect(value) {
        this.requestObject.page = 1
        this.requestObject.fullSearch = value
        this.requestObject.filterField.type = 'all'
        this.getList()
    }

    @action addCustomerFromOrder(object, callback) {
        this.setModel(this.formModel())
        copyProperty(this.model, object, ['customer', 'persone', 'address', 'phone', 'typeJob', 'costHour', 'manager', 'source'])
        addReq(this.model).then(data => {
            callback(data)
		}, error => {
			message.error('Ошибка сохранения заказчика!')
		})
    }

}

const customerStore = new CustomerStore()
export default customerStore