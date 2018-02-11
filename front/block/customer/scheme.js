import moment from 'moment'

import { observable, computed, action, intercept } from 'mobx'

import inputChange from '../../common/input_change'
import checkChange from '../../common/check_change'
import changeDate from '../../common/date_change'
import dictionaryChange from '../../common/dictionary_change'
import numberChange from '../../common/number_change'

const customerType = [{
						id: 0,
						name: 'Компания'	
					},
					{
						id: 1,
						name: 'Частное лицо'
					}]

export function blockScheme(store) {
	const scheme = {
		store: store,
		customer: {
			options: {
				name: "Название",
				type: "Input",
				textError: "Заполните название клиента",
				min: 4,
				col: 0
			},
			elem: {
                type: 'text',
				placeholder: "название",
				value: '',
				onChange: event => inputChange(event, store),
				name: "customer"
			}
		},
		type: {
			options: {
				name: "Тип клиента",
				type: "Select",
				col: 0
			},
			elem: {
				list: customerType,
				value: '',
				onChange: (value) => dictionaryChange('type', value, store)
			}
		},
		persone: {
			options: {
				name: "Контактное лицо",
				type: "Input",
				col: 0
			},
			elem: {
                type: 'text',
				placeholder: "Контактное лицо",
				value: '',
				onChange: event => inputChange(event, store),
				name: "persone"
			}
		},
		address: {
			options: {
				name: "Адрес",
				type: "Input",
				col: 0
			},
			elem: {
                type: 'textarea',
                rows: 3,
				placeholder: "...",
				value: '',
				onChange: event => inputChange(event, store),
				name: "address"
			}
		},
        phone: {
			options: {
				name: "Телефон",
				type: "Input",
				col: 0
			},
			elem: {
				placeholder: "554-54-56",
				value: '',
				onChange: event => inputChange(event, store),
				name: "phone"
			}
		},
		payDetails: {
			options: {
				name: "Реквизиты",
				type: "Input",
				col: 0
			},
			elem: {
                type: 'textarea',
                rows: 3,
				placeholder: "...",
				value: '',
				onChange: event => inputChange(event, store),
				name: "payDetails"
			}
		},
		status: {
			options: {
				name: "Статус",
				type: "Input",
				col: 1
			},
			elem: {
				disabled: true,
				placeholder: "",
				value: '',
				onChange: event => inputChange(event, store),
				name: "status"
			}
		},
		costHour: {
			options: {
				name: "Цена 1 часа",
				type: "Number",
				format: 'num',
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('costHour' ,value, store), 
				name: "costHour"
			}
		},
		durationHours: {
			options: {
				name: "Длительность смены",
				type: "Number",
				format: 'num',
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('durationHours' ,value, store), 
				name: "durationHours"
			}
		},
		typeJob: {
			options: {
				name: "Тип работ",
				type: "Dictionary",
				col: 1
			},
			elem: {
				dictionary: 'job_type',
				value: '',
				onChange: (value) => dictionaryChange('typeJob', value, store)
			}
		},
		source: {
			options: {
				name: "Источник",
				type: "Dictionary",
				col: 1
			},
			elem: {
				dictionary: 'source',
				value: '',
				onChange: (value) => dictionaryChange('source', value, store)
			}
		},
		manager: {
			options: {
				name: "Менеджер",
				type: "User",
				col: 1
			},
			elem: {
				value: '',
				onChange: (value) => dictionaryChange('manager', value, store)
			}
		}
	}	
	return scheme
}