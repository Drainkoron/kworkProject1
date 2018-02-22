import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../../common/form_validate'
import observeModel from '../../../common/observe_model'
import Basic from '../../../pattern/basic'

import GoodsFormStore from '../../goods/page/store'
import listStore from '../list/store'

import { addReq, editReq } from './request'

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
            goods_id: GoodsFormStore.model.id,
            supplier: '',
            default: false,
            minOrder: 0
        }
    }

    /* Form */

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
        listStore.updateList()
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
}

const formStore = new FormStore()
export default formStore