import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../../common/form_validate'
import observeModel from '../../../common/observe_model'
import Basic from '../../../pattern/basic'

import mainStore from '../../../pattern/main/main_store'
import ListStore from '../list/store'

import { editReq, deleteReq, getReq } from './request'



class PageStore extends Basic {
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
            category: [],
            name: '',
            note: '',
            avatar: ''
        }
    }

    /* Form */
    @action getForm(id) {
        getReq({id: id}).then(data => {
            this.viewForm(data)
		}, error => {
			this.messageError('Ошибка получения товара!')
		})
    }

    @action validateForm() {
        this.form.error = formValidate(this.scheme)
        if(this.form.error == false) {
            this.editForm()
        }
    }

    @action addSuccess(data) {
        this.cancelForm()
        ListStore.updateList()
    }

    @action editForm() {
        editReq(this.model).then(data => {
            this.setModel(data)
            this.messageSuccess('Товар сохранён')
		}, error => {
			this.messageError('Ошибка редактирования товара!')
		})
    }

    @action deleteForm() {
        deleteReq({id: this.model.id}).then(data => {
            mainStore.history.push(`/cabinet/goods`)
		}, error => {
			this.messageError('Ошибка удаления товара!')
		})
    }

    @action viewForm(elem) {
        elem.doc.id = elem.id
        this.setModel(elem.doc)
        mainStore.history.push(`/cabinet/goods-page/${elem.id}`)
    }

    @action setAvatar(value) {
        this.model.avatar = value
        this.editForm()
    }

    @action goList(elem) {
        mainStore.history.push(`/cabinet/goods`)
    }
}

const pageStore = new PageStore()
export default pageStore