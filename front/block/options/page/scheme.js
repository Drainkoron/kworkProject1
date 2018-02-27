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
        course: {
			options: {
				name: "Курс USD",
				type: "Number",
				format: 'num',
				textError: "Укажите курс USD",
				min: 1,
				col: 0
			},
			elem: {
				value: '',
				onChange: value => numberChange('course', value, store),
				name: "course"
			}
        },
        fast_time: {
			options: {
				name: "Срок быстрой доставки",
				type: "Number",
				format: 'num',
				textError: "Укажите срок быстрой доставки",
				min: 1,
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('fast_time', value, store),
				name: "fast_time"
			}
        },
        fast_rate: {
			options: {
				name: "Ставка быстрой доставки",
				type: "Number",
				format: 'num',
				textError: "Укажите ставку быстрой доставки",
				min: 1,
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('fast_rate', value, store),
				name: "fast_rate"
			}
		},
		fast_сommission: {
			options: {
				name: "Комиссия быстрой доставки",
				type: "Number",
				format: 'num',
				textError: "Укажите комиссию быстрой доставки",
				min: 1,
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('fast_сommission', value, store),
				name: "fast_сommission"
			}
        },
        slow_time: {
			options: {
				name: "Срок медленной доставки",
				type: "Number",
				format: 'num',
				textError: "Укажите срок медленной доставки",
				min: 1,
				col: 2
			},
			elem: {
				value: '',
				onChange: value => numberChange('slow_time', value, store),
				name: "slow_time"
			}
        },
        slow_rate: {
			options: {
				name: "Ставка медленной доставки",
				type: "Number",
				format: 'num',
				textError: "Укажите ставку медленной доставки",
				min: 1,
				col: 2
			},
			elem: {
				value: '',
				onChange: value => numberChange('slow_rate', value, store),
				name: "slow_rate"
			}
		},
		slow_сommission: {
			options: {
				name: "Комиссия медленной доставки",
				type: "Number",
				format: 'num',
				textError: "Укажите комиссию медленной доставки",
				min: 1,
				col: 2
			},
			elem: {
				value: '',
				onChange: value => numberChange('slow_сommission', value, store),
				name: "slow_сommission"
			}
        },
	}	
	return scheme
}	