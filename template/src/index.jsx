// @flow
import render from '@geostreams/core/src/render';

// $FlowFixMe
import { addEndpoints, fetchSensors as __old_fetchSensors } from '@geostreams/core__old/app/actions';
import { updateGeoStreamingConfig } from '@geostreams/geostreaming/src/actions/config';
import { fetchParameters } from '@geostreams/geostreaming/src/actions/parameters';
import { fetchSensors } from '@geostreams/geostreaming/src/actions/sensors';
import routes from './routes';
import reducers from './reducers';

import config from './config';

const old_config = require('./old_config');

window.configruntime = old_config;

export default render(
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