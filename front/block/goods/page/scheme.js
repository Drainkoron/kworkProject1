import React from 'react'
import moment from 'moment'
import { Icon, Input, Button } from 'antd'
import { observable, computed, action, intercept } from 'mobx'

import inputChange from '../../../common/input_change'
import checkChange from '../../../common/check_change'
import changeDate from '../../../common/date_change'
import dictionaryChange from '../../../common/dictionary_change'
import numberChange from '../../../common/number_change'
import addonChange from '../../../common/addon_change'

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
				name: "Размер товара",
                type: "Number",
				textError: "Укажите размер товара.",
				min: 3,
				col: 0,
				format: 'num'
			},
			elem: {
				value: '',
				onChange: value => numberChange('size', value, store),
				name: "size"
			}
		},
		country: {
			options: {
				name: "Страна производства.",
				type: "SelectA",
				min: 3,
				col: 0,
			},
			elem: {
				list: ['Россия', 'Китай'],
				value: 'Россия',
				onChange: value => addonChange('country', value, store),
				name: "country",
			}
		},
		link: {
			options: {
				name: "Ссылка",
				type: "openLink",
				min: 3,
				col: 0,
			},
			elem: {
				enterButton: 'Открыть',
            	value: '',
            	onSearch: value => window.location = value,
				onChange: value => inputChange(value, store),
				name: "link",
			}
		},
		user: {
			options: {
				name: "Создатель",
                type: "Input",
				col: 0
			},
			elem: {
				placeholder: "user",
				value: '',
				onChange: event => inputChange(event, store),
				name: "user"
			}
		},
	}	
	return scheme
}	