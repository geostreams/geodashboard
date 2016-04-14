import React from 'react';
import {render} from 'react-dom';
import Search from './Search';

import './main.css';

console.log("Running App version " + VERSION);

render(<Search />, document.getElementById('root'));