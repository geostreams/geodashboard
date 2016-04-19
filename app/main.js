import React from 'react';
import {render} from 'react-dom';
import App from './App';

import './main.css';

console.log("Running App version " + VERSION);

render(<App />, document.getElementById('root'));