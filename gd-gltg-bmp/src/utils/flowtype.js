// @flow
export type Boundary = {
    visible: boolean;
    label: string;
    idKey: string;
    layer: {
        id: string;
        featureIdKey: string;
        crs: number;
    };
};

export type Filters = {
    years: [number, number];
    boundaryType: string;
    selectedBoundaries: string[];
};

export type QueryParams = {
    applied_date: number;
    sunset: number;
    state?: string[];
    huc_8?: string[];
    group_by: string[];
    aggregates: string[];
    order_by: string[];
};

type UpdateYearsAction = {
    type: 'years';
    value: [number, number];
};

type UpdateBoundaryType = {
    type: 'boundaryType';
    value: string;
};

type UpdateSelectedBoundaries = {
    type: 'selectedBoundaries';
    value: string[];
};

export type FiltersAction =
    | UpdateYearsAction
    | UpdateBoundaryType
    | UpdateSelectedBoundaries

type Assumption = {
    alias_1: string;
    alias_10: string;
    alias_11: string;
    alias_12: string;
    alias_13: string;
    alias_14: string;
    alias_15: string;
    alias_16: string;
    alias_17: string;
    alias_18: string;
    alias_19: string;
    alias_2: string;
    alias_20: string;
    alias_21: string;
    alias_22: string;
    alias_3: string;
    alias_4: string;
    alias_5: string;
    alias_6: string;
    alias_7: string;
    alias_8: string;
    alias_9: string;
    alt_unit_1: string;
    alt_unit_2: string;
    alt_unit_3: string;
    alt_unit_4: string;
    ancillary_benefits: string;
    category: string;
    conv: string;
    cost_share_fraction: string;
    dominant_unit: string;
    id: string;
    life_span: string;
    name: string;
    nitrogen: string;
    phosphorus: string;
    units: string;
    url: string;
    wq: number;
    wq_benefits: string;
};

type HUC8 = {
    areaacres: string;
    huc8: string;
    name: string;
    states: string;
};

type State = {
    area_sq_mi: number;
    fraction_n: number;
    fraction_p: number;
    id: string;
    overall_n_yield_lbs_per_ac: number;
    overall_p_yield_lbs_per_ac: number;
    rowcrop_n_yield_lbs_per_ac: number;
    rowcrop_p_yield_lbs_per_ac: number;
    size_ac: number;
    total_n_load_lbs: number;
    total_p_load_lbs: number;
};

export type Config = {
    assumptions?: Assumption[];
    huc8?: HUC8[];
    states?: State[];
};

export type BMPContextType = {
    config: Config;
    activeView: 'filter' | 'results';
    updateActiveView: (activeView: 'filter' | 'results') => void;
    filters: Filters;
    dispatchFilterUpdate: (action: FiltersAction) => void;
    results: any;
    updateResults: (results: any) => void;
};
