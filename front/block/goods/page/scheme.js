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
				textError: "Укажите название товара",
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
		category: {
			options: {
				name: "Категории",
				type: "SelectTag",
				col: 0
			},
			elem: {
				value: [],
				onChange: (value) => dictionaryChange('category', value, store)
			}
		},
		note: {
			options: {
				name: "Описание",
				type: "Textarea",
				col: 0
			},
			elem: {
                rows: 3,
				placeholder: "...",
				value: '',
				onChange: event => inputChange(event, store),
				name: "note"
			}
		},
		weight: {
			options: {
				name: "Вес",
                type: "Number",
				textError: "Укажите вес товара",
				min: 3,
				col: 0
			},
			elem: {
				placeholder: "Вес",
				value: '',
				onChange: value => numberChange('weight', value, store),
				name: "weight"
			}
		},
		size: {
			options: {
				name: "Размер",
                type: "Number",
				textError: "Укажите размер товара.",
				min: 3,
				col: 0
			},
			elem: {
				placeholder: "Размер",
				value: '',
				onChange: value => numberChange('size', value, store),
				name: "size"
			}
		},
		linkInput: {
			options: {
				name: "Ссылка",
				type: "Input",
				textError: "Укажите ссылку",
				min: 3,
				col: 0
			},
			elem: {
				value: '',
				onChange: value => inputChange(value, store),
				name: "linkInput"
			}
		},
		linkButton: {
			options: {
				name: "Ссылка",
				type: "Button",
				min: 3,
				col: 0
			},
			elem: {
				value: '',
				onClick: value => console.log(value),
				name: "linkButton"
			}
		},
		user: {
			options: {
				name: "Создатель",
                type: "Input",
				col: 0
			},
			elem: {
				disabled: true,
				placeholder: "user",
				value: '',
				onChange: event => inputChange(event, store),
				name: "user"
			}
		},
	}	
	return scheme
}	