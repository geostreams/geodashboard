// @flow
import geostreamingReducers from 'gd-geostreaming/src/reducers';

// $FlowFixMe
import __old_reducers from 'gd-gltg__old/app/reducers';

export default {
    ...__old_reducers,
    ...geostreamingReducers
};
