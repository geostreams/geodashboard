// @flow
import React from 'react';

import { INITIAL_FILTERS } from '../config';

import type { BMPContextType } from '../utils/flowtype';

export const BMPContext = React.createContext<BMPContextType>({
    config: {},
    activeView: 'filter',
    // eslint-disable-next-line no-unused-vars
    updateActiveView: (activeView) => {},
    filters: INITIAL_FILTERS,
    // eslint-disable-next-line no-unused-vars
    dispatchFilterUpdate: (action) => {},
    results: null,
    // eslint-disable-next-line no-unused-vars
    updateResults: (results) => {}
});
