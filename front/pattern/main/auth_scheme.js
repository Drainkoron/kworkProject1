import { observable, computed, action } from 'mobx'

import inputChange from '../../common/input_change'
import checkChange from '../../common/check_change'

export default function authScheme(store) {
	const scheme = {
		store: store,
		login: {
			options: {
				name: "Логин",
                type: "Input",
                format: "eng",
				min: 5,
				textError: "Имя не может быть короче 5 символов"
			},
			elem: {
				placeholder: "username",
				value: '',
				onChange: (event) => inputChange(event, store),
				name: "login"
			}
		},
		password: {
			options: {
				name: "Пароль",
				type: "Input",
				format: "eng",
				min: 5,
				textError: "Пароль не может быть короче короче 5 символов"
			},
			elem: {
				type: "password",
				placeholder: "password",
				value: '',
				onChange: (event) => inputChange(event, store),
				name: "password"
			}
		},
		remember: {
			options: {
				type: "Checked",
				name: "Запомнить"
			},
			elem: {
				checked: false,
				onChange: (event) => checkChange(event, store),
				name: "remember"
			}
		}
	}	
	return scheme
}	


