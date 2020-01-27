// @flow
import React from 'react'
import { Legend } from '../../../components/d3'

const INITIAL_VALUE = 20

const TestLegend = () => {
    const [value, updateValue] = React.useState(INITIAL_VALUE)
    return (
        <div style={{ margin: 50 }}>
            <label htmlFor="input">
                Value:
                &nbsp;
                <input
                    type="number"
                    value={value}
                    onChange={(e) => { updateValue(e.target.value) }}
                />
            </label>

            <div style={{ margin: 50 }}>
                <Legend
                    domain={[0, 30]}
                    clamp
                    ticks={5}
                    tickFormat={(d) => {
                        if (d === 25) {
                            return '> 25'
                        }
                        if (d > 25) {
                            return ''
                        }
                        return d
                    }}
                    indicator={{
                        value,
                        stroke: '#E05769',
                        width: 2
                    }}
                />
            </div>
        </div>
    )
}

export default TestLegend
