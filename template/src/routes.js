// @flow
import hocs from '@geostreams/core/src/utils/hocs';
import Routes from '@geostreams/core/src/routes';

import SensorDetail from '@geostreams/geostreaming/src/containers/Sensor/Detail';
// $FlowFixMe
import __old_Explore from '@geostreams/core__old/app/pages/Explore';
// $FlowFixMe
import __old_Search from '@geostreams/core__old/app/pages/Search';

import Layout from './containers/Layout';
import Home from './containers/Home';
import About from './containers/About';
import Tests from './tests/Tests';


const routes = Object.assign(
    Routes,
    {
        '/': { component: hocs.withLayout(Layout, Home, { hasFooter: true }), exact: true },
        '/about': { component: hocs.withLayout(Layout, About), exact: true },
        '/:parent(explore|search)/detail/location/:name/:category': { component: hocs.withLayout(Layout, SensorDetail) },
        '/search': { component: hocs.withLayout(Layout, __old_Search), exact: true },
        '/explore/:stations': { component: hocs.withLayout(Layout, __old_Explore), exact: true }
    }
);

if (process.env.NODE_ENV === 'development') {
    routes['/tests'] = { component: Tests };
};

export default routes;