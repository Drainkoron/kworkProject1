import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../../common/form_validate'
import observeModel from '../../../common/observe_model'
import Basic from '../../../pattern/basic'
import mainStore from '../../../pattern/main/main_store'

import { addReq, editReq } from './request'

import ListStore from '../list/store'
import treeStore from '../tree/store'


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
            category: [],
            name: '',
            note: '',
            user: ''
        }
    }

    /* Form */

    @action newGoods() {
        this.model.name = ''
        this.model.note = ''
        this.model.category = treeStore.getPoint()
        this.viewModal()
    }

    @action validateForm() {
        this.form.error = formValidate(this.scheme)
        if(this.form.error == false) {
            this.saveForm()
        }
    }

    @action saveForm() {
        this.model.user = mainStore.user
        addReq(this.model).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка сохранения товара!')
		})
    }

    @action addSuccess(data) {
        this.cancelForm()
        ListStore.updateList()
    }
}

const formStore = new FormStore()
export default formStore