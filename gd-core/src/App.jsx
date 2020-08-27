// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';

type Props = {
    routes: { [key: string]: Function };
    pathname: string;
}

const App = ({ routes }: Props) => Object
    .entries(routes)
    .map(([path, props]) => (
        <Route key={path} path={path} {...props} />
    ));

const mapStateToProps = (state) => ({
    pathname: state.router.location.pathname
});

export default connect(mapStateToProps)(App);
