// @flow
export type Boundary = {
    visible: boolean;
    label: string;
    options: string[];
    layer: {
        id: string;
        featureIdKey: string;
        crs: number;
    };
}

export type Filters = {
    years: [number, number];
    boundaryType: string;
    selectedBoundaries: string[];
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
