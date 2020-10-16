// @flow
import render from 'gd-core/src/render';

// $FlowFixMe
import { addEndpoints, fetchSensors as __old_fetchSensors } from 'gd-core__old/app/actions';
import { updateGeoStreamingConfig } from 'gd-geostreaming/src/actions/config';
import { fetchParameters } from 'gd-geostreaming/src/actions/parameters';
import { fetchSensors } from 'gd-geostreaming/src/actions/sensors';
import routes from './routes';
import reducers from './reducers';

import config from './config';


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