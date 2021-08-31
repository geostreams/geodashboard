// @flow
import hocs from '@geostreams/core/src/utils/hocs';
import Routes from '@geostreams/core/src/routes';
import ExplorePage from '@geostreams/geostreaming/src/containers/Explore';
import SearchPage from '@geostreams/geostreaming/src/containers/Search';
import SensorDetail from '@geostreams/geostreaming/src/containers/Sensor/Detail';

import Layout from './containers/Layout';
import Home from './containers/Home';
import About from './containers/About';
import Tests from './tests/Tests';

// $FlowFixMe
const routes = Object.assign(Routes, {
    '/': {
        component: hocs.withLayout(Layout, Home, { hasFooter: true }),
        exact: true
    },
    '/about': { component: hocs.withLayout(Layout, About), exact: true },
    '/:parent(explore|search)/detail/location/:name/:category': {
        component: hocs.withLayout(Layout, SensorDetail)
    },
    '/search': {
        component: hocs.withLayout(Layout, SearchPage),
        exact: true
    },
    '/explore/:stations': {
        component: hocs.withLayout(Layout, ExplorePage),
        exact: true
    }
});

if (process.env.NODE_ENV === 'development') {
    routes['/tests'] = { component: Tests };
}

export default routes;
