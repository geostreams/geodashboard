// @flow
import React from 'react'
import BaseTests from 'gd-core/src/tests/BaseTests'

import About from '../components/About'

const tests = [
    { path: 'about', name: 'About', component: About }
]

const Tests = () => (
    <BaseTests components={tests} />
)

export default Tests
