import React from 'react'
import moment from 'moment'
import { Icon } from 'antd'
import { observable, computed, action, intercept } from 'mobx'

import inputChange from '../../../common/input_change'
import checkChange from '../../../common/check_change'
import changeDate from '../../../common/date_change'
import dictionaryChange from '../../../common/dictionary_change'
import numberChange from '../../../common/number_change'

const userType = [{
					id: 0,
					name: 'Пользователь'	
				},
				{
					id: 1,
					name: 'Администратор'
				}]

export function blockScheme(store) {
	const scheme = {
		store: store,
		type: {
			options: {
				name: "Тип пользователя",
				type: "Select",
				textError: "Укажите тип пользователя",
				min: 1,
				col: 0
			},
			elem: {
				list: userType,
				value: '',
				onChange: (value) => dictionaryChange('type', value, store)
			}
		},
		login: {
			options: {
				name: "Логин",
				type: "Input",
				format: "eng",
				textError: "Логин не может быть короче 4 символов",
				min: 3,
				col: 0
			},
			elem: {
				disabled: false,
				placeholder: "Название",
				value: '',
				onChange: event => inputChange(event, store),
				name: "login"
			}
		},
		password: {
			options: {
				name: "Пароль",
				type: "Input",
				format: "eng",
				textError: "Пароль не может быть короче короче 4 символов",
				min: 3,
				col: 0
			},
			elem: {
				type: "password",
				placeholder: "password",
				value: '',
				onChange: event => inputChange(event, store),
				name: "password"
			}
		}
	}	
	return scheme
}	