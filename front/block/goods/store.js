import treeStore from './tree/store'
import listStore from './list/store'
import pageStore from './page/store'
import formStore from './form/store'
import selectListStore from './select_list/store'

const goodsStore = {
    tree: treeStore,
    list: listStore,
    page: pageStore,
    form: formStore,
    selectList: selectListStore
}

export default goodsStore