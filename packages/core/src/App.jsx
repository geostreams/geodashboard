// @flow
import * as React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import defaultTheme from './theme';
import { entries } from './utils/array';

type Props = {
    routes: { [key: string]: Function };
    theme: Object
}

const App = ({ routes, theme = defaultTheme }: Props) => (
    <ThemeProvider theme={theme}>
        {entries(routes).map(([path, props]) => (
            <Route key={path} path={path} {...props} />
        ))}
    </ThemeProvider>
);

export default App;
