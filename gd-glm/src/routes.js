import hocs from 'gd-core/src/utils/hocs';
// @flow
import SensorDetail from 'gd-geostreaming/src/containers/Sensor/Detail';

// $FlowFixMe
import __old_Explore from 'gd-glm__old/app/pages/Explore';
// $FlowFixMe
import __old_Search from 'gd-glm__old/app/pages/Search';
// $FlowFixMe
import __old_TrendsStation from 'gd-glm__old/app/pages/TrendsSensor';
// $FlowFixMe
import __old_TrendsRegion from 'gd-glm__old/app/pages/TrendsRegion';
// $FlowFixMe
import __old_TrendsDetail from 'gd-glm__old/app/pages/TrendsDetail';
// $FlowFixMe
import __old_Analysis from 'gd-glm__old/app/pages/Analysis';
import GLMLayout from './containers/Layout';
import About from './containers/About';
import Home from './containers/Home';

const routes = {
    '/': { exact: true, component: hocs.withLayout(GLMLayout, Home, { hasFooter: true }) },
    '/about': { exact: true, component: hocs.withLayout(GLMLayout, About, { hasFooter: true }) },
    '/explore/:stations': { component: hocs.withLayout(GLMLayout,__old_Explore), exact: true },
    '/:parent(explore|trendsstations)/detail/location/:name/:category': { component: hocs.withLayout(GLMLayout,SensorDetail) },
    '/search': { component: hocs.withLayout(GLMLayout,__old_Search) },
    '/trendsstations': { component: hocs.withLayout(GLMLayout,__old_TrendsStation), exact: true },
    '/trendsregions': { component: hocs.withLayout(GLMLayout,__old_TrendsRegion) },
    '/trendsdetail/region/:region/:parameter/:season': { component: hocs.withLayout(GLMLayout,__old_TrendsDetail) },
    '/analysis': { component: hocs.withLayout(GLMLayout,__old_Analysis) }
};

export default routes;
