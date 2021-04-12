// @flow
import render from '@geostreams/core/src/render';

import { updateGeoStreamingConfig } from './actions/config';
import { fetchParameters } from './actions/parameters';
import { fetchSensors } from './actions/sensors';
import config from './config';
import reducers from './reducers';
import routes from './routes';

render(
    reducers,
    routes,
    (store) => {
        store.dispatch(updateGeoStreamingConfig(config));
        store.dispatch(fetchParameters());
        store.dispatch(fetchSensors());
    }
);
