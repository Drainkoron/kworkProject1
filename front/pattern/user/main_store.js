import { observable, computed, action, intercept } from 'mobx'

import observeModel from '../../common/observe_model'
import formValidate from '../../common/form_validate'
import authScheme from './auth_scheme'

import { authUserReq } from './request'

import Basic from '../basic.js'

class MainStore extends Basic {
	@observable scheme
    @observable model
    @observable form

	constructor() {
		super()
		this.model = this.formModel()
		this.scheme = authScheme(this)
		this.changeSheme = observeModel(this)
		this.form = {
            view: false,
            error: ''
        }
	}

	formModel() {
        return {
            type: '',
			login: '',
			password: '',
			remember: false
        }
	}
	
	@action validate() {
        this.form.error = formValidate(this.scheme)
        if(this.form.error == false) {
            this.authUser()
        }
	}
	
	@action authUser() {
		authUserReq(this.model).then(data => {
			console.log(data, 'data')
			// if(data.success) {
            //     this.receive = data.body
            // } else {
            //     message.error('Ошибка получения списка выплат!')
            // }
		}, error => {
			this.messageError('Ошибка авторизации!')
		})
	}
	


		
}
	



const mainStore = new MainStore()
export default mainStore