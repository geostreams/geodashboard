// @flow
import SensorDetail from 'gd-geostreaming/src/containers/Sensor/Detail';

// $FlowFixMe
import __old_Home from 'gd-glm__old/app/pages/Home';
// $FlowFixMe
import __old_About from 'gd-glm__old/app/pages/About';
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

const routes = {
    '/': { exact: true, component: __old_Home },
    '/about': { component: __old_About },
    '/explore/:stations': { component: __old_Explore, exact: true },
    '/:parent(explore|trendsstations)/detail/location/:name/:category': { component: SensorDetail },
    '/search': { component: __old_Search },
    '/trendsstations': { component: __old_TrendsStation, exact: true },
    '/trendsregions': { component: __old_TrendsRegion },
    '/trendsdetail/region/:region/:parameter/:season': { component: __old_TrendsDetail },
    '/analysis': { component: __old_Analysis }
};

export default routes;
