import { observable, computed, action, toJS, intercept } from 'mobx'

import { addReq, editReq, getListReq, reportCountReq, logigStaff, getPayoutInStaffReq } from './request'

import { message } from 'antd';
import { MessageConfig } from '../../app_constants'

message.config(MessageConfig);

class Basic {
    @action test() {
        return this.model
    }

    get(params) {
        return this[params]
    }

    @action set(params, value) {
        this[params] = value
    }

    /* form */

    @action setModel(data) {
        for(var i in data) {
            this.model[i] = data[i]
        }
    }

    @action setModelValue(params, value) {
        this.model[params] = value
    }

    @action setModelKey(params, value) {
        this.keys[params] = value
    }

    @action newForm() {
        this.setModel(this.formModel())
        this.form.view = true
    }

    @action resetForm() {
        this.setModel(this.formModel())
    }

    @action cancelForm() {
        this.form.view = false
    }




    /* request */
   
    @action editFormRequest(object) {
        editReq(object).then(data => {
			if(data.success) {
                console.log(data.body, 'result edit')
                this.addSuccess(data.body)
            } else {
                message.error('Ошибка редактирования работника!')
            }
		}, error => {
			message.error('Ошибка редактирования работника!')
		})
    }



    @action reportCount(field, callback) {
        reportCountReq(field).then(data => {
			if(data.success) {
                callback(data.body)
            } else {
                message.error('Ошибка получения отчёта!')
            }
		}, error => {
			message.error('Ошибка получения отчёта!')
        })
    }

    @action changeStatus(status) {
        logigStaff(this.model.id, {position: status}).then(data => {
			if(data.success) {
                this.resetForm()
                this.getList()
            } else {
                message.error('Ошибка смены сатуса работника!')
            }
		}, error => {
			message.error('Ошибка смены сатуса работника!')
        })
    }
}

export default Basic