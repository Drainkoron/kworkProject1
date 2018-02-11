import { observable, computed, action, toJS, intercept } from 'mobx'
import moment from 'moment'
import { blockScheme } from './scheme.js'
import formValidate from '../../common/form_validate'
import { addReq, 
            editReq,
            getListReq, 
            addStaffInOrderReq, 
            getStaffinOrderReq, 
            getStaffFreeReq, 
            deleteStaffInOrderReq, 
            getOrderActReq, 
            getPayoutActReq,
            getTableInOrderReq,
            getJobsInTableReq,
            generateTabeleReq,
            createJobReq } from './request'

import observeModel from '../../common/observe_model'
import { Position } from './dictionary'
import mainStore from '../../pattern/stores/main_store'
import Basic from './basic.js'

import customerStore from '../customer/store' //addCustomerFromOrder
import receiveStore from '../receive/store'
import orderTableStore from '../order_table/store'

import { message } from 'antd';
import { MessageConfig } from '../../app_constants'
message.config(MessageConfig);

class OrderStore extends Basic {
    @observable scheme
    @observable model
    @observable form
    @observable listResult
    @observable requestObject
    @observable keys
    @observable selectStaff
    @observable act
    @observable payout
    

    constructor() {
        super()
        this.model = this.formModel()
        this.keys = {
            customer: false
        }
        this.changeKeys = this.interceptorKeys()
        this.scheme = blockScheme(this)
        this.changeSheme = observeModel(this)
        this.form = {
            view: false,
            error: ''
        },
        this.listResult = {},
        this.requestObject = this.searchModel(),
        this.selectStaff = {
            view: false,
            freeList: [],
            currentList: []
        },
        this.act = [],
        this.payout = []
    }

    /* model */

