// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Grid, makeStyles } from '@material-ui/core';
import { Map } from 'gd-core/src/components/ol';
import { updateLoadingStatus } from 'gd-core/src/actions/page';
import logger from 'gd-core/src/utils/logger';

import type {
    Feature as FeatureType,
    Layer as LayerType,
    MapBrowserEventType
} from 'ol';
import type { Action as PageAction } from 'gd-core/src/actions/page';

import { BMP_API_URL, BOUNDARIES, INITIAL_FILTERS, LAYERS, MAP_CENTER, getStyle } from '../config';
import { BMPContext } from './Context';
import Sidebar from './Sidebar';

import type { Config, Filters, FiltersAction } from '../utils/flowtype';

const useStyle = makeStyles({
    mainContainer: {
        position: 'absolute',
        height: '100%'
    },
    sidebar: {
        'height': '100%',
        'overflowY': 'auto',
        '& a': {
            color: '#0D73C5'
        }
    }
});

const filtersReducer = (state: Filters = INITIAL_FILTERS, action: FiltersAction) => {
    switch (action.type) {
        case 'years':
            return {
                ...state,
                years: action.value
            };
        case 'boundaryType':
            return {
                ...state,
                boundaryType: action.value,
                selectedBoundaries: []
            };
        case 'selectedBoundaries':
            return {
                ...state,
                selectedBoundaries: action.value
            };
        default:
            return state;
    }
};

type Props = {
    dispatch: (pageAction: PageAction) => void;
};

const Home = ({ dispatch }: Props) => {
    const classes = useStyle();

    const [activeView, updateActiveView] = React.useState<'filter' | 'results'>('filter');

    const activeViewRef = React.useRef<string>(activeView);

    const [results, updateResults] = React.useState({});

    const [filters, dispatchFilterUpdate] = React.useReducer<Filters, FiltersAction>(filtersReducer, INITIAL_FILTERS);

    const filtersRef = React.useRef<{ previous: Filters, current: Filters }>({
        previous: filters,
        current: filters
    });

    const [config, updateConfig] = React.useState<Config>({});
    const configRef = React.useRef<Config | null>(null);
    const hasConfig = Object.keys(config).length > 0;

    React.useEffect(
        () => {
            dispatch(updateLoadingStatus(true));
            Promise
                .all([
                    fetch(`${BMP_API_URL}/assumptions?limit=-1`).then((response) => response.json()),
                    fetch(`${BMP_API_URL}/states?limit=-1`).then((response) => response.json()),
                    fetch(`${BMP_API_URL}/huc8?limit=-1`).then((response) => response.json())
                ])
                .then(([assumptionsResponse, statesResponse, huc8Response]) => {
                    const configObj = {
                        assumptions: assumptionsResponse.results,
                        state: statesResponse.results,
                        huc_8: huc8Response.results
                    };
                    const boundaryOptions = configObj[filters.boundaryType].map(
                        (attrs) => attrs[BOUNDARIES[filters.boundaryType].idKey]
                    );
                    const activeLayer = LAYERS[filtersRef.current.current.boundaryType];
                    activeLayer.setStyle((feature) => getStyle(
                        boundaryOptions,
                        feature,
                        BOUNDARIES[filters.boundaryType].layer.featureIdKey,
                        false
                    ));
                    configRef.current = configObj;
                    updateConfig(configObj);
                })
                .catch(logger.error)
                .finally(() => {
                    dispatch(updateLoadingStatus(false));
                });
        },
        []
    );

    React.useEffect(() => {
        if (hasConfig && config[filters.boundaryType]) {
            const previous = filtersRef.current.current;

            const boundaryOptions = config[filters.boundaryType].map(
                (attrs) => attrs[BOUNDARIES[filters.boundaryType].idKey]
            );

            if (previous.boundaryType !== filters.boundaryType) {
                // Switch layers
                const oldLayer = LAYERS[previous.boundaryType];
                oldLayer.setVisible(false);
                oldLayer.setStyle((feature) => getStyle(
                    boundaryOptions,
                    feature,
                    BOUNDARIES[filters.boundaryType].layer.featureIdKey,
                    false
                ));
                LAYERS[filters.boundaryType].setVisible(true);
            }

            if (previous.selectedBoundaries !== filters.selectedBoundaries) {
                // Update styling of toggled boundaries
                LAYERS[filters.boundaryType].setStyle((feature) => getStyle(
                    boundaryOptions,
                    feature,
                    BOUNDARIES[filters.boundaryType].layer.featureIdKey,
                    filters.selectedBoundaries.includes(
                        feature.get(BOUNDARIES[filters.boundaryType].layer.featureIdKey)
                    )
                ));
            }

            filtersRef.current = {
                previous,
                current: filters
            };
        }
    }, [filters]);

    const handleMapClick = React.useCallback((e: MapBrowserEventType) => {
        if (activeViewRef.current === 'filter') {
            const currentConfig = configRef.current;
            const currentFilters = filtersRef.current.current;
            if (currentConfig && currentConfig[currentFilters.boundaryType]) {
                const boundaryProps = BOUNDARIES[currentFilters.boundaryType];
                const boundaryOptions = currentConfig[currentFilters.boundaryType].map(
                    (attrs) => attrs[BOUNDARIES[currentFilters.boundaryType].idKey]
                );

                const clickedObject: [FeatureType, LayerType] | null = e.map.forEachFeatureAtPixel(
                    e.pixel,
                    (feature, layer) => (
                        layer.get('interactive') && boundaryOptions.includes(feature.get(boundaryProps.layer.featureIdKey))
                    ) ?
                        [feature, layer] : null
                );

                if (clickedObject && currentFilters) {
                    const [clickedFeature, clickedLayer] = clickedObject;
                    const boundaryIndex = currentFilters.selectedBoundaries.indexOf(
                        clickedFeature.get(boundaryProps.layer.featureIdKey)
                    );
                    const { selectedBoundaries } = currentFilters;
                    if (boundaryIndex > -1) {
                        // Deselect the feature
                        selectedBoundaries.splice(boundaryIndex, 1);
                    } else {
                        // Select the feature
                        selectedBoundaries.push(clickedFeature.get(boundaryProps.layer.featureIdKey));
                    }

                    clickedLayer.setStyle((feature) => getStyle(
                        boundaryOptions,
                        feature,
                        boundaryProps.layer.featureIdKey,
                        selectedBoundaries.includes(feature.get(boundaryProps.layer.featureIdKey))
                    ));

                    dispatchFilterUpdate({
                        type: 'selectedBoundaries',
                        value: selectedBoundaries
                    });
                }
            }
        }
    }, [filtersRef]);

    return (
        <BMPContext.Provider
            value={{
                config,
                activeView,
                updateActiveView: (view) => {
                    updateActiveView(view);
                    activeViewRef.current = view;
                },
                dispatchFilterUpdate,
                filters,
                results,
                updateResults
            }}
        >
            {hasConfig ?
                <Map
                    className="fillContainer"
                    zoom={5}
                    center={MAP_CENTER}
                    layers={Object.values(LAYERS)}
                    layerSwitcherOptions={{}}
                    events={{ click: handleMapClick }}
                >
                    <Grid
                        className={classes.mainContainer}
                        container
                        alignItems="stretch"
                    >
                        <Grid
                            className="fillContainer"
                            mapcontainer={1}
                            item
                            xs={6}
                        />
                        <Grid
                            className={classes.sidebar}
                            item
                            xs={6}
                        >
                            <Sidebar />
                        </Grid>
                    </Grid>
                </Map> :
                null}
        </BMPContext.Provider>
    );
};

export default connect()(Home);
