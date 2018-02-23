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
		headerCol: ['Основная информация', 'Быстрая закупка', 'Медленная закупка'],
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
				name: "Цена",
				type: "Number",
				format: 'num',
				col: 0
			},
			elem: {
				value: '',
				onChange: value => numberChange('cost', value, store),
				name: "cost"
			}
		},
		weight: {
			options: {
				name: "Вес",
				type: "Number",
				format: 'num',
				col: 0
			},
			elem: {
				value: '',
				onChange: value => numberChange('weight', value, store),
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
				name: "По умолчанию",
				col: 0
			},
			elem: {
				checked: false,
				onChange: (event) => checkChange(event, store),
				name: "default"
			}
		},
		fast_time: {
			options: {
				name: "Ставка доставки",
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
				name: "Срок доставки",
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
				name: "Ставка доставки",
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
				name: "Срок доставки",
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
		}
	}	
	return scheme
}	