    searchModel() {
        return {
            page: 1,
            limit: 10,
            full_search: "",
            filter_field: {
                status: 'all',
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
            date: moment(Date.now()).utc().format(),
            status: 'Новая',
            manager: mainStore.user.username,
            customer: '',
            persone: '',
            address: '',
            phone: '',
            typeJob: '',
            costHour: '',
            durationHours: '',
            count: '',
            start: moment(Date.now()).utc().format(),
            duration: '',
            source: '',
            constructTable: false
        }
    }

    /* Form */

    @action validateForm() {
        this.form.error = formValidate(this.scheme)
        if(this.form.error == false) {
            if(this.keys.customer) {
                this.selectRequest()
            } else {
                this.addCustomer()
            }
        }
    }

    @action selectRequest() {
        if(this.model.id) {
            this.editForm()
        } else {
            this.saveForm()
        }
    }

    @action addCustomer() {
        if(this.model.customer == '') {
            this.form.error = 'Выберите или введите название заказчика!'
        } else {
            customerStore.addCustomerFromOrder(this.model, (id) => {
                this.keys.customer = id
                this.selectRequest()
            })
        }
    }

    @action saveForm() {
        var requestObject = {
            customer: this.keys.customer,
            json_data: this.model
        }
        this.saveFormRequest(requestObject)
    }

    @action editForm() {
        var requestObject = {
            customer: this.keys.customer,
            json_data: this.model
        }
        this.editFormRequest(requestObject)
    }

    @action getForm(id) {
        console.log(id, 'get form id')
        this.getFormRequest(id)
    }

    /* Filter */

    @action changeFilterType(value) {
        if(value == 'all') {
            this.requestObject.filter_field.status = 'all'
        } else {
            this.requestObject.filter_field.status = value
        }
        this.requestObject.page = 1
        this.getList()
    }

    /* event Form */

    @action newForm() {
        this.setModel(this.formModel())
        mainStore.history.push(`/cabinet/order-page/new`)
    }

    @action goList(elem) {
        mainStore.history.push(`/cabinet/order`)
    }

    @action goForm(elem) {
        mainStore.history.push(`/cabinet/order-page/${elem.id}`)
    }

    /* Selected Staff*/

    @action setViewSelectStaff() {
        this.selectStaff.view = !this.selectStaff.view
        if(this.selectStaff.view) {
            this.getStaffFreeReq()
        } else {
            this.getStaffinOrder()
        }
    }

    @action getStaffinOrder() {
        getStaffinOrderReq(this.model.id).then(data => {
            if(data.success) {
                this.selectStaff.currentList = data.body
            } else {
                message.error('Ошибка получения списка работников!')
            }
        }, error => {
            message.error('Ошибка получения списка работников!')
        })
    }

    @action getStaffFreeReq() {
        var requestsObject = {
            start: this.model.start,
            duration: this.model.duration
        }

        getStaffFreeReq(requestsObject).then(data => {
            if(data.success) {
                this.selectStaff.freeList = data.body
            } else {
                message.error('Ошибка подбора работников!')
            }
        }, error => {
            message.error('Ошибка подбора работников!')
        })
    }

    @action addStaffInOrder(staff) {
        var requestsObject = {
            order: this.model.id,
            staff: staff.id
        }
        addStaffInOrderReq(requestsObject).then(data => {
            if(data.success) {
                this.getStaffFreeReq()
                this.chekTabel(staff)
            } else {
                message.error('Ошибка добавления работника в заявку!')
            }
        }, error => {
            message.error('Ошибка добавления работника в заявку!')
        })
    }

    @action chekTabel(staff) {
        getTableInOrderReq(this.model.id).then(data => {
            if(data.success) {
                if(data.body.length) {
                    this.addJobLine(data.body, staff)
                } else {
                    console.log('табель ещё несформирован')
                }
            } else {
                message.error('Ошибка получения списка табелей!')
            }
        }, error => {
            message.error('Ошибка получения списка табелей!')
        })
    }

    addJobLine(tabel, staff) {
        tabel.forEach((elem, index) => {
            var requestObject = {
                order: this.model.id,
                staff: staff.id,
                table: elem.id,
                json_data: {
                    count: 0,
                    fio: staff.json_data.fio,
                    payout: null,
                    penalty: 0,
                    phone: staff.json_data.phone,
                    rate: staff.json_data.rate,
                    sum: 0,
                    count: 0
                }
            }
            createJobReq(requestObject).then(data => {
                if(data.success) {
                    
                } else {
                    message.error('Ошибка сохранения работы в табель!')
                }
            }, error => {
                message.error('Ошибка сохранения работы в табель!')
            })

        })
    }


    @action deleteStaffInOrder(id) {
        if(!this.model.constructTable) {
            var requestsObject = {
                order: this.model.id,
                interval: id
            }
            deleteStaffInOrderReq(requestsObject).then(data => {
                if(data.success) {
                    this.getStaffinOrder()
                } else {
                    message.error('Ошибка удалеия работника из заявки!')
                }
            }, error => {
                message.error('Ошибка удалеия работника из заявки!')
            })
        } else {
            message.error('Нельзя удалить работника из заявки с активным табелем!')
        }
    }

    /* Process */
    @action changeStatus(status) {
        switch(status) {
            case 'Исполнение':
                this.changeStatusSend(status)

                    break
            case 'В работе':
                if(this.selectStaff.currentList.length) {
                    this.changeStatusSend(status)
                } else {
                    message.error('Нельзя начать работу без работников!')
                }
                    break

            case 'Расчёты':
                this.changeStatusSend(status)
                    break

            case 'Завершено':
                this.changeStatusSend(status)
                    break
        }
    }


    /* act */
    @action getAct() {
        getOrderActReq(this.model.id).then(data => {
            if(data.success) {
                this.act = data.body
            } else {
                message.error('Ошибка получения списка актов!')
            }
        }, error => {
            message.error('Ошибка получения списка актов!')
        })
    }

    /* payout */ 
    @action getPayout() { 
        getPayoutActReq(this.model.id).then(data => {
            if(data.success) {
                this.payout = data.body
            } else {
                message.error('Ошибка получения списка ведомостей!')
            }
        }, error => {
            message.error('Ошибка получения списка ведомостей!')
        })
    }

    /* Receive */
    @action addReceive(payout) {
        receiveStore.addReceiveInOrder(payout, () => {
            this.getPayout()
        })
    }


    /* Print */
    @action setDataPrintPayuot() {

        var index = {
            indexRate: 0,
            indexFond: 0,
            totalHoursIndex: 0, 
            penaltyIndex: 0,
            totalPay: 0,
            issued: 0,
            residue: 0
        }

        var printPayoutData = {
            main: {
                object: this.model.customer,
                supplier: this.model.address,
            },
            headers: ['id', 'ФИО', 'Итого часов', 'Ставка', 'Штраф', 'Фонд', 'Итого', 'Подпись'],
            data: [],
            total: []
        }

        var table = []
        var jobs = new Map()

        // Получаем все табели строим хеадер из дат
        getTableInOrderReq(this.model.id).then(data => {
            if(data.success) {
                table = data.body 
                 // Заполняем даты в шапку
                var countDay = 2
                table.forEach(elem => {
                    printPayoutData.headers.splice(countDay, 0, moment(elem.json_data.date).format('D MMM YY'))
                    countDay++
                })
                greateLine(this.selectStaff.currentList)
            } else {
                message.error('Ошибка получения списка табелей!')
            }
        }, error => {
            message.error('Ошибка получения списка табелей!')
        })

        // Сохдаём строку для каждого работника
        function greateLine(jobList) {
            index.indexRate = printPayoutData.headers.indexOf('Ставка')
            index.indexFond = printPayoutData.headers.indexOf('Фонд')
            index.totalHoursIndex = printPayoutData.headers.indexOf('Итого часов')
            index.penaltyIndex = printPayoutData.headers.indexOf('Штраф')
            index.totalPay = printPayoutData.headers.indexOf('Итого')
            index.totalPay = printPayoutData.headers.indexOf('Итого')
            index.sign = printPayoutData.headers.indexOf('Подпись')
   
            jobList.forEach(staff => {
                var line = []
                line[0] = staff.id
                line[1] = staff.json_data.fio
                line[index.indexRate] = staff.json_data.rate * 1
                line[index.indexFond] = staff.json_data.balance * 1
                line[index.totalHoursIndex] = 0
                line[index.penaltyIndex] = 0
                line[index.totalPay] = 0
                line[index.sign] = ''
                printPayoutData.data.push(line)
            })
            getJobs()
        }

        // Получаем работы по табелю
        function getJobs() {
            table.forEach(elem => {
                getJobsInTableReq(elem.id).then(data => {
                    if(data.success) {
                        jobs.set(elem.id, data.body)
                        if(elem.id == table[table.length - 1].id) {
                            setData()
                        }
                    } else {
                        message.error('Ошибка получения списка работ!')
                    }
                }, error => {
                    message.error('Ошибка получения списка работ!')
                })
            })
        }

        // Заполняем часы в дни + суммируем штраф
        function setData() {
            var countDay = 2
           
            table.forEach(elem => {
                jobs.get(elem.id).forEach(job => {
                    printPayoutData.data.forEach(elem => {
                        if(elem[0] == job.staff) {
                            elem[countDay] = job.json_data.count || 0
                            elem[index.penaltyIndex] += job.json_data.penalty || 0
                            elem[index.totalHoursIndex] += job.json_data.count || 0
                            elem[index.totalPay] += job.json_data.sum || 0
                            elem[index.totalPay] -= job.json_data.penalty || 0
                        }
                    })
                })
                countDay++
            })
            setTotal()
        }

        // Итоги с работником
        function setTotal() {
            printPayoutData.headers.forEach((name, index) => {
                if(index > 1 && name != 'Подпись') {
                    printPayoutData.data.forEach(line => {
                        if(printPayoutData.total[index] == undefined) {
                            printPayoutData.total[index] = 0
                        }
                        printPayoutData.total[index] += line[index] || 0
                    })
                } else {
                    printPayoutData.total[index] = ''
                }
            })
            request()
        }

        function request() {
            generateTabeleReq({data: printPayoutData}).then(data => {
                if(data.success) {
                    window.open(`https://wh2.dev-base.ru/${data.body}`, '_top');
                    console.log(data.body)
                } else {
                    message.error('Ошибка формирования табеля для печати!')
                }
            }, error => {
                message.error('Ошибка формирования табеля для печати!')
            })
        }
        


        // Получаем работы для каждого работника
        // printPayoutData.data.forEach(data => {
        //     getJobInStaffReq(data[0]).then(data => {
        //         if(data.success) {
        //             //console.log(data.body, 'ok')
        //         } else {
        //             message.error('Ошибка получения списка работ по работнику!')
        //         }
        //     }, error => {
        //         message.error('Ошибка получения списка работ по работнику!')
        //     })
        // })

        // 

        

        // getJobInStaffReq

        //console.log(header, 'header')
    }

    /* external */
    
    // @action changeSelect(value) {
    //     this.requestObject.page = 1
    //     this.requestObject.full_search = value
    //     this.requestObject.filter_field.type = ''
    //     this.getList()
    // }

    // @action addFromSelect(value, callback) {
    //     this.setModel(this.formModel())
    //     this.model.company = value
    //     addReq({json_data: this.model}).then(data => {
	// 		if(data.success) {
    //             callback(data.body.id)
    //         } else {
    //             console.log("error requests")
    //         }
	// 	}, error => {
	// 		this.formError = 'Ошибка авторизации!'
	// 	})
    // }
}

const orderStore = new OrderStore()
export default orderStore