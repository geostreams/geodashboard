// @flow

/* eslint-disable */
// $FlowFixMe
const __old_config = require('gd-gltg__old/config')
window.configruntime = __old_config

// $FlowFixMe
import { addEndpoints, fetchSensors } from 'gd-core__old/app/actions'
import 'material-components-web/dist/material-components-web.min.css';
// $FlowFixMe
import 'gd-gltg__old/app/styles_custom/react-mdc-web.css';

import render from 'gd-core/src/render'

import reducers from './reducers'
import routes from './routes'
/* eslint-enable */

render(
    reducers,
    routes,
    (store) => {
        const selected = window.configruntime.gd3.geostreaming_endpoints[0].url;
        store.dispatch(addEndpoints());
        store.dispatch(fetchSensors(selected));
    }
);
