import React from 'react'
import {render} from 'react-dom'
import App from './App'
import { Provider } from 'react-redux'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise'
import createLogger from 'redux-logger'
import geodashboardApp from './reducers'
import './main.css'
import configureStore from './store/configureStore';

console.log("Running App version " + VERSION)

let store = configureStore()

render(<Provider store={store}>
		     <App />
       </Provider>, 
       document.getElementById('root')
)