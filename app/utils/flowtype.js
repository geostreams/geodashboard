/*
 * @flow
 */

import ol from 'openlayers';

export type Geometry = {
    type: string;
    coordinates: string[]
};

// this is data source
export type PropertiesType = {
    id: string;
    title: string
};

export type Properties = {
    name: string;
    popupContent: string;
    region: string;
    type: PropertiesType;
    online_status: string;
};

export type Sensor = {
    id: number;
    created: string;
    geometry: Geometry;
    max_end_time: string;
    min_end_time: string;
    name: string;
    parameters: string[];
    properties: Properties;
    type: string;
    min_start_time: Date;
    trend_end_time: Date;
    trend_start_time: Date;
    trends: [];
};

export type Sensors = Sensor[];

export type Parameter = {
    id: number,
    name: string,
    title: string,
    unit: string,
    categories: string[],
    detail_view: string[],
    search_view: boolean,
    explore_view: boolean,
    scale_names: string[],
    scale_colors: string[]
}

export type Parameters = Parameter[];
//type for Parameter/Source/ Location in state.
export type MapWithLabel = {
    id: string,
    label: string
};

export type MapWithLabels = MapWithLabel[];

type endpoint = {
    url: string,
    label: string
};

//ref: https://github.com/DavidBrear/ReactNativeFlowExample/tree/master/js
export type GetState = () => Object;

export type DatasourceParameter = {
    available: Array<string>,
    selected: Array<string>
};

export type Location = {
    available: Array<string>,
    selected: ?string
};

//TODO: this is not fully checked now, ref: http://redux.js.org/docs/basics/DataFlow.html
export type backendsState = {
    endpoints: Array<endpoint>,
    selected: string
};

export type sensorDetailState = {
    id: null,
    datapoints: []
}

export type parameterState = {
    parameters: Parameters
}

export type searchFiltersState = {
    filters: Array<Object>,
    selected: Array<Object>
};

export type selectedSearchState = {
    locations: Location,
    data_sources: DatasourceParameter,
    parameters: DatasourceParameter,
    dates: {
        available: { start: Date, end: Date },
        selected: { start: ?Date, end: ?Date },
    },
    span: {
        available: { start: Date, end: Date },
        selected: { start: ?Date, end: ?Date },
    },
    online: {selected: null, available: []},
};

export type exploreFilteringState = {
    data_sources: DatasourceParameter,
}

export type sensorsState = {
    sensors: Sensors,
    available_sensors: Sensors,
    locations: MapWithLabels,
    sources: MapWithLabels,
    regions: Array<string>,
    parameters: MapWithLabels,
    data: Sensors,
    draw_available_sensors: Sensors,
    shape_coordinates: Array<number>,
    explore_sensors: Sensors
};

export type trendsSensorsState = {
    chosen_parameter: string,
    baseline_period: string,
    rolling_period: string,
    threshold_value: string,
    chosen_region: string,
    data: Sensors,
    available_sensors: Sensors,
    number_to_filter: number,
}

export type exploreLayersState = {
    layers_visibility: Array<string>
};

export type MapProps = {
    sensors: Sensors,
    availableSensors: Sensors
};

export type BasicMapState = {
    center: Array<number>,
    vectorSource: ol.source.Vector,
    clusterSource: ol.source.Cluster,
    customLocationFilterVectorExtent: Array<number>,
    map: ol.Map,
    currentZoom: number,
    maxZoom: number
};

//TODO: remove this when using BasicMap in Trends Map
export type TrendsMapState = {
    center: Array<number>,
    vectorSource: ol.source.Vector,
    clusterSource: ol.source.Cluster,
    areaPolygonSource: ol.source.Vector,
    map: ol.Map,
    currentZoom: number,
    maxZoom: number,
    openAboutButton: boolean
};

export type TrendsRegionMapState = {
    center: Array<number>,
    vectorSource: ol.source.Vector,
    clusterSource: ol.source.Cluster,
    areaPolygonSource: ol.source.Vector,
    map: ol.Map,
    currentZoom: number,
}

export type RegionGeometry = {
    type: string;
    coordinates: [];
    geocode: [];
};

export type RegionTrends = {
    lastaverage: number;
    tenyearsaverage: number;
    totalaverage: number;
}

export type TrendsDetail = {
    id: number;
    value: number;
}

export type TrendsDeviation = {
    id: number;
    value: number;
}

export type TrendsRegionSetup = {
    id: number;
    geometry: RegionGeometry;
    name: string;
    properties: Properties;
    type: string;
    region_trends: RegionTrends;
    trends_detail: TrendsDetail;
    trends_deviation: TrendsDeviation;
};

export type TrendsRegions = TrendsRegionSetup[];
export type TrendsParameter = string;
export type TrendsSeason = string;
export type TrendsRegion = string;
export type TrendsThreshold = string;
export type TrendsThresholdChoice = boolean;
export type TrendsPageSensorsState = Sensors;
export type TrendsPageRegionsState = TrendsRegions;
export type TrendsViewType = string;
export type TrendsBaselineTotalYear = number;
export type TrendsRollingInterval = number;

export type ChosenTrendsState = {
    region: TrendsRegion,
    all_regions: Array<string>,
    parameter: TrendsParameter,
    season: TrendsSeason,
    threshold_choice: TrendsThresholdChoice,
    threshold: TrendsThreshold,
    sensors: Sensors,
    trends_sensors: TrendsPageSensorsState,
    trends_regions: TrendsPageRegionsState,
    baseline_total_year: TrendsBaselineTotalYear,
    rolling_interval: TrendsRollingInterval,
    view_type: TrendsViewType,
    number_to_filter: number,
    draw_available_sensors: TrendsPageSensorsState,
};

// export type Action = BackendAction | SearchFilterAction | SensorAction | SelectedSearchAction;
export type Dispatch = (action: any) => null;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type MapOfStrings = { [key: string]: string };
export type MapOfArrays = { [key: string]: Array<any> };

//refer https://github.com/facebook/flow/issues/218
type ElementEventTemplate<E> = {
    target: E
} & Event;

export type InputEvent = ElementEventTemplate<HTMLInputElement>;

type eventOnMap = {
    pixel: Array<number>,
    coordinate: Array<number>
}
export type InputEventMap = InputEventMap & eventOnMap;

type SensorIDsType = Array<number>;
export type SensorIDsList = SensorIDsType[];

//type Dispatch = (action: Action | Promise<Action>) => Promise;
