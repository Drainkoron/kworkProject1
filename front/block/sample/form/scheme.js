import React from 'react'
import moment from 'moment'
import { Icon } from 'antd'
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
		headerCol: [{name: 'main',
						text: 'Основная информация'},
					{name: 'fast',
						text: 'Быстрая закупка'},
					{name: 'slow',
						text: 'Медленная закупка'},
					{name: 'rus',
						text: 'Закупка в России'}],
		note: {
			options: {
				name: "Примечание",
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
		},
		name: {
			options: {
				name: "Название",
                type: "Input",
				textError: "Укажите название",
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
		count: {
			options: {
				name: "Тираж",
				type: "Number",
				format: 'num',
				textError: "Укажите  тираж",
				min: 1,
				col: 0
			},
			elem: {
				value: '',
				onChange: value => numberChange('count', value, store),
				name: "count"
			}
		},
		cost: {
			options: {
				name: "Цена поставщик",
				type: "Input",
				format: 'num',
				col: 0,
				addon: 'currency'
			},
			elem: {
				value: '',
				onChange: event => inputChange(event, store, 'cost'),
				name: "cost"
			}
		},
		currency: {
			options: {
				type: 'addon',
				col: 0
			},
			elem: {
				position: 'addonAfter',
				width: 80,
				type: 'Select',
				list: ['USD', 'CNY', 'Руб'],
				value: 'USD',
				onChange: value => addonChange('currency', value, store)
			}
		},
		weight: {
			options: {
				name: "Вес",
				type: "Input",
				format: 'num',
				col: 0
			},
			elem: {
				addonAfter: 'кг',
				value: '',
				onChange: event => inputChange(event, store, 'weight'),
				name: "weight"
			}
		},
		course: {
			options: {
				name: "Курс доллара",
				type: "Number",
				format: 'num',
				col: 0
			},
			elem: {
				value: '',
				onChange: value => numberChange('course', value, store),
				name: "course"
			}
		},
		time_production: {
			options: {
				name: "Срок производства",
				type: "Number",
				format: 'num',
				col: 0
			},
			elem: {
				value: '',
				onChange: value => numberChange('time_production', value, store),
				name: "time_production"
			}
		},
		time_branding: {
			options: {
				name: "Срок брендирования",
				type: "Number",
				format: 'num',
				col: 0
			},
			elem: {
				value: '',
				onChange: value => numberChange('time_branding', value, store),
				name: "time_branding"
			}
		},
		default: {
			options: {
				type: "Checked",
				name: "Выгружать в КП",
				col: 0
			},
			elem: {
				checked: false,
				onChange: (event) => checkChange(event, store),
				name: "default"
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
		fast_time: {
			options: {
				name: "Срок доставки",
				type: "Number",
				format: 'num',
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
				name: "Ставка доставки",
				type: "Number",
				format: 'num',
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('fast_rate', value, store),
				name: "fast_rate"
			}
		},
		fast_cost_in: {
			options: {
				name: "Цена закупки без БР",
				type: "Number",
				format: 'num',
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('fast_cost_in', value, store),
				name: "fast_cost_in"
			}
		},
		fast_cost_out: {
			options: {
				name: "Цена продажи без БР",
				type: "Number",
				format: 'num',
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('fast_cost_out', value, store),
				name: "fast_cost_out"
			}
		},
		fast_cost_brand: {
			options: {
				name: "Себестоимость БР",
				type: "Number",
				format: 'num',
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('fast_cost_brand', value, store),
				name: "fast_cost_brand"
			}
		},
		fast_cost_in_brand: {
			options: {
				name: "Цена закупки с БР",
				type: "Number",
				format: 'num',
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('fast_cost_in_brand', value, store),
				name: "fast_cost_in_brand"
			}
		},
		fast_cost_out_brand: {
			options: {
				name: "Цена продажи с БР",
				type: "Number",
				format: 'num',
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('fast_cost_out_brand', value, store),
				name: "fast_cost_out_brand"
			}
		},
		slow_time: {
			options: {
				name: "Срок доставки",
				type: "Number",
				format: 'num',
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
				name: "Ставка доставки",
				type: "Number",
				format: 'num',
				col: 2
			},
			elem: {
				value: '',
				onChange: value => numberChange('slow_rate', value, store),
				name: "slow_rate"
			}
		},
		slow_cost_in: {
			options: {
				name: "Цена закупки без БР",
				type: "Number",
				format: 'num',
				col: 2
			},
			elem: {
				value: '',
				onChange: value => numberChange('slow_cost_in', value, store),
				name: "slow_cost_in"
			}
		},
		slow_cost_out: {
			options: {
				name: "Цена продажи без БР",
				type: "Number",
				format: 'num',
				col: 2
			},
			elem: {
				value: '',
				onChange: value => numberChange('slow_cost_out', value, store),
				name: "slow_cost_out"
			}
		},
		slow_cost_brand: {
			options: {
				name: "Себестоимость БР",
				type: "Number",
				format: 'num',
				col: 2
			},
			elem: {
				value: '',
				onChange: value => numberChange('slow_cost_brand', value, store),
				name: "slow_cost_brand"
			}
		},
		slow_cost_in_brand: {
			options: {
				name: "Цена закупки с БР",
				type: "Number",
				format: 'num',
				col: 2
			},
			elem: {
				value: '',
				onChange: value => numberChange('slow_cost_in_brand', value, store),
				name: "slow_cost_in_brand"
			}
		},
		slow_cost_out_brand: {
			options: {
				name: "Цена продажи с БР",
				type: "Number",
				format: 'num',
				col: 2
			},
			elem: {
				value: '',
				onChange: value => numberChange('slow_cost_out_brand', value, store),
				name: "slow_cost_out_brand"
			}
		},
		rus_time: {
			options: {
				name: "Срок доставки",
				type: "Number",
				format: 'num',
				col: 3
			},
			elem: {
				value: '',
				onChange: value => numberChange('rus_time', value, store),
				name: "rus_time"
			}
		},
		rus_rate: {
			options: {
				name: "Ставка доставки",
				type: "Number",
				format: 'num',
				col: 3
			},
			elem: {
				value: '',
				onChange: value => numberChange('rus_rate', value, store),
				name: "rus_rate"
			}
		},
		rus_cost_in: {
			options: {
				name: "Цена закупки без БР",
				type: "Number",
				format: 'num',
				col: 3
			},
			elem: {
				value: '',
				onChange: value => numberChange('rus_cost_in', value, store),
				name: "rus_cost_in"
			}
		},
		rus_cost_out: {
			options: {
				name: "Цена продажи без БР",
				type: "Number",
				format: 'num',
				col: 3
			},
			elem: {
				value: '',
				onChange: value => numberChange('rus_cost_out', value, store),
				name: "rus_cost_out"
			}
		},
		rus_cost_brand: {
			options: {
				name: "Себестоимость БР",
				type: "Number",
				format: 'num',
				col: 3
			},
			elem: {
				value: '',
				onChange: value => numberChange('rus_cost_brand', value, store),
				name: "rus_cost_brand"
			}
		},
		rus_cost_in_brand: {
			options: {
				name: "Цена закупки с БР",
				type: "Number",
				format: 'num',
				col: 3
			},
			elem: {
				value: '',
				onChange: value => numberChange('rus_cost_in_brand', value, store),
				name: "rus_cost_in_brand"
			}
		},
		rus_cost_out_brand: {
			options: {
				name: "Цена продажи с БР",
				type: "Number",
				format: 'num',
				col: 3
			},
			elem: {
				value: '',
				onChange: value => numberChange('rus_cost_out_brand', value, store),
				name: "rus_cost_out_brand"
			}
		}
	}	
	return scheme
}	