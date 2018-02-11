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
		persone: {
			options: {
				name: "Контактное лицо",
				type: "Input",
				textError: "Заполните контактное лицо",
				min: 3,
				col: 0
			},
			elem: {
                type: 'text',
				placeholder: "контактное лицо",
				value: '',
				onChange: event => inputChange(event, store),
				name: "persone"
			}
		},
		phone: {
			options: {
				name: "Телефон",
				type: "Input",
				textError: "Заполните телефон",
				min: 3,
				col: 0
			},
			elem: {
				placeholder: "554-54-56",
				value: '',
				onChange: event => inputChange(event, store),
				name: "phone"
			}
		},
		address: {
			options: {
				name: "Адрес",
				type: "Input",
				textError: "Заполните адрес",
				min: 3,
				col: 0
			},
			elem: {
                type: 'textarea',
                rows: 4,
				placeholder: "...",
				value: '',
				onChange: event => inputChange(event, store),
				name: "address"
			}
		},
		manager: {
			options: {
				name: "Менеджер",
				type: "User",
				textError: "Укажите менеджера",
				min: 3,
				col: 0
			},
			elem: {
				value: '',
				onChange: (value) => dictionaryChange('manager', value, store)
			}
		},
		start: {
			options: {
				name: 'Дата начала работ',
                type: "Date",
				textError: "Не верный формат даты начала",
				min: 3,
				col: 1
			},
			elem: {
				showTime: { format: 'HH:mm' },
				format: "HH:mm DD-MM-YYYY",
				value: moment(),
				onChange: date => changeDate(date, store, 'start'),
				allowClear: false,
				name: "start"
			}
		},
		typeJob: {
			options: {
				name: "Тип работ",
				type: "Dictionary",
				textError: "Укажите тип работ",
				min: 3,
				col: 1
			},
			elem: {
				group: 4,
				value: '',
				onChange: (value) => dictionaryChange('typeJob', value, store)
			}
		},
		costHour: {
			options: {
				name: "Цена 1 часа",
				type: "Number",
				format: 'num',
				textError: "Укажите стоимость часа работ",
				min: 3,
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
				textError: "Укажите длительность смены",
				min: 1,
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('durationHours' ,value, store), 
				name: "durationHours"
			}
		},
		count: {
			options: {
				name: "Количество рабочих",
				type: "Number",
				format: 'num',
				textError: "Укажите количество рабочих",
				min: 3,
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('count' ,value, store),
				name: "count"
			}
		},
		duration: {
			options: {
				name: "Длительность работ (дней)",
				type: "Number",
				format: 'num',
				textError: "Укажите длительность работ",
				min: 1,
				col: 1
			},
			elem: {
				value: '',
				onChange: value => numberChange('duration' ,value, store),
				name: "duration"
			}
		},
		source: {
			options: {
				name: "Источник",
				type: "Dictionary",
				col: 0
			},
			elem: {
				group: 3,
				value: '',
				onChange: (value) => dictionaryChange('source', value, store)
			}
		},	
	}	
	return scheme
}	




// fio: {
// 	options: {
// 		name: "ФИО",
// 		type: "Input",
// 		textError: "Укажите ФИО соискателя",
// 		min: 3,
// 		col: 0
// 	},
// 	elem: {
// 		disabled: false,
// 		placeholder: "Фамилия Имя Отчество",
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "fio"
// 	}
// },
// phone: {
// 	options: {
// 		name: "Мобильный",
// 		type: "Input",
// 		format: "phone",
// 		textError: "Некорректный мобильный телефон",
// 		min: 17,
// 		col: 0
// 	},
// 	elem: {
// 		placeholder: "+7 (911) 999-00-99",
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "phone"
// 	}
// },
// education: {
// 	options: {
// 		name: "Образование",
// 		type: "Input",
// 		col: 0
// 	},
// 	elem: {
// 		placeholder: "Среднее",
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "education"
// 	}
// },
// specialty: {
// 	options: {
// 		name: "Специальность",
// 		type: "Input",
// 		col: 0
// 	},
// 	elem: {
// 		placeholder: "",
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "specialty"
// 	}
// },
// birthday: {
// 	options: {
// 		name: "День рождения",
// 		type: "Date",
// 		textError: "Не верный формат дня рождения",
// 		col: 0
// 	},
// 	elem: {
// 		format: "DD-MM-YYYY",
// 		value: moment(),
// 		onChange: date => changeDate(date, store, 'birthday'),
// 		allowClear: false,
// 		name: "birthday"
// 	}
// },
// address: {
// 	options: {
// 		name: "Адрес",
// 		type: "Input",
// 		col: 0
// 	},
// 	elem: {
// 		type: 'textarea',
// 		rows: 3,
// 		placeholder: "...",
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "address"
// 	}
// },
// source: {
// 	options: {
// 		name: "Источник",
// 		type: "Dictionary",
// 		col: 0
// 	},
// 	elem: {
// 		group: 3,
// 		value: '',
// 		onChange: (value) => dictionaryChange('source', value, store)
// 	}
// },
// manager: {
// 	options: {
// 		name: "Менеджер",
// 		type: "User",
// 		col: 0
// 	},
// 	elem: {
// 		value: '',
// 		onChange: (value) => dictionaryChange('manager', value, store)
// 	}
// },
// dateReception: {
// 	options: {
// 		name: "Дата приема",
// 		type: "Date",
// 		textError: "Не верный формат даты приёма",
// 		col: 0
// 	},
// 	elem: {
// 		format: "DD-MM-YYYY",
// 		value: moment(),
// 		onChange: date => changeDate(date, store, 'dateReception'),
// 		allowClear: false,
// 		name: "dateReception"
// 	}
// },
// position: {
// 	options: {
// 		name: "Положение",
// 		type: "Input",
// 		col: 1
// 	},
// 	elem: {
// 		disabled: true,
// 		placeholder: "",
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "position"
// 	}
// },
// status: {
// 	options: {
// 		name: "Статус",
// 		type: "Input",
// 		col: 1
// 	},
// 	elem: {
// 		disabled: true,
// 		placeholder: "",
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "status"
// 	}
// },
// rate: {
// 	options: {
// 		name: "Ставка в час",
// 		type: "Input",
// 		format: 'num',
// 		col: 1
// 	},
// 	elem: {
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "rate"
// 	}
// },
// fund: {
// 	options: {
// 		name: "Фонд",
// 		type: "Input",
// 		format: 'num',
// 		col: 1
// 	},
// 	elem: {
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "fund"
// 	}
// },
// app: {
// 	options: {
// 		type: "Checked",
// 		name: "Моб.приложение",
// 		col: 1
// 	},
// 	elem: {
// 		checked: false,
// 		onChange: event => checkChange(event, store),
// 		name: "app"
// 	}
// },
// form: {
// 	options: {
// 		type: "Checked",
// 		name: "Спец.одежда",
// 		col: 1
// 	},
// 	elem: {
// 		checked: false,
// 		onChange: event => checkChange(event, store),
// 		name: "form"
// 	}
// },
// card: {
// 	options: {
// 		name: "Карта",
// 		type: "Input",
// 		col: 1
// 	},
// 	elem: {
// 		type: 'textarea',
// 		rows: 3,
// 		placeholder: "...",
// 		value: '',
// 		onChange: event => inputChange(event, store),
// 		name: "card"
// 	}
// }