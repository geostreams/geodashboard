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

console.log("Running App version " + VERSION)

const logger = createLogger()
let store = createStore(geodashboardApp, applyMiddleware(thunk, promise, logger))

render(<Provider store={store}>
		     <App />
       </Provider>, 
       document.getElementById('root')
)