// @flow
import * as React from 'react';
import {
    interpolatePuBu,
    rgb,
    scaleLinear,
    scaleSequential
} from 'd3';
import { Fill, Icon, Stroke, Style } from 'ol/style';

import type FeatureType from 'ol/Feature';

import huc8 from '../../data/huc8.geojson';
import watersheds from '../../data/watersheds.geojson';
import drainage from '../../data/il-drainage.geojson';
import monitoringSites from '../../data/il-monitoring-sites.geojson';
import markerMonitoringSite from '../../images/marker_monitoring_site.png';
import data from '../../data/data.json';

export const ACTION_BAR_HEIGHT = 105;

export const LEGEND_DOMAIN = [0, 30];

export const getFeatureStyle = (
    feature: FeatureType,
    resolution: ?number,
    nutrient: string,
    year: number,
    isSelected: boolean = false
) => {
    const strokeOptions = isSelected ?
        {
            color: 'red',
            width: 4
        } :
        {
            color: [0, 0, 0, 1],
            width: 1
        };

    const name = feature.get('Name') || feature.get('Station_ID');

    const nitrogenLevel = name ?
        parseFloat(data[nutrient][name][year]) || 0.0 :
        0;

    const colorScale = scaleSequential(interpolatePuBu).domain(LEGEND_DOMAIN);
    const scale = scaleLinear();
    const colorLevel = rgb(colorScale(scale(nitrogenLevel)));
    const { r, g, b, a } = colorLevel;

    return (
        new Style({
            fill: new Fill({
                color: [r, g, b, a]
            }),
            stroke: new Stroke(strokeOptions),
            zIndex: isSelected ? 2 : 1
        })
    );
};

export type BoundaryType = {
    [key: string]: {
        visible: boolean,
        label: string,
        layers: Array<{
            url: string,
            style: Function
        }>
    }
}

export const BOUNDARIES: BoundaryType = {
    drainage: {
        visible: true,
        label: 'IL Drainage',
        layers: [
            {
                url: drainage,
                style: getFeatureStyle
            },
            {
                url: monitoringSites,
                style: () => new Style({
                    image: new Icon(({
                        src: markerMonitoringSite
                    }))
                })
            }
        ]
    },
    huc8: {
        visible: false,
        label: 'HUC-8',
        layers: [
            {
                url: huc8,
                style: getFeatureStyle
            }
        ]
    },
    watershed: {
        visible: false,
        label: 'Watersheds',
        layers: [
            {
                url: watersheds,
                style: getFeatureStyle
            }
        ]
    }
};

export const YEARS = Array(38).fill(2017).map<number>((i, idx) => i - idx);

export const VARIABLES_INFO = {
    boundary: {
        title: 'Boundary Type',
        description: (
            <div>
                <b>IL Drainage</b>
                <p>
                    This view represents the land area that drains through
                    each of the measurement points represented on the map as
                    circles with a monitoring buoy. These stations were chosen
                    as part of the Illinois Nutrient Loss Reduction Strategy
                    because they measure the runoff from about 75% of the land
                    area of the state of Illinois.
                </p>
                <b>HUC 8</b>
                <p>HUCs, or Hydrologic Unit Codes are standardized boundaries
                    that basically represent watersheds of different sizes,
                    and are often used in water quality tracking. HUC-8 is a
                    medium-sized watershed, and there are 31 such HUCs in
                    the state of Illinois.
                    The Illinois Nutrient Reduction Strategy has used modeling
                    to estimate the nutrient yield from all of the HUC-8s
                    in the State of Illinois.
                </p>
                <b>Watershed Boundaries</b>
                <p>This view highlights the watershed or the land area that
                    drains through the point represented on the map as a pin.
                    These locations are designated as “sentinel sites” because
                    tracking water quality trends at these locations can be
                    used to track progress in reducing nutrient loads from
                    the watersheds above them. Many of these particular sites
                    were selected because they are mostly contained within
                    a single state, and thus can be used to track that
                    state’s nutrient reduction progress.
                </p>
                <b>Load to Gulf</b>
                <p>This site, the Mississippi River at St. Francisville
                    is used to measure the total load of nutrients that
                    are delivered to the Gulf of Mexico in a given water
                    year (12 Months beginning October 1). This site is used
                    because it is just upstream from the Gulf, and yet does
                    not behave like an estuary. Because some Mississippi River
                    water is diverted to the Atchafalya River, appropriate
                    corrections are made to report total load.
                </p>
            </div>
        )
    },
    nutrient: {
        title: 'Nutrient Type',
        description: (
            <div>
                <p>
                    Nitrogen and Phosphorus are the two main nutrients that cause
                    the algal blooms that lead to hypoxia in the Gulf of Mexico.
                </p>
                <p>
                    Nitrogen – the main source of nitrogen is runoff from
                    agriculture, though there are other sources as well such
                    as urban areas and industry.
                </p>
                <p>
                    Phosphorus – the main source of phosphorus is wastewater
                    treatment, though there are other sources as well such
                    as erosion.
                </p>
            </div>
        )
    }
};
