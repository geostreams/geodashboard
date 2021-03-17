// @flow
import coreRoutes from 'gd-core/src/routes';
import hocs from 'gd-core/src/utils/hocs';
import GeoStreamingExplore from 'gd-geostreaming/src/containers/Explore';
import GeoStreamingHome from 'gd-geostreaming/src/containers/Home';
import GeoStreamingSearch from 'gd-geostreaming/src/containers/Search';
import GeoStreamingSensorDetail from 'gd-geostreaming/src/containers/Sensor/Detail';

// $FlowFixMe
import __old_Explore from 'gd-gltg__old/app/pages/Explore';
// $FlowFixMe
import __old_Search from 'gd-gltg__old/app/pages/Search';
// $FlowFixMe
import __old_Analysis from 'gd-gltg__old/app/pages/Analysis';

import About from './containers/About';
import DataStories from './containers/DataStories';
import FAQ from './containers/FAQ';
import Home from './containers/Home';
import Partners from './containers/Partners';
import GLTGLayout from './containers/Layout';
import Tests from './tests/Tests';

const routes = Object.assign(
    coreRoutes,
    {
        '/': { exact: true, component: hocs.withLayout(GLTGLayout, Home, { hasFooter: true }) },
        '/data-stories': { component: hocs.withLayout(GLTGLayout, DataStories) },
        '/about': { component: hocs.withLayout(GLTGLayout, About) },
        '/geostreaming': { exact: true, component: hocs.withLayout(GLTGLayout, GeoStreamingHome, { hasFooter: true }) },
        '/:parent(explore|search|analysis)/detail/location/:name/:category': { component: hocs.withLayout(GLTGLayout, GeoStreamingSensorDetail) },
        '/partners': { component: hocs.withLayout(GLTGLayout, Partners) },
        '/faq': { component: hocs.withLayout(GLTGLayout, FAQ) },
        // Routes pointing to the __old code
        '/explore/:stations': { component: hocs.withLayout(GLTGLayout, __old_Explore), exact: true },
        '/search': { component: hocs.withLayout(GLTGLayout, __old_Search), exact: true },
        '/analysis': { component: hocs.withLayout(GLTGLayout, __old_Analysis), exact: true }
    }
);

if (process.env.NODE_ENV === 'development') {
    routes['/__new_explore'] = { component: hocs.withLayout(GLTGLayout, GeoStreamingExplore) };
    routes['/__new_search'] = { component: hocs.withLayout(GLTGLayout, GeoStreamingSearch) };
    routes['/tests/gltg'] = { component: Tests };
}

export default routes;
