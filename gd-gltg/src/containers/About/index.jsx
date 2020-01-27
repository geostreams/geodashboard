// @flow
import React from 'react'
import { withRouter } from 'react-router-dom'

type Props = {
    location: {
        pathname: string
    }
}

const About = ({ location }: Props) => <div>{location.pathname}</div>

export default withRouter(About)
