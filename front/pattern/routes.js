import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Switch
} from 'react-router-dom'

import { Provider } from 'mobx-react';

import mainStore from './user/main_store.js'

const store = { mainStore }

import Auth from './user/component/auth'
import NoMatch from './component/no_match'

export default () => (
    <Router>
        <Provider {...store}>
            <Switch>
                <Route exact path='/' component={Auth}/>
                <Route component={NoMatch}/>
            </Switch>
        </Provider>
    </Router>
);

//https://reacttraining.com/react-router/web/guides/philosophy

//https://habrahabr.ru/post/329996/

//<Route path='/test' component={TestBlock}/>