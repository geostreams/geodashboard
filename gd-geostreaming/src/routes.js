// @flow
import coreRoutes from 'gd-core/src/routes';

import Home from './containers/Home';
import Explore from './containers/Explore';
import Search from './containers/Search';
import SensorDetail from './containers/Sensor/Detail';
import Tests from './tests/Tests';

const routes = Object.assign(
    coreRoutes,
    {
        '/': { component: Home, exact: true },
        '/:parent(explore|search|analysis)/detail/location/:name/:category': { component: SensorDetail },
        '/explore/:stations': { component: Explore, exact: true },
        '/search': { component: Search, exact: true }
    }
);

if (process.env.NODE_ENV === 'development') {
    routes['/tests/geostreaming'] = { component: Tests };
}

export default routes;
