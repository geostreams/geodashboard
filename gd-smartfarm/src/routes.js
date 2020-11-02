// @flow
import hocs from 'gd-core/src/utils/hocs';
import Routes from 'gd-core/src/routes';

import Explore from './containers/Geostreaming/Explore';
import Search from './containers/Geostreaming/Search';
import Layout from './containers/Layout';
import Home from './containers/Home';
import About from './containers/About';
import Tests from './tests/Tests';




const routes = Object.assign(
    Routes,
    {
        '/': { component: hocs.withLayout(Layout, Home), exact: true },
        '/about': { component: hocs.withLayout(Layout, About), exact: true },
        '/explore': { component: hocs.withLayout(Layout, Explore), exact: true },
        '/search': { component: hocs.withLayout(Layout, Search), exact: true }
    }
);

if (process.env.NODE_ENV === 'development') {
    routes['/tests'] = { component: Tests };
};

export default routes;