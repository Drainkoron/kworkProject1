import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../common/form_validate'
import observeModel from '../../common/observe_model'
import copyProperty from '../../common/copy_property'
import Basic from '../../pattern/basic'

import mainStore from '../../pattern/main/main_store'
import { addReq, editReq, getListReq } from './request'

import customerStore from '../customer/store' //addCustomerFromOrder


class OrderStore extends Basic {
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
            fullSearch: "",
            filterField: {
                status: 'all',
            },
            sortBy: {
                param: 'date',
                reverse: true
            }
        }
    }

    formModel() {
        return {
            id: false,
            date: moment(Date.now()).utc().format(),
            status: 'Новая',
            manager: mainStore.model.login,
            customer: '',
            persone: '',
            address: '',
            phone: '',
            typeJob: '',
            costHour: '',
            durationHours: '',
            count: '',
            start: moment(Date.now()).utc().format(),
            duration: '',
            source: '',
            constructTable: false
        }
    }

    
    /* Filter */

    @action changeFilterType(value) {
        this.requestObject.filterField.status = value
        this.requestObject.page = 1
        this.getList()
    }

    /* event Form */

    // @action validateForm() {
    //     this.form.error = formValidate(this.scheme)
    //     if(this.form.error == false) {
    //         if(this.keys.customer) {
    //             this.selectRequest()
    //         } else {
    //             this.addCustomer()
    //         }
    //     }
    // }

    // @action selectRequest() {
    //     if(this.model.id) {
    //         this.editForm()
    //     } else {
    //         this.saveForm()
    //     }
    // }

    // @action addCustomer() {
    //     if(this.model.customer == '') {
    //         this.form.error = 'Выберите или введите название заказчика!'
    //     } else {
    //         customerStore.addCustomerFromOrder(this.model, (id) => {
    //             this.keys.customer = id
    //             this.selectRequest()
    //         })
    //     }
    // }

    @action newForm() {
        this.setModel(this.formModel())
        mainStore.history.push(`/cabinet/order-page/new`)
    }

    @action goList(elem) {
        mainStore.history.push(`/cabinet/order`)
    }

    @action goForm(elem) {
        mainStore.history.push(`/cabinet/order-page/${elem.id}`)
    }

    /* Request */

    @action getList() {
        getListReq(this.requestObject).then(data => {
            this.listResult = data
		}, error => {
			message.error('Ошибка получения списка работ!')
        })
    }

}

const orderStore = new OrderStore()
export default orderStore