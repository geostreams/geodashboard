// @flow
import coreRoutes from 'gd-core/src/routes'

import About from './components/About'
import Tests from './tests/Tests'

const routes = Object.assign(
    coreRoutes,
    {
        '/about': { component: About }
    }
)

if (process.env.NODE_ENV === 'development') {
    routes['/tests/template'] = { component: Tests }
}

export default routes
