// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import App from './App';
import baseReducers from './reducers';
import baseRoutes from './routes';

import type { Routes } from './routes';

const render = (
    reducers: { [key: string]: Function } = baseReducers,
    routes: Routes = baseRoutes,
    storeCallback: Function,
    theme: Object,
) => {
    const composeEnhancers = (
        (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
    );
    const store = createStore(
        combineReducers(reducers),
        composeEnhancers(applyMiddleware(
            thunk
        ))
    );

    if (storeCallback) {
        storeCallback(store);
    }

    const root = document.getElementById('root');

    if (root) {
        ReactDOM.render(
            <Provider store={store}>
                <Router basename={process.env.CONTEXT || '/'}>
                    <App routes={routes} theme={theme} />
                </Router>
            </Provider>,
            root
        );
    }
};

export default render;
