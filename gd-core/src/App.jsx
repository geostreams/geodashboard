// @flow
import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

type Props = {
    routes: { [key: string]: Function };
    pathname: string;
}

const App = ({ routes }: Props) => {
    // TODO remove this after porting all the __old code. This is a hack to disable and enable view specific stylesheets so the old and new styles do not conflict with each other.
    for (let i = 0; i < document.styleSheets.length; i += 1) {
        const styleSheet = document.styleSheets[i]
        styleSheet.disabled =
            (
                !window.location.pathname.startsWith('/geostreaming/') ||
                window.location.pathname.startsWith('/geostreaming/__new')
            ) &&
            (!!styleSheet.href && styleSheet.href.indexOf('main') > -1)
    }
    return Object
        .entries(routes)
        .map(([path, props]) => (
            <Route key={path} path={path} {...props} />
        ))
}

const mapStateToProps = (state) => ({
    pathname: state.router.location.pathname
})

export default connect(mapStateToProps)(App)
