import React from 'react'
import {render} from 'react-dom'
import App from './app/containers/App'
import { Provider } from 'react-redux'
import './app/styles/main.css'
import configureStore from './app/store/configureStore'
const config = require('./config.js')
window.configruntime = config

console.log("Running App version " + VERSION)

let store = configureStore()

render(<Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)