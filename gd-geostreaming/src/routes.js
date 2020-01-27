// @flow
import coreRoutes from 'gd-core/src/routes'
import hocs from 'gd-core/src/utils/hocs'

import GeostreamingLayout from './containers/Layout'
import Home from './containers/Home'
import Explore from './containers/Explore'
import Search from './containers/Search'
import Tests from './tests/Tests'

const routes = Object.assign(
    coreRoutes,
    {
        '/': { component: hocs.withLayout(GeostreamingLayout, Home, { hasFooter: true }), exact: true },
        '/explore': { component: hocs.withLayout(GeostreamingLayout, Explore) },
        '/search': { component: hocs.withLayout(GeostreamingLayout, Search) }
    }
)

if (process.env.NODE_ENV === 'development') {
    routes['/tests/geostreaming'] = { component: Tests }
}

export default routes
