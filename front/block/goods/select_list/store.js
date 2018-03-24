import { observable, computed, action, toJS, intercept } from 'mobx'
import Basic from '../../../pattern/basic'

import { getIdsReq } from './request'
import mainStore from '../../../pattern/main/main_store'
import pdfObject from '../../../generate/pdf/make'

class SelectListStore extends Basic {
    @observable list

    constructor() {
        super()
        this.list = []
    }

    @action setSelect(keys) {
        if(keys != 'null') {
            getIdsReq({keys: keys}).then(data => {
                this.list = data
            }, error => {
                this.messageError('Ошибка получения товаров по ключам!')
            })
        }
    }

    // Второй параметр отвечает за удаление елемента если он есть
    @action onSelect(goods, del) {
        var includes = null
        this.list.forEach((elem, index) => {
            if(elem.id == goods.id) {
                includes = index
            }
        })
        if(includes == null) {
            this.list.push(goods)
        } else {
            if(del) {
                this.list.splice(includes, 1)
            }
        }
    }

    @action onSelectPage(goods) {
        goods.forEach(elem => {
            this.onSelect(elem, true)
        })
    }

    @action onSelectTag(goods) {
        goods.forEach(elem => {
            this.onSelect(elem, false)
        })
    }

    @computed get getSelectKeys() {
        var keys = []
        this.list.forEach(elem => {
            keys.push(elem.id)
        })
        mainStore.history.push(`/cabinet/goods/${keys.length ? keys.join() : null}`)
        return keys
    }

    @action deleteGoods(data) {
        data.event.stopPropagation()
        var includes = null
        this.list.forEach((elem, index) => {
            if(elem.id == data.id) {
                includes = index
            }
        })
        if(includes != null) {
            this.list.splice(includes, 1)
        }
    }

    @action makePdf() {
        pdfObject.start(this.list.toJS())
    }
}

const selectListStore = new SelectListStore()
export default selectListStore