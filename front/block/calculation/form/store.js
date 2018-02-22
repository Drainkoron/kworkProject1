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

    constructor() {
        super()
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
            note: '',
            count: 0,
            cost: 0,
            weight: 0,
            course: 0,
            time_branding: 0,
            default: false,
            fast_time: 0,
            fast_rate: 0,
            fast_cost_in: 0,
            fast_cost_out: 0,
            fast_cost_in_brand: 0,
            fast_cost_out_brand: 0,
            slow_time: 0,
            slow_rate: 0,
            slow_cost_in: 0,
            slow_cost_out: 0,
            slow_cost_in_brand: 0,
            slow_cost_out_brand: 0,
        }
    }

    /* Form */

    @action setIdGoodsSupplier(id) {
        this.model.goods_supplier_id = id
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