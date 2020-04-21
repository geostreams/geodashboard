import "@babel/polyfill";
import 'isomorphic-fetch';
import React from 'react';
import {render} from 'react-dom';
import App from './app/containers/App';
import { Provider } from 'react-redux';
import './app/styles/main.css';
import './app/styles_custom/react-mdc-web.css'
import configureStore from './app/store/configureStore';

// ref: http://stackoverflow.com/questions/33915826/exclude-module-from-webpack-minification
// https://opensource.ncsa.illinois.edu/bitbucket/projects/GEOD/repos/geodashboard-v3/pull-requests/33/overview
// set sendfile in nginx.conf as off to forbid browser cache config.js

const config = require('./config.js')

// import {gd3} from './config.js';

window.configruntime = config

console.log("Running App version " + VERSION)

let store = configureStore()

render(<Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)