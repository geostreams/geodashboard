/*
 * @flow
 */

export type Geometry = {
    type:string;
    coordinates:string[]
};

// this is data source
export type PropertiesType = {
    id:string;
    title:string
};

export type Properties = {
    name:string;
    popupContent:string;
    region:string;
    type:PropertiesType
};

export type Sensor = {
    id:number;
    created:string;
    geometry:Geometry;
    max_end_time:string;
    min_end_time:string;
    name:string;
    parameters:string[];
    properties:Properties;
    type:string;
    min_start_time:Date;
    trend_end_time:Date;
    trend_start_time:Date;
    trends:[];
};

export type Sensors = Sensor[];

//type for Parameter/Source/ Location in state. 
export type MapWithLabel = {
    id:string,
    label:string
};

export type MapWithLabels = MapWithLabel[];

type endpoint = {
    url:string,
    label:string
};



//ref: https://github.com/DavidBrear/ReactNativeFlowExample/tree/master/js
export type GetState = () => Object;

export type DatasourceParameter = {available:Array<string>, selected:Array<string>};
export type Location = {available:Array<string>, selected:?string};

//TODO: this is not fully checked now, ref: http://redux.js.org/docs/basics/DataFlow.html
export type backendsState = {
      endpoints:Array<endpoint>,
      selected:string
    };
export type searchFiltersState = {
        filters:Array<Object>,
        selected:Array<Object>
    };
export type selectedSearchState = {
        locations:Location,
        data_sources:DatasourceParameter,
        parameters:DatasourceParameter,
        dates: {
            available: {start:Date, end:Date},
            selected: {start:Date, end:Date},
        }
    };
export type sensorsState= {
        available_sensors:Sensors,
        locations:MapWithLabels,
        sources:MapWithLabels,
        parameters:MapWithLabels,
        data:Sensors,
        draw_available_sensors:Sensors,
    };
export type trendsSensorsState = {
    chosen_parameter: string,
    baseline_period: string,
    rolling_period: string,
    threshold_value: string,
    data: Sensors,
    available_sensors: Sensors,
}

// export type Action = BackendAction | SearchFilterAction | SensorAction | SelectedSearchAction;
export type Dispatch = (action:any) => null;
export type ThunkAction = (dispatch:Dispatch, getState:GetState) => any;
export type MapOfStrings = { [key:string]:string };
export type MapOfArrays = { [key:string]:Array<any> };

//refer https://github.com/facebook/flow/issues/218
type ElementEventTemplate<E> = {
        target: E
    } & Event;

export type InputEvent = ElementEventTemplate<HTMLInputElement>;


//type Dispatch = (action: Action | Promise<Action>) => Promise;

