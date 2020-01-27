// @flow

// High Order Components

import * as React from 'react'
import type { ContextRouter } from './flowtype'

const withLayout = (
    Layout: Function | React.AbstractComponent<{}>,
    Component: Function | React.AbstractComponent<{}>,
    layoutProps: {} = {}
) => (
    (routeProps: ContextRouter) => (
        <Layout {...layoutProps}>
            <Component {...routeProps} />
        </Layout>
    )
)

export default {
    withLayout
}
