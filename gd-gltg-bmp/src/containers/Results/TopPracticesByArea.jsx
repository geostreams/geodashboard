// @flow
import React from 'react';
import { VegaLite } from 'react-vega';

import type { ElementRect } from 'gd-core/src/utils/flowtype';

import type { Filters, QueryParams } from '../../utils/flowtype';


export const config = {
    label: 'Top 10 Practices by Area Treated',
    prepareParams: (params: QueryParams, boundaryType: ?string) => {
        params.min_area_treated = 0;
        params.group_by.push('practice_name');
        params.aggregates.push('area_treated-sum');
        params.order_by.push('-area_treated-sum');

        if (boundaryType) {
            params.partitions.push(boundaryType);
            params.partition_size = 10;
        } else {
            params.limit = 10;
        }
    },
    chartSpec: {
        data: { name: 'top_practices' },
        mark: 'bar',
        encoding: {
            row: { field: 'state', title: 'State' },
            x: {
                field: 'area_treated-sum',
                title: 'Area treated (acres)',
                type: 'quantitative',
                axis: { format: ',.0d' }
            },
            y: { field: 'practice_name', title: 'Practice', sort: '-x', axis: { labelAngle: -45 } },
            tooltip: [
                { field: 'practice_name', title: 'Practice' },
                { field: 'area_treated-sum', format: ',.01d', title: 'Area treated (acres)' }
            ]
        },
        resolve: { scale: { y: 'independent' } }
    }
};

type Props = {
    filters: Filters;
    /** Sample data
     * [
     *   { "area_treated-sum": 3836527.857415735, "practice_name": "Nutrient Management" },
     *   { "area_treated-sum": 3424178.399999997, "practice_name": "Split nitrogen applications 50% after crop/pasture" },
     *   { "area_treated-sum": 2972841.992731241, "practice_name": "Cover Crop" },
     *   { "area_treated-sum": 2733420.000000001, "practice_name": "Nitrification inhibitors or urease inhibitors" },
     *   { "area_treated-sum": 2156112.1000000006, "practice_name": "Apply nutrients no more than 30 days prior to plan" },
     *   { "area_treated-sum": 1591874.1002585427, "practice_name": "Pest Management" },
     *   { "area_treated-sum": 826229.317664661, "practice_name": "Irrigation Water Management" },
     *   { "area_treated-sum": 710908.4000000001, "practice_name": "Apply enhanced efficiency fertilizer products" },
     *   { "area_treated-sum": 708612.8, "practice_name": "Apply phosphorus fertilizer below soil surface" },
     *   { "area_treated-sum": 664986.6988505269, "practice_name": "Prescribed Grazing" }
     * ]
     */
    data: Array<{
        'area_treated-sum': number;
        'practice_name': number;
        // Each item has only one of the following boundary types:
        'state'?: string;
        'huc_8'?: string;
    }>;
    containerRect: ElementRect;
};

const TopPracticesByArea = (props: Props) => {
    const { containerRect, filters } = props;

    if (filters.selectedBoundaries.length) {
        if (filters.boundaryType === 'state') {
            config.chartSpec.encoding.row.field = 'state';
            config.chartSpec.encoding.row.title = 'State';
        } else if (filters.boundaryType === 'huc_8') {
            config.chartSpec.encoding.row.field = 'huc_8';
            config.chartSpec.encoding.row.title = 'HUC8';
        }
    } else {
        config.chartSpec.encoding.row = { field: '', title: '' };
    }

    return (
        <VegaLite
            width={(containerRect.width || 0) * 0.6}
            height={(containerRect.height || 0) * 0.6}
            actions={{
                export: true,
                source: process.env.NODE_ENV === 'development',
                compiled: process.env.NODE_ENV === 'development',
                editor: process.env.NODE_ENV === 'development'
            }}
            data={{ top_practices: props.data }}
            spec={config.chartSpec}
        />
    );
};

export default TopPracticesByArea;
