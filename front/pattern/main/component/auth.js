import React, { PropTypes, Component } from 'react'
import { observer, inject } from 'mobx-react';

import { Form,
			Icon,
			Input,
			Button,
			Checkbox,
			Card,
			Alert } from 'antd';




@inject("mainStore") @observer
class Auth extends Component {
	constructor(props) {
		super(props)
		this.self = this.self.bind(this);
	}
	self(name, params) {
		this.props.mainStore[name](params)
	}
	componentWillMount() {
		console.log('auth init')
		this.props.mainStore.history = this.props.history
		this.props.mainStore.viewUser()
	}
	componentWillReceiveProps(nextProps) {

	}
	render() {
		const { scheme, form } = this.props.mainStore
		return <Card title="Авторизация"
						style={{width: '350px', margin: '5% auto'}}>
				<Form className="login-form">
					<Form.Item>
						<Input prefix={<Icon type="user" style={{ fontSize: 13 }} />}  
								{...scheme.login.elem}/>
					</Form.Item>
					<Form.Item>
						<Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
								{...scheme.password.elem} />
					</Form.Item>
					<Form.Item>
						<Checkbox {...scheme.remember.elem}>
								Запомнить меня
						</Checkbox>
						<a style={{float: 'right'}}>восстановить пароль</a>
						<Button type="primary" 
								htmlType="submit" 
								style={{width: '100%', marginTop: '20px'}}
								onClick={() => this.self('validate')}>
							Войти
						</Button>
					</Form.Item>
					<Alert message={form.error} 
							type="warning"
							showIcon
							style={form.error != false ? {display: 'block'} : {display: 'none'}} />
				</Form>
			</Card>
	}
}

export default Auth


{/*<Card title="Авторизация"
						style={{width: '350px', margin: '5% auto'}}>
				<Form className="login-form">
					<Form.Item>
						<Input addonBefore={<Icon type="mail" />} 
								{...modalScheme.email.elem}/>
					</Form.Item>
					<Form.Item>
						<Input addonBefore={<Icon type="lock" />}
								{...modalScheme.password.elem} />
					</Form.Item>
					<Form.Item>
						<Checkbox {...modalScheme.remember.elem}>
									Запомнить меня
						</Checkbox>
						<a style={{float: 'right'}}>восстановить пароль</a>
						<Button type="primary" 
								htmlType="submit" 
								style={{width: '100%'}}
								onClick={this.validate}>
							Войти
						</Button>
						или <a onClick={this.goRegistration}>Зарегестрируйтесь!</a>
					</Form.Item>
					<Alert message={form.errorMessage} 
							type="warning"
							showIcon
							style={form.errorMessage != '' ? {display: 'block'} : {display: 'none'}} />
				</Form>
			</Card>*/}



// import React, { PropTypes, Component } from 'react'

// import formChange from '../common/change';
// import formValidate from '../common/validate';

// import { Form,
// 			Icon,
// 			Input,
// 			Button,
// 			Checkbox,
// 			Card,
// 			Alert } from 'antd';

// class Auth extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.change = this.change.bind(this);
// 		this.changeCheck = this.changeCheck.bind(this);
// 		this.validate = this.validate.bind(this);
// 		this.construct_object = this.construct_object.bind(this);
// 		this.goRegistration = this.goRegistration.bind(this);

// 		this.state = {
// 			form: {
// 				errorMessage: ''
// 			},
// 			modalScheme: '',
// 			valueForm: ''
// 		}
// 	}
// 	change(event) {
// 		formChange(this, event);
// 	}
// 	changeCheck(event) {
// 		this.state.modalScheme[event.target.name].elem.checked = !this.state.modalScheme[event.target.name].elem.checked;
// 		this.forceUpdate();
// 	}
// 	validate() {
// 		formValidate(this, this.construct_object);
// 	}
// 	construct_object() {
// 		this.state.valueForm = {};
//         for(var i in this.state.modalScheme) {
// 			if(this.state.modalScheme[i].options.type == 'checked') {
// 				this.state.valueForm[i] = this.state.modalScheme[i].elem.checked;
// 			} else {
// 				this.state.valueForm[i] = this.state.modalScheme[i].elem.value;
// 			}
//         }
//         this.save()
// 	}
// 	save() {
// 		var user = Object.assign({}, this.state.valueForm)
// 		user.login = user.email
// 		delete user.email
// 		this.props.auth(user);
// 	}
// 	get_cookie() {
		
// 	}
// 	goRegistration() {
// 		this.props.changeRoute('/registration')
// 	}
// 	componentWillMount() {
// 		this.state.modalScheme = {
// 			email: {
// 				options: {
// 					name: "Email",
// 					type: "Input",
// 					format: "email",
// 					textError: "Не корректный email"
// 				},
// 				elem: {
// 					placeholder: "mail@yandex.ru",
// 					value: '',
// 					onChange: this.change,
// 					name: "email"
// 				}
// 			},
// 			password: {
// 				options: {
// 					name: "Пароль",
// 					type: "Input",
// 					format: "eng",
// 					min: 5,
// 					textError: "Пароль нужен не короче 5 символов"
// 				},
// 				elem: {
// 					type: "password",
// 					placeholder: "Пароль",
// 					value: '',
// 					onChange: this.change,
// 					name: "password"
// 				}
// 			},
// 			remember: {
// 				options: {
// 					type: "checked",
// 					name: "Запомнить"
// 				},
// 				elem: {
// 					checked: false,
// 					onChange: this.changeCheck,
// 					name: "remember"
// 				}
// 			}
// 		}
// 	}
// 	componentWillReceiveProps(nextProps) {
// 		if(nextProps.error === true) {
// 			this.props.viewAcc()
// 		} else {
// 			this.state.form.errorMessage = nextProps.error
// 			this.forceUpdate()
// 		}
// 	}
// 	render() {
// 		const {form, modalScheme} = this.state;

// 		return <Card title="Авторизация"
// 						style={{width: '350px', margin: '5% auto'}}>
// 				<Form className="login-form">
// 					<Form.Item>
// 						<Input addonBefore={<Icon type="mail" />} 
// 								{...modalScheme.email.elem}/>
// 					</Form.Item>
// 					<Form.Item>
// 						<Input addonBefore={<Icon type="lock" />}
// 								{...modalScheme.password.elem} />
// 					</Form.Item>
// 					<Form.Item>
// 						<Checkbox {...modalScheme.remember.elem}>
// 									Запомнить меня
// 						</Checkbox>
// 						<a style={{float: 'right'}}>восстановить пароль</a>
// 						<Button type="primary" 
// 								htmlType="submit" 
// 								style={{width: '100%'}}
// 								onClick={this.validate}>
// 							Войти
// 						</Button>
// 						или <a onClick={this.goRegistration}>Зарегестрируйтесь!</a>
// 					</Form.Item>
// 					<Alert message={form.errorMessage} 
// 							type="warning"
// 							showIcon
// 							style={form.errorMessage != '' ? {display: 'block'} : {display: 'none'}} />
// 				</Form>
// 			</Card>
// 	}
// }