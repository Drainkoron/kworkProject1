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
        // this.payout = [],
        // this.receive = []
    }

    /* model */

    searchModel() {
        return {
            page: 1,
            limit: 10,
            full_search: '',
            filter_field: {
                position: 'all',
            },
            sort_by: { 
                param: 'date',
                reverse: true
            }
        }
    }

    formModel() {
        return {
            id: false,
            position: 'Соискатель',
            fio: '',
            phone: '',
            birthday: moment("19900101", "YYYYMMDD").utc().format(),
            education: '',
            specialty: '',
            rate: 100,
            status: 'Свободен',
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
        console.log(object)
        // this.form.view = false
        // this.requestObject.page = 1
        // this.getList()
    }

    // @action editForm() {
    //     console.log(this.model, 'edit')
    //     this.editFormRequest({json_data: this.model})
    // }

    // @action changeType(type) {
    //     this.model.type = type.target.value
    // }

    // /* Filter */

    // @action changeFilterType(value) {
    //     if(value == 'all') {
    //         this.requestObject.filter_field.position = 'all'
    //     } else {
    //         this.requestObject.filter_field.position = value
    //     }
    //     this.requestObject.page = 1
    //     this.getList()
    // }

    // /* event Form */
    // @action viewForm(elem) {
    //     elem.json_data.id = elem.id
    //     this.setModel(elem.json_data)
    // }

    // @action viewModal() {
    //     this.form.view = true
    // }

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