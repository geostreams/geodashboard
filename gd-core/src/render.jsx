// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { ThemeProvider } from '@material-ui/core/styles';

import App from './App';
import baseReducers, { history } from './reducers';
import baseRoutes from './routes';
import theme from './theme';

import type { Routes } from './routes';

const render = (
    reducers: { [key: string]: Function } = baseReducers,
    routes: Routes = baseRoutes,
    storeCallback: Function
) => {
    const composeEnhancers = (
        (process.env.NODE_ENV === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
    );
    const store = createStore(
        combineReducers(reducers),
        composeEnhancers(applyMiddleware(
            routerMiddleware(history),
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
                <ConnectedRouter history={history}>
                    <ThemeProvider theme={theme}>
                        <App routes={routes} />
                    </ThemeProvider>
                </ConnectedRouter>
            </Provider>,
            root
        );
    }
};

export default render;
