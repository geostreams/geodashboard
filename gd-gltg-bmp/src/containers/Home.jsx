// @flow
import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { Map } from 'gd-core/src/components/ol';

import type {
    Feature as FeatureType,
    Layer as LayerType,
    MapBrowserEventType
} from 'ol';

import { BOUNDARIES, INITIAL_FILTERS, LAYERS, MAP_BOUNDS, getStyle } from '../config';
import Sidebar from './Sidebar';

import type { Filters, FiltersAction } from '../utils/flowtype';
import { FiltersContext } from './Context';

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

const Home = () => {
    const classes = useStyle();

    const [filters, dispatchFilterUpdate] = React.useReducer(filtersReducer, INITIAL_FILTERS);

    const filtersRef = React.useRef<{ previous: Filters, current: Filters }>({
        previous: filters,
        current: filters
    });

    React.useEffect(() => {
        const previous = filtersRef.current.current;

        if (previous.boundaryType !== filters.boundaryType) {
            // Switch layers
            const oldLayer = LAYERS[previous.boundaryType];
            oldLayer.setVisible(false);
            oldLayer.setStyle((feature) => getStyle(
                BOUNDARIES[filters.boundaryType].options,
                feature,
                BOUNDARIES[filters.boundaryType].layer.featureIdKey,
                false
            ));
            LAYERS[filters.boundaryType].setVisible(true);
        }

        if (previous.selectedBoundaries !== filters.selectedBoundaries) {
            // Update styling of toggled boundaries
            LAYERS[filters.boundaryType].setStyle((feature) => getStyle(
                BOUNDARIES[filters.boundaryType].options,
                feature,
                BOUNDARIES[filters.boundaryType].layer.featureIdKey,
                filters.selectedBoundaries.includes(feature.get(BOUNDARIES[filters.boundaryType].layer.featureIdKey))
            ));
        }

        filtersRef.current = {
            previous,
            current: filters
        };
    }, [filters]);

    const handleMapClick = React.useCallback((e: MapBrowserEventType) => {
        const currentFilters = filtersRef.current.current;
        const boundaryProps = BOUNDARIES[currentFilters.boundaryType];

        const clickedObject: [FeatureType, LayerType] | null = e.map.forEachFeatureAtPixel(
            e.pixel,
            (feature, layer) => layer.get('interactive') && boundaryProps.options.includes(feature.get(boundaryProps.layer.featureIdKey)) ?
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
                boundaryProps.options,
                feature,
                boundaryProps.layer.featureIdKey,
                selectedBoundaries.includes(feature.get(boundaryProps.layer.featureIdKey))
            ));

            dispatchFilterUpdate({
                type: 'selectedBoundaries',
                value: (
                    selectedBoundaries.length === 0 ||
                    selectedBoundaries.length === BOUNDARIES[currentFilters.boundaryType].options.length - 1
                ) ?
                    [] :
                    selectedBoundaries
            });
        }
    }, [filtersRef]);

    return (
        <FiltersContext.Provider
            value={{
                dispatch: dispatchFilterUpdate,
                filters
            }}
        >
            <Map
                className="fillContainer"
                zoom={7}
                minZoom={5}
                extent={MAP_BOUNDS}
                center={[-9972968, 4972295]}
                layers={Object.values(LAYERS)}
                layerSwitcherOptions={{}}
                events={{
                    click: handleMapClick
                }}
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
                        xs={8}
                    />
                    <Grid
                        className={classes.sidebar}
                        item
                        xs={4}
                    >
                        <Sidebar />
                    </Grid>
                </Grid>
            </Map>
        </FiltersContext.Provider>
    );
};

export default Home;
