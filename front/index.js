import React from 'react';
import { AppContainer } from 'react-hot-loader';
import ReactDOM  from 'react-dom';
import AppRouter from './pattern/routes';
import { LocaleProvider } from 'antd';
import ruRU from 'antd/lib/locale-provider/ru_RU'

import './pattern/custom.css';



const render = (Component) =>
    ReactDOM.render(
        <LocaleProvider locale={ruRU}>
            <AppContainer>
                <Component />
            </AppContainer>
        </LocaleProvider>,
        document.getElementById('app')
);

render(AppRouter);

if(module.hot) {
     module.hot.accept('./pattern/routes', () => {
        require('./pattern/routes');
        render(AppRouter);
    });
}