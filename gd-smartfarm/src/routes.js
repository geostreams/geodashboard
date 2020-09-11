// @flow
import Routes from 'gd-core/src/routes';

import About from './components/About';
import Tests from './tests/Tests';

const routes = Object.assign(
    Routes,
    {
        '/': { component: About }
    }
);

if (process.env.NODE_ENV === 'development') {
    routes['/tests'] = { component: Tests };
};

export default routes;
