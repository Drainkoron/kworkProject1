import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../../common/form_validate'
import observeModel from '../../../common/observe_model'
import Basic from '../../../pattern/basic'


import { editOptionsReq, getOptionsReq } from './request'

// import ListStore from '../list/store'
// import treeStore from '../tree/store'


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
            id: 1,
            course: 0,
            fast_time: 0,
            fast_rate: 0,
            fast_сommission: 0,
            slow_time: 0,
            slow_rate: 0,
            slow_сommission: 0,
        }
    }

    @action getOptions() {
        getOptionsReq(this.model).then(data => {
            this.setModel(data.doc)
		}, error => {
			this.messageError('Ошибка редактирования настроек!')
		})
    }

    /* Form */
    @action validateForm() {
        this.form.error = formValidate(this.scheme)
        if(this.form.error == false) {
            this.editForm()
        }
    }

    @action addSuccess(data) {
        this.messageSuccess('Настройки сохранены!')
    }

    @action editForm() {
        editOptionsReq(this.model).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка редактирования настроек!')
		})
    }

}

const pageStore = new PageStore()
export default pageStore