import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../../common/form_validate'
import observeModel from '../../../common/observe_model'
import Basic from '../../../pattern/basic'
import mainStore from '../../../pattern/main/main_store'
import ListStore from '../list/store'
import { addReq, editReq, deleteReq, getOptionsReq } from './request'



class FormStore extends Basic {
    @observable scheme
    @observable model
    @observable form
    @observable country

    constructor() {
        super()
        this.goodsSupplierId = 0,
        this.country = '',
        this.model = this.formModel()
        this.scheme = blockScheme(this)
        this.changeSheme = observeModel(this)
        this.form = {
            view: false,
            error: ''
        }
        this.options = null
    }

    formModel() {
        return {
            id: false,
            goods_supplier_id: 0,
            country: '',
            name: '',
            note: '',
            count: 0,
            cost: 0,
            currency: 'USD',
            weight: 0,
            course: 0,
            time_production: 0,
            time_branding: 0,
            default: false,
            fast_time: 0,
            fast_rate: 0,
            fast_cost_in: 0,
            fast_cost_out: 0,
            fast_cost_brand: 0,
            fast_cost_in_brand: 0,
            fast_cost_out_brand: 0,
            slow_time: 0,
            slow_rate: 0,
            slow_cost_in: 0,
            slow_cost_out: 0,
            slow_cost_brand: 0,
            slow_cost_in_brand: 0,
            slow_cost_out_brand: 0,
            rus_time: 0,
            rus_rate: 0,
            rus_cost_in: 0,
            rus_cost_out: 0,
            rus_cost_brand: 0,
            rus_cost_in_brand: 0,
            rus_cost_out_brand: 0,
            user: '',
        }
    }   

    /* Form */

    @action setIdGoodsSupplier(id, country) {
        this.goodsSupplierId = id
        this.country = country
    }

    @action addForm() {
        this.setModel(this.formModel())
        this.setOptions()
        this.viewModal()
    }

    @action async setOptions() {
        await getOptionsReq({id:1}).then(data => {
            this.options = data.doc
        }, error => {
            this.messageError('Ошибка получения настроек!')
        })
        for(var i in this.options) {
            if(i in this.model) {
                if(this.model[i] == 0 && i != 'id') {
                    this.model[i] = this.options[i]
                }
            }
        }
    }

    @action calcForm(name) {
        if(name != 'rus') {
            var costIn = ((this.model.cost * 1) * this.options[`${name}_сommission`] + (this.model.weight * 1) * 1.08 * this.model[`${name}_rate`]) * this.model.course
            this.model[`${name}_cost_in`] = costIn.toFixed(2)
            var costInBrand = (this.model[`${name}_cost_in`] * 1) + (this.model[`${name}_cost_brand`] * 1)
            this.model[`${name}_cost_in_brand`] = costInBrand.toFixed(2)
        } else {
            var rusCostIn = this.model.rus_rate + (this.model.cost * 1)
            this.model.rus_cost_in = rusCostIn.toFixed(2)
            var costInBrand = (this.model.rus_cost_in * 1) + (this.model.rus_cost_brand * 1)
            this.model.rus_cost_in_brand = costInBrand.toFixed(2)
        }        
    }

    @action validateForm() {
        this.model.goods_supplier_id = this.goodsSupplierId
        this.model.country = this.country
        this.form.error = formValidate(this.scheme)
        if(this.form.error == false) {
            if(this.model.id) {
                this.editForm()
            } else {
                this.saveForm()
            }
        }
    }

    @action copyForm() {
        this.model.id = null
        this.model.name += ' copy'
        this.validateForm()
    }

    @action saveForm() {
        this.model.user = mainStore.user
        addReq(this.model).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка сохранения просчёта!')
		})
    }

    @action addSuccess(data) {
        this.cancelForm()
        ListStore.updateList()
    }

    @action editForm() {
        editReq(this.model).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка редактирования просчёта!')
		})
    }

    @action viewForm(elem) {
        elem.doc.id = elem.id
        this.setModel(elem.doc)
        this.setOptions()
        this.viewModal()
    }

    @action deleteForm() {
        deleteReq({id: this.model.id}).then(data => {
            this.addSuccess(data)
		}, error => {
			this.messageError('Ошибка удаления поставщика!')
		})
    }

    @action changeDefault(event, data) {
        event.stopPropagation()
        data.doc.id = data.id
        data.doc.default = !data.doc.default
        this.setModel(data.doc)
        this.editForm()
    }
}

const formStore = new FormStore()
export default formStore