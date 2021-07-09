// @flow
import coreRoutes from '@geostreams/core/src/routes';

import Home from './containers/Home';
import Explore from './containers/Explore';
import Search from './containers/Search';
import SensorDetail from './containers/Sensor/Detail';
import Trends from './containers/Trends';
import TrendDetail from './containers/Trends/Detail';
import Tests from './tests/Tests';

const routes = Object.assign(
    coreRoutes,
    {
        '/': { component: Home, exact: true },
        '/:parent(explore|search|analysis)/detail/location/:name/:category': { component: SensorDetail },
        '/explore/:stations': { component: Explore, exact: true },
        '/search': { component: Search, exact: true },
        '/trends/:category(stations|regions)': { component: Trends, exact: true },
        '/trends/regions/:region/:parameter/:season': { component: TrendDetail, exact: true }
    }
);

if (process.env.NODE_ENV === 'development') {
    routes['/tests/geostreaming'] = { component: Tests };
}

export default routes;
