// @flow
import * as React from 'react';
import { Route } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';

import theme from './theme';
import { entries } from './utils/array';

type Props = {
    routes: { [key: string]: Function };
}

const App = ({ routes }: Props) => (
    <ThemeProvider theme={theme}>
        {entries(routes).map(([path, props]) => (
            <Route key={path} path={`${process.env.CONTEXT || ''}${path}`} {...props} />
        ))}
    </ThemeProvider>
);

export default App;
