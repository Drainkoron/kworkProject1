import { observable, computed, action, toJS, intercept } from 'mobx'

import Basic from '../../../pattern/basic'

import { getTreeReq, updateTreeReq, getGoodsCategoryReq } from './request'

import listStore from '../list/store'
import selectListStore from '../select_list/store'

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
        console.log(point, 'point')
        this.point = point
        listStore.setPoint(this.point[0])
    }

    @action checkNode() {
        var tags = this.point[0] ? this.point[0].split('-') : []
        getGoodsCategoryReq({tags: tags}).then(data => {
            selectListStore.onSelectTag(data)
        }, error => {
            this.messageError('Ошибка получения товаров по категории!')
        })
    }

    @action getPoint() {
        return this.point[0].split('-')
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
}

const treeStore = new TreeStore()
export default treeStore