import "@babel/polyfill";
import 'isomorphic-fetch';
import React from 'react';
import {render} from 'react-dom';
import LandingApp from './app/components/LandgingApp';
import './app/styles/main.css';
import './app/styles_custom/react-mdc-web.css'

// ref: http://stackoverflow.com/questions/33915826/exclude-module-from-webpack-minification
// https://opensource.ncsa.illinois.edu/bitbucket/projects/GEOD/repos/geodashboard-v3/pull-requests/33/overview
// set sendfile in nginx.conf as off to forbid browser cache config.js

const config = require('./homeconfig.js')

// import {gd3} from './config.js';

window.configruntime = config

console.log("Running App version " + VERSION)


render(
        <LandingApp />,
    document.getElementById('root')
)