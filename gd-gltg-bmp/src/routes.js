// @flow
import hocs from 'gd-core/src/utils/hocs';

import type { Routes } from 'gd-core/src/routes';

import Layout from './containers/Layout';
import Home from './containers/Home';
import Tests from './tests/Tests';

const routes: Routes = {
    '/': { component: hocs.withLayout(Layout, Home), exact: true }
};

if (process.env.NODE_ENV === 'development') {
    routes['/tests'] = { component: Tests };
}

export default routes;
