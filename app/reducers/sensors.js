/*
 * @flow
 */
import { SWITCH_BACKEND, REQUEST_SENSORS, RECEIVE_SENSORS, UPDATE_AVAILABLE_SENSORS} from '../actions'
import type { Sensors, sensorsState, MapWithLabel, MapWithLabels } from '../utils/flowtype'
import {inArray, sortByLabel} from '../utils/arrayUtils'

type SensorAction = {| type:'RECEIVE_SENSORS' | 'UPDATE_AVAILABLE_SENSORS', sensors:Sensors, api:string, receivedAt:Date,
    selected_search:Object, selected_filters:Array<string>|};

const defaultState = {data:[], parameters: [], sources: [], locations:[], available_sensors:[]}

const sensors = (state:sensorsState = defaultState, action:SensorAction) => {
	switch(action.type) {
		case RECEIVE_SENSORS:
			return Object.assign({}, state, {
		        data: action.sensors,
		        receivedAt: action.receivedAt,
		        api: action.api,
		        parameters: collectParameters(action.sensors),
		        sources: collectSources(action.sensors),
                locations: collectLocations(action.sensors),
                available_sensors: action.sensors
    	})

      case UPDATE_AVAILABLE_SENSORS:
            let newSensors = filterAvailableSensors(state, action.selected_filters, action.selected_search)
            return Object.assign({}, state, {available_sensors: newSensors});
		default:
			return state
	}
}

export function collectParameters(sensorsData:Sensors):MapWithLabels {
    var params:MapWithLabels = [];
    sensorsData.map(s => {
      s.parameters.map(p => {
        // check if parameters exists already
        const found = params.some(function (e:MapWithLabel) {
          return e.id === p;
        })
        if (p === null)
        	console.log(`Found sensor ${s.id} with null parameters`)
        else if (!found) 
        	params.push({'id': p, 'label': p || ''});
      });
    });
    // sort
    return sortByLabel(params);
  }

export function collectSources(sensorsData:Sensors):MapWithLabels {
    var sources:MapWithLabels = [];
    sensorsData.map(s => {
      var source = s.properties.type;
      // check if source exists already
        const found = sources.some(function (e:MapWithLabel) {
            return e.id === source.id;
        })
       if (source === null)
        console.log(`Found sensor ${s.id} with null data sources`)
      else if (!found) 
      	sources.push({'id':source.id, 'label': source.title || ''});
    });
    // sort
    return sortByLabel(sources);
  }

type CollectDate = {'start': Date, 'end': Date};
export function collectDates(sensorsData:Sensors):CollectDate {
    let minDate = new Date();
    let maxDate = new Date("1983-01-01");

    sensorsData.map(s => {
        const sensorStartTime = new Date(s.min_start_time);
        const sensorEndTime = new Date(s.max_end_time);
        if(sensorStartTime.getTime() < minDate.getTime()) {
            minDate = sensorStartTime;
        }
        if(sensorEndTime.getTime() > maxDate) {
            maxDate = sensorEndTime;
        }
    });

    return {'start': minDate, 'end': maxDate};
}


export function collectLocations(sensorsData:Sensors):MapWithLabels {
    const locations:MapWithLabels = [];
    sensorsData.map(s => {
        const location = s.properties.region;
        // check if location exists already
        const found = locations.some(function (e:MapWithLabel) {
            return e.id === location;
        });
        if (location === null)
            console.log(`Found sensor ${s.id} without location`);
        else if (!found)
            locations.push({'id': location, 'label': getLocationName(location) || ''});
    });
    // sort
    return sortByLabel(locations);
}


export function getLocationName(source:string):string {
    const named_locations =
    {
        "OH": "Ohio",
        "HU": "Lake Huron",
        "ON": "Lake Ontario",
        "MI": "Lake Michigan",
        "ER": "Lake Erie",
        "SU": "Lake Superior",
    };
    return named_locations[source] !== undefined ? named_locations[source] : source;
}

function filterAvailableSensors(state:sensorsState, selectedFilters:Array<string>, selectedSearch:Object) {
    let av_sensors: Sensors = state.data;
    let new_sensors: Sensors = [];
    selectedFilters.map ((filter) => {
        switch(filter) {
            case 'data_source':
                if(selectedSearch.data_sources.selected.length > 0) {
                    new_sensors = [];
                    av_sensors.map((sensor) => {
                        if(selectedSearch.data_sources.selected.indexOf(sensor.properties.type.id) > -1) {
                            new_sensors.push(sensor);
                        }
                    });
                    av_sensors = new_sensors;

                }
                return;

            case 'parameters':
                if(selectedSearch.parameters.selected.length > 0) {
                    new_sensors = [];
                    av_sensors.map((sensor) => {
                        if(inArray(selectedSearch.parameters.selected, sensor.parameters)) {
                            new_sensors.push(sensor);
                        }
                    });
                    av_sensors = new_sensors;
                }

                return;

            case 'time':
                new_sensors=[];
                av_sensors.map((sensor) => {
                    if(selectedSearch.dates.selected.start <= new Date(sensor.max_end_time) && selectedSearch.dates.selected.end >= new Date(sensor.min_start_time)) {
                        new_sensors.push(sensor);
                    }
                });
                av_sensors = new_sensors;
                return;

            case 'locations':
                if(selectedSearch.locations.selected != null ) {
                    new_sensors = [];
                    av_sensors.map((sensor => {
                        if(selectedSearch.locations.selected == sensor.properties.region) {
                            new_sensors.push(sensor);
                        }
                    }));
                    av_sensors = new_sensors;
                }

                return;
        }

    });
    return av_sensors;
}

export default sensors