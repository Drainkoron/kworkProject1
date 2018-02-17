import { observable, computed, action, intercept } from 'mobx'

import observeModel from '../../common/observe_model'
import formValidate from '../../common/form_validate'
import authScheme from './auth_scheme'

import { authUserReq, viewUserReq, logoutReq } from './request'

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
			} else {
				this.history.push('/')
			}
		}, error => {
			this.messageError('Ошибка авторизации!')
		})
	}

	@action async enterApp(data) {
		this.setModel(data)
		this.history.push('/cabinet/goods')
	}

	@action routing(path) {
		console.log(path, 'path')
		switch(path) {
			case 'logout':
				this.logout()
					break

			default:
				this.history.push(path)
		}
	}

	@action logout() {
		logoutReq().then(data => {
			this.resetForm()
			this.history.push('/')
		}, error => {
			this.messageError('Ошибка выхода!')
		})
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