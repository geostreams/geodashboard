// @flow
import coreRoutes from 'gd-core/src/routes';
import hocs from 'gd-core/src/utils/hocs';
import GeoStreamingExplore from 'gd-geostreaming/src/containers/Explore';
import GeoStreamingHome from 'gd-geostreaming/src/containers/Home';
import GeoStreamingSearch from 'gd-geostreaming/src/containers/Search';

// $FlowFixMe
import __old_Explore from 'gd-gltg__old/app/pages/Explore';
// $FlowFixMe
import __old_Detail from 'gd-gltg__old/app/pages/Detail';
// $FlowFixMe
import __old_Search from 'gd-gltg__old/app/pages/Search';
// $FlowFixMe
import __old_TrendsStation from 'gd-gltg__old/app/pages/TrendsSensor';
// $FlowFixMe
import __old_TrendsRegion from 'gd-gltg__old/app/pages/TrendsRegion';
// $FlowFixMe
import __old_TrendsDetail from 'gd-gltg__old/app/pages/TrendsDetail';
// $FlowFixMe
import __old_Analysis from 'gd-gltg__old/app/pages/Analysis';
// $FlowFixMe
import __old_Glossary from 'gd-gltg__old/app/pages/Glossary';
// $FlowFixMe
import __old_Help from 'gd-gltg__old/app/pages/Help';

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
        '/geostreaming/__new_explore': { component: hocs.withLayout(GLTGLayout, GeoStreamingExplore) },
        '/geostreaming/__new_search': { component: hocs.withLayout(GLTGLayout, GeoStreamingSearch) },
        // Routes pointing to the __old code
        '/geostreaming/explore/:stations': { component: hocs.withLayout(GLTGLayout, __old_Explore) },
        '/geostreaming/detail/location/:name/:category': { component: hocs.withLayout(GLTGLayout, __old_Detail) },
        '/geostreaming/search': { component: hocs.withLayout(GLTGLayout, __old_Search) },
        '/geostreaming/trendsstations': { component: hocs.withLayout(GLTGLayout, __old_TrendsStation) },
        '/geostreaming/trendsregions': { component: hocs.withLayout(GLTGLayout, __old_TrendsRegion) },
        '/geostreaming/trendsdetail/region/:region/:parameter/:season': { component: hocs.withLayout(GLTGLayout, __old_TrendsDetail) },
        '/geostreaming/analysis': { component: hocs.withLayout(GLTGLayout, __old_Analysis) },
        '/partners': { component: hocs.withLayout(GLTGLayout, Partners) },
        '/glossary': { component: hocs.withLayout(GLTGLayout, __old_Glossary) },
        '/help': { component: hocs.withLayout(GLTGLayout, __old_Help) },
        '/faq': { component: hocs.withLayout(GLTGLayout, FAQ) }
    }
);

if (process.env.NODE_ENV === 'development') {
    routes['/tests/gltg'] = { component: Tests };
}

export default routes;
