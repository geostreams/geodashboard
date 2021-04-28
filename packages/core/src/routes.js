// @flow
import * as React from 'react';

import Tests from './tests/Tests';

type Routes = {
    [key: string]: {
        exact?: boolean,
        component: Function | React.Node
    }
}

const routes: Routes = {
    '/': { exact: true, component: () => 'Geodashboard Core' }
};

if (process.env.NODE_ENV === 'development') {
    routes['/tests/core'] = { component: Tests };
}

export default routes;
export type { Routes };
