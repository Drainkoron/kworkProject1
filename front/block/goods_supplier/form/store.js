import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../../common/form_validate'
import observeModel from '../../../common/observe_model'
import Basic from '../../../pattern/basic'

import GoodsFormStore from '../../goods/page/store'
import listStore from '../list/store'

import { addReq, editReq, supplierGetParamsReq, deleteReq } from './request'

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
            country: '',
            default: false,
            minOrder: 0
        }
    }

    /* Form */

    @action async validateForm() {
        this.form.error = formValidate(this.scheme)
        if(this.form.error == false) {
            var requestObject = {
                field: 'name',
                value: this.model.supplier
            }
            await supplierGetParamsReq(requestObject).then(data => {
                this.model.country = data.doc.country
            }, error => {
                this.messageError('Ошибка получения поставщика!')
            })

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
			this.messageError('Ошибка сохранения поставщика товара!')
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
			this.messageError('Ошибка редактирования поставщика товара!')
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
			this.messageError('Ошибка удаления поставщика товара!')
		})
    }
}

const formStore = new FormStore()
export default formStore