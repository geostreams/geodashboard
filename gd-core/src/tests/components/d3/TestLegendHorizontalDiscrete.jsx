// @flow
import React from 'react';
import { scaleOrdinal, schemeCategory10 } from 'd3';

import { LegendHorizontalDiscrete } from '../../../components/d3';

const color = scaleOrdinal(schemeCategory10);

const TestLegendHorizontalDiscrete = () => (
    <div style={{ margin: 50 }}>
        <LegendHorizontalDiscrete
            boxCount={5}
            getBoxInfo={(idx) => ({ label: `Box ${idx + 1}`, color: color(idx) })}
            activeBox={2}
            activeBoxLabel="Active"
            activeBoxLabelHeight={15}
        />
    </div>
);

export default TestLegendHorizontalDiscrete;
