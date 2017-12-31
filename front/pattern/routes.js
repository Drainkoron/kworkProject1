import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

import { Provider } from 'mobx-react';

import mainStore from './main/main_store.js'
import userStore from './users/store.js'

const store = { mainStore, userStore }

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