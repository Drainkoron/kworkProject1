import { observable, computed, action } from 'mobx'

import inputChange from '../../common/input_change'
import checkChange from '../../common/check_change'

export default function tableScheme(store) {
	const scheme = {
		store: store,
		name: {
			options: {
				name: "Имя таблицы",
                type: "Input",
                format: "eng",
				min: 5,
				textError: "Имя не может быть короче 5 символов"
			},
			elem: {
				placeholder: "table name",
				value: '',
				onChange: (event) => inputChange(event, store),
				name: "name"
			}
		}
	}	
	return scheme
}	


