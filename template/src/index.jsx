// @flow
import render from '@geostreams/core/src/render';
import { updateGeoStreamingConfig } from '@geostreams/geostreaming/src/actions/config';
import { fetchParameters } from '@geostreams/geostreaming/src/actions/parameters';
import { fetchSensors } from '@geostreams/geostreaming/src/actions/sensors';
import routes from './routes';
import reducers from './reducers';

import config from './config';

// $FlowFixMe
export default (render(reducers, routes, (store) => {
    store.dispatch(updateGeoStreamingConfig(config));
    store.dispatch(fetchParameters());
    store.dispatch(fetchSensors());
}));
