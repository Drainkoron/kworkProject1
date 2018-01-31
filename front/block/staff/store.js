import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../common/form_validate'
import observeModel from '../../common/observe_model'
import Basic from '../../pattern/basic'

import { Position } from './dictionary'
import { addReq, editReq, getListReq } from './request'



class StaffStore extends Basic {
    @observable scheme
    @observable model
    @observable form
    @observable listResult
    @observable requestObject
    @observable currentRow
    // @observable payout
    // @observable receive

    constructor() {
        super()
        this.model = this.formModel()
        this.scheme = blockScheme(this)
        this.changeSheme = observeModel(this)
        this.form = {
            view: false,
            error: ''
        },
        this.listResult = {},
        this.requestObject = this.searchModel()
        this.currentRow = null
        // this.payout = [],
        // this.receive = []
    }

    /* model */

    searchModel() {
        return {
            page: 1,
            limit: 10,
            fullSearch: '',
            filterField: {
                position: 'all',
            },
            sortBy: { 
                field: 'fio',
                reverse: false
            }
        }
    }

    formModel() {
        return {
            id: false,
            avatar: '',
            position: 'Соискатель',
            fio: '',
            phone: '',
            birthday: moment("19900101", "YYYYMMDD").utc().format(),
            education: '',
            specialty: '',
            rate: 100,
            status: 'Свободен',
            city: '',
            address: '',
            balance: 0,
            app: false,
            form: false,
            card: '',
            dateReception: moment(Date.now()).utc().format(),
            source: '',
            note: ''
        }
    }

    /* Form */

    @action validateForm() {
        this.form.error = formValidate(this.scheme)
        if(this.form.error == false) {
            if(this.model.id) {
                this.editForm()
            } else {
                this.saveForm()
            }
        }
    }

    @action saveForm() {
        addReq(this.model).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка сохранения работника!')
		})
    }

    @action addSuccess(object) {
        this.form.view = false
        this.requestObject.page = 1
        this.getList()
    }


    @action getList() {
        getListReq(this.requestObject).then(data => {
            this.listResult = data
		}, error => {
			message.error('Ошибка получения списка работников!')
        })
    }

    
    @action editForm() {
        editReq(this.model).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка редактирования работника!')
		})
    }

    // /* Filter */

    @action changeFilterType(value) {
        this.requestObject.filterField.position = value
        this.requestObject.page = 1
        this.getList()
    }

    /* event Form */
    @action viewForm(elem) {
        elem.doc.id = elem.id
        this.setModel(elem.doc)
    }

    @action setAvatar(value) {
        console.log(value, 'value')
        this.model.avatar = value
        this.saveForm()
    }

    // /* Payout */

    // @action getPayoutList() {
    //     getPayoutInStaffReq(this.model.id).then(data => {
	// 		if(data.success) {
    //             this.payout = data.body
    //         } else {
    //             message.error('Ошибка получения списка ведомостей!')
    //         }
	// 	}, error => {
	// 		message.error('Ошибка получения списка ведомостей!')
	// 	})
    // }

    // /* getReceiveList  */
    // @action getReceiveList() {
    //     var requestObject = {
    //         start: "2000-11-15T10:55:46Z",
    //         stop: "2050-11-15T10:55:46Z"
    //     }
    //     getReceiveInStaffReq(this.model.id, requestObject).then(data => {
	// 		if(data.success) {
    //             this.receive = data.body
    //         } else {
    //             message.error('Ошибка получения списка выплат!')
    //         }
	// 	}, error => {
	// 		message.error('Ошибка получения списка выплат!')
	// 	})
    // }
    
}

const staffStore = new StaffStore()
export default staffStore