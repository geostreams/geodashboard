// @flow
import geostreamingReducers from 'gd-geostreaming/src/reducers';

// $FlowFixMe
import __old_reducers from 'gd-glm__old/app/reducers';

export default {
    ...__old_reducers,
    ...geostreamingReducers
};
