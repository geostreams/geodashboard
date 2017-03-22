import React from 'react'
import {render} from 'react-dom'
import App from './containers/App'
import { Provider } from 'react-redux'
import './styles/main.css'
import configureStore from './store/configureStore'

console.log("Running App version " + VERSION)

let store = configureStore()

render(<Provider store={store}>
		     <App />
       </Provider>, 
       document.getElementById('root')
)