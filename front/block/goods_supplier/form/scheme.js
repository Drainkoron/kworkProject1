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
				name: "Страна",
				type: "BlockSelect",
				col: 0
			},
			elem: {
				block: 'supplier',
				field: 'name',
                value: '',
				onChange: (value) => dictionaryChange('supplier', value, store)
			}
		}
	}	
	return scheme
}	