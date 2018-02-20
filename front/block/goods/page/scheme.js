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
				name: "Дополнительно",
				type: "Textarea",
				col: 0
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