import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from '../../supplier/form/scheme'
import observeModel from '../../../common/observe_model'
import Basic from '../../../pattern/basic'

//import ListStore from '../list/store'
import { getParamsReq } from './request'



class ViewStore extends Basic {
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
            name: '',
            url: '',
            country: '',
            mail: '',
            skype: '',
            phone: '',
            wechat: '',
            note: ''
        }
    }

    /* Form */

    @action viewForm(event, elem) {
        event.stopPropagation()
        var requestObject = {
            field: 'name',
            value: elem
        }
        getParamsReq(requestObject).then(data => {
            data.doc.id = elem.id
            this.setModel(data.doc)
            this.viewModal()
		}, error => {
			this.messageError('Ошибка получения информации о поставщике')
        })
        
    }
}

const viewStore = new ViewStore()
export default viewStore