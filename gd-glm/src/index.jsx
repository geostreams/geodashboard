// @flow

/* eslint-disable */
// $FlowFixMe
const __old_config = require('gd-glm__old/config')
window.configruntime = __old_config

// $FlowFixMe
import { addEndpoints, fetchSensors as __old_fetchSensors } from 'gd-core__old/app/actions'

import render from 'gd-core/src/render';
import { updateGeoStreamingConfig } from 'gd-geostreaming/src/actions/config';
import { fetchParameters } from 'gd-geostreaming/src/actions/parameters';
import { fetchSensors } from 'gd-geostreaming/src/actions/sensors';

// $FlowFixMe
import 'gd-glm__old/app/styles/mainStyle.css';
// $FlowFixMe
import 'gd-glm__old/app/styles_custom/react-mdc-web.css';
import 'material-components-web/dist/material-components-web.min.css';

import config from './config';
import reducers from './reducers'
import routes from './routes'
/* eslint-enable */

render(
    reducers,
    routes,
    (store) => {
        store.dispatch(updateGeoStreamingConfig(config));
        store.dispatch(addEndpoints());
        store.dispatch(__old_fetchSensors(config.geostreamingEndpoint));
        store.dispatch(fetchParameters());
        store.dispatch(fetchSensors());
    }
);
