import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../../common/form_validate'
import observeModel from '../../../common/observe_model'
import Basic from '../../../pattern/basic'

import ListStore from '../list/store'
import { addReq, editReq, deleteReq } from './request'



class FormStore extends Basic {
    @observable scheme
    @observable model
    @observable form
    @observable country

    constructor() {
        super()
        this.goodsSupplierId = 0,
        this.country = '',
        this.model = this.formModel()
        this.scheme = blockScheme(this)
        this.changeSheme = observeModel(this)
        this.form = {
            view: false,
            error: ''
        }
    }

    formModel() {
        return {
            id: false,
            goods_supplier_id: 0,
            country: '',
            name: '',
            note: '',
            count: 0,
            cost: 0,
            currency: 'USD',
            weight: 0,
            course: 0,
            time_production: 0,
            time_branding: 0,
            default: false,
            fast_time: 0,
            fast_rate: 0,
            fast_cost_in: 0,
            fast_cost_out: 0,
            fast_cost_brand: 0,
            fast_cost_in_brand: 0,
            fast_cost_out_brand: 0,
            slow_time: 0,
            slow_rate: 0,
            slow_cost_in: 0,
            slow_cost_out: 0,
            slow_cost_brand: 0,
            slow_cost_in_brand: 0,
            slow_cost_out_brand: 0,
            rus_time: 0,
            rus_rate: 0,
            rus_cost_in: 0,
            rus_cost_out: 0,
            rus_cost_brand: 0,
            rus_cost_in_brand: 0,
            rus_cost_out_brand: 0
        }
    }

    /* Form */

    @action setIdGoodsSupplier(id, country) {
        this.goodsSupplierId = id
        this.country = country
    }

    @action validateForm() {
        this.model.goods_supplier_id = this.goodsSupplierId
        this.model.country = this.country
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
			this.messageError('Ошибка сохранения поставщика!')
		})
    }

    @action addSuccess(data) {
        this.cancelForm()
        ListStore.updateList()
    }

    @action editForm() {
        editReq(this.model).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка редактирования поставщика!')
		})
    }

    @action viewForm(elem) {
        elem.doc.id = elem.id
        this.setModel(elem.doc)
        this.viewModal()
    }

    @action deleteForm() {
        deleteReq({id: this.model.id}).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка удаления поставщика!')
		})
    }
}

const formStore = new FormStore()
export default formStore