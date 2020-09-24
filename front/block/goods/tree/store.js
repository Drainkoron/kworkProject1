import { observable, computed, action, toJS, intercept } from 'mobx'

import Basic from '../../../pattern/basic'

import { getTreeReq, updateTreeReq, getGoodsCategoryReq, transferCategoryReq } from './request'

import listStore from '../list/store'
import selectListStore from '../select_list/store'

class TreeStore extends Basic {
    @observable tree
    @observable point
    @observable nodeName
    @observable editMode

    constructor() {
        super()
        this.tree = {},
        this.point = [],
        this.nodeName = '',
        this.editMode = false
        this.maxLevel = 2,
        this.transferNode = {}
    }

    @action changeNodeName(value) {
        this.nodeName = value
    }

    @action toggleEditMode() {
        this.editMode = !this.editMode
    }
    @action addNode() {
        var currentNode = this.tree
        if(this.point.length == 1) {
            if(this.point[0].includes('*')) {
                this.point[0].split('*').forEach((key, index) => {
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
        if(this.point[0].includes('*')) {
            var arrayPoint = this.point[0].split('*')
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
        listStore.setPoint(this.point[0])
    }

    @action checkNode() {
        var tags = this.point[0] ? this.point[0].split('*') : []
        getGoodsCategoryReq({tags: tags}).then(data => {
            selectListStore.onSelectTag(data)
        }, error => {
            this.messageError('Ошибка получения товаров по категории!')
        })
    }

    @action getPoint() {
        return this.point[0].split('*')
    }

    @action setData(data) {
        delete data.doc.id
        this.tree = Object.assign({}, data.doc)
    }

    @action getTree() {
        getTreeReq({id: 1}).then(data => {
            this.setData(data)
        }, error => {
            this.messageError('Ошибка получения дерева!')
        })
    }

    @action updateTree() {
        this.tree.id = 1
        updateTreeReq(this.tree).then(data => {
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

    @action onDragStart(node) {
        var pathKeys = node.props.eventKey.split('*')
        var currentNode = this.tree
        pathKeys.forEach((key, index) => {
            if(pathKeys.length - 1 == index) {
                this.transferNode = {node: currentNode[key], 
                                        key: key,
                                        pathKeys: pathKeys}
            } else {
                currentNode = currentNode[key]
            }
        })
    }

    @action onDragDrop(data) {
        var pathKeys = data.node.props.eventKey.split('*')

        // Если это текущая папка
        if(this.transferNode.pathKeys.slice(0, -1).toString() != pathKeys.toString()) {
            var currentNode = this.tree
            pathKeys.forEach((key, index) => {
                currentNode = currentNode[key]
            })
            currentNode[this.transferNode.key] = this.transferNode.node
            
            // Удалять нужно из дерева
            var deleteCurrentNode = this.tree
            this.transferNode.pathKeys.forEach((key, index) => {
                if(this.transferNode.pathKeys.length - 1 == index) {
                    delete deleteCurrentNode[key]
                } else {
                    deleteCurrentNode = deleteCurrentNode[key]
                }
            })

            // Обновление товаров
            var requestObject = {
                oldPath: this.transferNode.pathKeys,
                newPath: pathKeys
            }
            transferCategoryReq(requestObject).then(data => {
                this.updateTree() 
            }, error => {
                this.messageError('Ошибка переноса категории!')
            })
        }
    }

    @action folderGoRoot() {

        var currentNode = this.tree
        var arrayPoint = this.point[0].split('*')

        arrayPoint.forEach((key, index) => {
            if(arrayPoint.length - 1 == index) {
                this.tree[key] = currentNode[key]
                delete currentNode[key]
            } else {
                currentNode = currentNode[key]
            }
        })

        // Обновление товаров
        var requestObject = {
            oldPath: arrayPoint,
            newPath: []
        }
        transferCategoryReq(requestObject).then(data => {
            this.updateTree() 
        }, error => {
            this.messageError('Ошибка переноса категории в корень!')
        })
   
        this.point = []
        this.updateTree() 
    }
}

const treeStore = new TreeStore()
export default treeStore