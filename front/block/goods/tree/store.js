import { observable, computed, action, toJS, intercept } from 'mobx'

import Basic from '../../../pattern/basic'

import { getTreeReq, updateTreeReq } from './request'

class TreeStore extends Basic {
    @observable tree
    @observable point
    @observable nodeName

    constructor() {
        super()
        this.tree = {},
        this.point = [],
        this.nodeName = ''
        this.maxLevel = 2
    }

    @action changeNodeName(value) {
        this.nodeName = value
    }

    @action addNode() {
        var currentNode = this.tree
        if(this.point.length == 1) {
            if(this.point[0].includes('-')) {
                this.point[0].split('-').forEach((key, index) => {
                    if(index < this.maxLevel) {
                        currentNode = currentNode[key]
                    }
                })
            } else {
                currentNode = currentNode[this.point[0]]
            }
        }
        currentNode[this.nodeName] = {}
        this.nodeName = ''
        this.updateTree()
    }

    @action deleteNode() {
        var currentNode = this.tree
        if(this.point[0].includes('-')) {
            var arrayPoint = this.point[0].split('-')
            arrayPoint.forEach((key, index) => {
                if(arrayPoint.length - 1 == index) {
                    delete currentNode[key]
                } else {
                    currentNode = currentNode[key]
                }
            })
        } else {
            delete currentNode[this.point[0]]
        }
        this.point = []
        this.updateTree()        
    }

    @action selectNode(point) {
        this.point = point
    }

    @action getPoint() {
        return this.point[0].split('-')
    }

    @action setData(data) {
        this.tree = data.doc
    }

    @action getTree() {
        getTreeReq({id: 1}).then(data => {
            delete data.doc.id
            this.setData(data)
        }, error => {
            this.messageError('Ошибка получения дерева!')
        })
    }

    @action updateTree() {
        this.tree.id = 1
        updateTreeReq(this.tree).then(data => {
            delete data.doc.id
            this.setData(data)
        }, error => {
            this.messageError('Ошибка получения дерева!')
        })
    }

    @action getTags() {
        var tags = new Set()
        function destructNode(node) {
            Object.keys(node).forEach(key => {
                tags.add(key)
                destructNode(node[key])
            }) 
            
        }
        destructNode(this.tree)
        return [...tags]
    } 

    // this.model = this.formModel()
    //     this.scheme = blockScheme(this)
    //     this.changeSheme = observeModel(this)
    //     this.form = {
    //         view: false,
    //         error: ''
    //     },
    //     this.listResult = {},
    //     this.requestObject = this.searchModel()

    /* model */

    // searchModel() {
    //     return {
    //         page: 1,
    //         limit: 10,
    //         fullSearch: "",
    //         filterField: {
    //             status: 'all',
    //         },
    //         sortBy: {
    //             param: 'date',
    //             reverse: true
    //         }
    //     }
    // }

    // formModel() {
    //     return {
    //         id: false,
    //         date: moment(Date.now()).utc().format(),
    //         status: 'Новая',
    //         manager: mainStore.model.login,
    //         customer: '',
    //         persone: '',
    //         address: '',
    //         phone: '',
    //         typeJob: '',
    //         costHour: '',
    //         durationHours: '',
    //         count: '',
    //         start: moment(Date.now()).utc().format(),
    //         duration: '',
    //         source: '',
    //         constructTable: false
    //     }
    // }

    
    /* Filter */

    // @action changeFilterType(value) {
    //     this.requestObject.filterField.status = value
    //     this.requestObject.page = 1
    //     this.getList()
    // }

    /* event Form */

    // @action validateForm() {
    //     this.form.error = formValidate(this.scheme)
    //     if(this.form.error == false) {
    //         if(this.keys.customer) {
    //             this.selectRequest()
    //         } else {
    //             this.addCustomer()
    //         }
    //     }
    // }

    // @action selectRequest() {
    //     if(this.model.id) {
    //         this.editForm()
    //     } else {
    //         this.saveForm()
    //     }
    // }

    // @action addCustomer() {
    //     if(this.model.customer == '') {
    //         this.form.error = 'Выберите или введите название заказчика!'
    //     } else {
    //         customerStore.addCustomerFromOrder(this.model, (id) => {
    //             this.keys.customer = id
    //             this.selectRequest()
    //         })
    //     }
    // }

    // @action newForm() {
    //     this.setModel(this.formModel())
    //     mainStore.history.push(`/cabinet/order-page/new`)
    // }

    // @action goList(elem) {
    //     mainStore.history.push(`/cabinet/order`)
    // }

    // @action goForm(elem) {
    //     mainStore.history.push(`/cabinet/order-page/${elem.id}`)
    // }

    /* Request */

    // @action getList() {
    //     getListReq(this.requestObject).then(data => {
    //         this.listResult = data
	// 	}, error => {
	// 		message.error('Ошибка получения списка работ!')
    //     })
    // }

}

const treeStore = new TreeStore()
export default treeStore