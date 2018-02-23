import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

import { Provider } from 'mobx-react';

/* Pattern block */
import mainStore from './main/main_store'
import userStore from './users/store'
import tableStore from './table/store'

/* Custom block */
import goodsStore from '../block/goods/store'
import supplierStore from '../block/supplier/store'
import optionsStore from '../block/options/store'
import goodsSupplierStore from '../block/goods_supplier/store'
import calculationStore from '../block/calculation/store'
import sampleStore from '../block/sample/store'

// import staffStore from '../block/staff/store'
// import customerStore from '../block/customer/store'
// import orderStore from '../block/order/store'

const store = { mainStore, 
                userStore, 
                tableStore,
                goodsStore,
                supplierStore,
                optionsStore,
                goodsSupplierStore,
                calculationStore,
                sampleStore }

import Auth from './main/component/auth'
import NoMatch from './component/no_match'
import Cabinet from './cabinet'

export default () => (
    <Router>
        <Provider {...store}>
            <Switch>
                <Route exact path='/' component={Auth}/>
                <Route path='/cabinet' component={Cabinet}/>
                <Route component={NoMatch}/>
            </Switch>
        </Provider>
    </Router>
);

//https://reacttraining.com/react-router/web/guides/philosophy

//https://habrahabr.ru/post/329996/

//<Route path='/test' component={TestBlock}/>