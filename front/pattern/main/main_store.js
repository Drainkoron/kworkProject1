import { observable, computed, action, intercept } from 'mobx'

import observeModel from '../../common/observe_model'
import formValidate from '../../common/form_validate'
import authScheme from './auth_scheme'

import { authUserReq, viewUserReq } from './request'

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
			this.enterApp(data)
		}, error => {
			this.messageError('Ошибка авторизации!')
		})
	}

	@action viewUser() {
		viewUserReq(this.model).then(data => {
			if(data) {
				this.enterApp(data)
			}
		}, error => {
			this.messageError('Ошибка авторизации!')
		})
	}

	@action async enterApp(data) {
		this.setModel(data)
		this.history.push('/cabinet/users')
	}

	@action routing(path) {
		switch(path) {
			case 'logout':
				this.logout()
					break

			default:
				this.history.push(path)
		}
	}

	@action logout() {
		console.log('logout')
		document.cookie = ''
		console.log(document.cookie, 'document.cookie ')
		this.resetForm()
		this.history.push('/')
		
	}

	// @action viewUser() {
	// 	viewAccReq().then(data => {
	// 		this.enterApp(data.body)
	// 	}, error => {
	// 		this.history.push('/')
	// 	})
	// }
	


		
}
	



const mainStore = new MainStore()
export default mainStore