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
		supplier: {
			options: {
				name: "Поставщик",
				type: "BlockSelect",
				textError: "Укажите поставщика",
				min: 1,
				col: 0
			},
			elem: {
				block: 'supplier',
				field: 'name',
                value: '',
				onChange: (value) => dictionaryChange('supplier', value, store)
			}
		},
		minOrder: {
			options: {
				name: "Минимальный заказ",
				type: "Number",
				format: 'num',
				col: 0
			},
			elem: {
				value: '',
				onChange: value => numberChange('minOrder', value, store),
				name: "minOrder"
			}
		},
		url: {
			options: {
				name: "Ссылка на товар",
                type: "Input",
				col: 0
			},
			elem: {
				disabled: false,
				placeholder: "",
				value: '',
				onChange: event => inputChange(event, store),
				name: "url"
			}
		},
		default: {
			options: {
				type: "Checked",
				name: "Выгружать в КП"
			},
			elem: {
				checked: false,
				onChange: (event) => checkChange(event, store),
				name: "default"
			}
		}
	}	
	return scheme
}	