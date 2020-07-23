// @flow
import coreRoutes from 'gd-core/src/routes';

import Home from './containers/Home';
import Explore from './containers/Explore';
import Search from './containers/Search';
import Tests from './tests/Tests';

const routes = Object.assign(
    coreRoutes,
    {
        '/': { component: Home, exact: true },
        '/explore': { component: Explore },
        '/search': { component: Search }
    }
);

if (process.env.NODE_ENV === 'development') {
    routes['/tests/geostreaming'] = { component: Tests };
}

export default routes;
