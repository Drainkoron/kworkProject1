import React from 'react'
import moment from 'moment'
import { Icon } from 'antd'
import { observable, computed, action, intercept } from 'mobx'

import inputChange from '../../../common/input_change'
import checkChange from '../../../common/check_change'
import changeDate from '../../../common/date_change'
import dictionaryChange from '../../../common/dictionary_change'
import numberChange from '../../../common/number_change'

export function blockScheme(store) {
	const scheme = {
		store: store,
		name: {
			options: {
				name: "Название",
                type: "Input",
				textError: "Укажите название поставщика",
				min: 3,
				col: 0
			},
			elem: {
				disabled: false,
				placeholder: "Название",
				value: '',
				onChange: event => inputChange(event, store),
				name: "name"
			}
		},
		url: {
			options: {
				name: "URL",
                type: "Input",
				col: 0
			},
			elem: {
				disabled: false,
				placeholder: "http://",
				value: '',
				onChange: event => inputChange(event, store),
				name: "url"
			}
		},
		country: {
			options: {
				name: "Страна",
				type: "Dictionary",
				textError: "Укажите страну поставщика",
				min: 1,
				col: 0
			},
			elem: {
                dictionary: 'country',
                value: '',
				onChange: (value) => dictionaryChange('country', value, store)
			}
		},
		mail: {
			options: {
				name: "eMail",
                type: "Input",
				col: 0
			},
			elem: {
				disabled: false,
				placeholder: "email",
				value: '',
				onChange: event => inputChange(event, store),
				name: "mail"
			}
		},
		skype: {
			options: {
				name: "Skype",
                type: "Input",
				col: 0
			},
			elem: {
				disabled: false,
				placeholder: "skype",
				value: '',
				onChange: event => inputChange(event, store),
				name: "skype"
			}
		},
		phone: {
			options: {
				name: "Телефон",
                type: "Input",
				col: 1
			},
			elem: {
				disabled: false,
				placeholder: "92 233 444-55-66",
				value: '',
				onChange: event => inputChange(event, store),
				name: "phone"
			}
		},
		wechat: {
			options: {
				name: "Wechat",
                type: "Input",
				col: 1
			},
			elem: {
				disabled: false,
				placeholder: "wechat",
				value: '',
				onChange: event => inputChange(event, store),
				name: "wechat"
			}
		},
		note: {
			options: {
				name: "Дополнительно",
				type: "Textarea",
				col: 1
			},
			elem: {
                rows: 3,
				placeholder: "...",
				value: '',
				onChange: event => inputChange(event, store, 'note'),
				name: "note"
			}
		}
	}	
	return scheme
}	
