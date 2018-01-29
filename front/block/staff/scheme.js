import moment from 'moment'

import { observable, computed, action, intercept } from 'mobx'

import inputChange from '../../common/input_change'
import checkChange from '../../common/check_change'
import changeDate from '../../common/date_change'
import dictionaryChange from '../../common/dictionary_change'
import numberChange from '../../common/number_change'

export function blockScheme(store) {
	const scheme = {
		store: store,
		fio: {
			options: {
				name: "ФИО",
                type: "Input",
				textError: "Укажите ФИО соискателя",
				min: 3,
				col: 0
			},
			elem: {
				disabled: false,
				placeholder: "Фамилия Имя Отчество",
				value: '',
				onChange: event => inputChange(event, store),
				name: "fio"
			}
		},
		phone: {
			options: {
				name: "Мобильный",
				type: "Input",
				format: "phone",
				textError: "Некорректный мобильный телефон",
				min: 17,
				col: 0
			},
			elem: {
				placeholder: "+7 (911) 999-00-99",
				value: '',
				onChange: event => inputChange(event, store),
				name: "phone"
			}
		},
		education: {
			options: {
				name: "Образование",
				type: "Input",
				col: 0
			},
			elem: {
				placeholder: "Среднее",
				value: '',
				onChange: event => inputChange(event, store),
				name: "education"
			}
		},
		specialty: {
			options: {
				name: "Специальность",
				type: "Input",
				col: 0
			},
			elem: {
				placeholder: "",
				value: '',
				onChange: event => inputChange(event, store),
				name: "specialty"
			}
		},
		birthday: {
			options: {
				name: "День рождения",
                type: "Date",
				textError: "Не верный формат дня рождения",
				col: 0
			},
			elem: {
				format: "DD-MM-YYYY",
				value: moment(),
				onChange: date => changeDate(date, store, 'birthday'),
				allowClear: false,
				name: "birthday"
			}
		},
		city: {
			options: {
				name: "Город",
				type: "Dictionary",
				col: 0
			},
			elem: {
                dictionary: 'city',
                value: '',
				onChange: (value) => dictionaryChange('city', value, store)
			}
		},
		address: {
			options: {
				name: "Адрес",
				type: "Textarea",
				col: 0
			},
			elem: {
                rows: 3,
				placeholder: "...",
				value: '',
				onChange: event => inputChange(event, store, 'address'),
				name: "address"
			}
		},
		source: {
			options: {
				name: "Источник",
				type: "Dictionary",
				col: 0
			},
			elem: {
                dictionary: 'source',
                value: '',
				onChange: (value) => dictionaryChange('source', value, store)
			}
		},
		dateReception: {
			options: {
				name: "Дата приема",
                type: "Date",
				textError: "Не верный формат даты приёма",
				col: 0
			},
			elem: {
				format: "DD-MM-YYYY",
				value: moment(),
				onChange: date => changeDate(date, store, 'dateReception'),
				allowClear: false,
				name: "dateReception"
			}
		},
		position: {
			options: {
				name: "Положение",
				type: "Input",
				col: 1
			},
			elem: {
				disabled: true,
				placeholder: "",
				value: '',
				onChange: event => inputChange(event, store),
				name: "position"
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
		rate: {
			options: {
				name: "Ставка в час",
				type: "Input",
				format: 'num',
				col: 1
			},
			elem: {
				value: '',
				onChange: event => inputChange(event, store),
				name: "rate"
			}
		},
		balance: {
			options: {
				name: "Баланс",
				type: "Number",
				format: 'num',
				col: 1
			},
			elem: {
				disabled: true,
				value: '',
				onChange: value => numberChange('balance' ,value, store),
				name: "balance"
			}
		},
		app: {
			options: {
				type: "Checked",
				name: "Моб.приложение",
				col: 1
			},
			elem: {
				checked: false,
				onChange: event => checkChange(event, store),
				name: "app"
			}
		},
		form: {
			options: {
				type: "Checked",
				name: "Спец.одежда",
				col: 1
			},
			elem: {
				checked: false,
				onChange: event => checkChange(event, store),
				name: "form"
			}
		},
		card: {
			options: {
				name: "Карта",
				type: "Textarea",
				col: 1
			},
			elem: {
                rows: 3,
				placeholder: "...",
				value: '',
				onChange: event => inputChange(event, store, 'card'),
				name: "card"
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