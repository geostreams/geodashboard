import { SWITCH_BACKEND, REQUEST_SENSORS, RECEIVE_SENSORS, UPDATE_AVAILABLE_SENSORS} from '../actions'
import getLocationName from './locationNames'

const defaultState = {data:[], parameters: [], sources: [], locations: [], available_sensors: []}

function inArray(array1, array2) {
    if(array1.length > 0 && array2.length > 0) {
        for(var i = 0; i < array1.length; i++) {
            if(array2.indexOf(array1[i]) > -1) {
                return true;
            }
        }
    }
    return false;
}

const sensors = (state = defaultState, action) => {
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

export function collectParameters(sensorsData) {
    var params = [];
    sensorsData.map(s => {
      s.parameters.map(p => {
        // check if parameters exists already
        var found = params.some(function (e) {
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

export function collectSources(sensorsData) {
    var sources = [];
    sensorsData.map(s => {
      var source = s.properties.type;
      // check if source exists already
      var found = sources.some(function (e) {
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

export function collectLocations(sensorsData) {
    const locations = [];
    sensorsData.map(s => {
        const location = s.properties.region;
        // check if source exists already
        const found = locations.some(function (e) {
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

function sortByLabel(list) {
    list.sort(function(a, b) {
      var labelA = a.label.toUpperCase();
      var labelB = b.label.toUpperCase();
      if (labelA < labelB) {
        return -1;
      }
      if (labelA > labelB) {
        return 1;
      }
      return 0;
    });
    return list;
  }

function filterAvailableSensors(state, selectedFilters, selectedSearch) {
    let av_sensors = state.data;
    let new_sensors = [];
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

            case 'date':
                av_sensors = av_sensors.map((sensor) => {
                    if(selectedSearch.date.selected.start < new Date(sensor.max_end_time) && selectedSearch.date.selected.end > new Date(sensor.min_start_time)) {
                        return sensor;
                    }
                });
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