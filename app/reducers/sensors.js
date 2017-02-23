import { SWITCH_BACKEND, REQUEST_SENSORS, RECEIVE_SENSORS} from '../actions'
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
        case 'ADD_SEARCH_PARAMETER':
            const available_sensors_p = [];
            let selectedParameters = action.payload.selectedParameters.parameters;
            if(action.payload.parameter.length > 0 && selectedParameters.indexOf(action.payload.parameter) == -1) {
                selectedParameters = selectedParameters.concat(action.payload.parameter);
            }
            if(selectedParameters.length > 0) {
                state.available_sensors.map((sensor) => {
                    if(inArray(selectedParameters, sensor.parameters)) {
                        available_sensors_p.push(sensor);
                    }
                });
                return Object.assign({}, state, {available_sensors: available_sensors_p});

            } else {
                return state
            }

        case 'ADD_SEARCH_DATASOURCE': {
            const available_sensors_ds = [];
            let selectedDataSources = action.payload.selectedDataSources.data_sources;
            //If the current data source hasn't been added to the global state. Add it here to the list to check.
            //This seems to be called when you add this filter to the application. And it is sent in an empty array as
            // the data_source. That is the reason for the check against the length.
            if(action.payload.data_source.length > 0 && selectedDataSources.indexOf(action.payload.data_source) == -1) {
               selectedDataSources =  selectedDataSources.concat(action.payload.data_source);
            }
            if(selectedDataSources.length > 0) {

                state.available_sensors.map((sensor) => {
                    if(selectedDataSources.indexOf(sensor.properties.type.id) > -1) {
                        available_sensors_ds.push(sensor);
                    }
                });
                return Object.assign({}, state, {available_sensors: available_sensors_ds});
            } else {
                return state
            }
        }



        case 'ADD_SEARCH_LOCATION': {
            const available_sensors_l = [];
            console.log("lalalala");
            console.log(state);
            if(action.location !== null ) {
                state.data.map((sensor) => {
                    if(action.location === sensor.properties.region) {
                        available_sensors_l.push(sensor);
                    }
                });
                return Object.assign({}, state, {available_sensors: available_sensors_l});
            } else {
                return state;
            }

        }

        case 'ADD_START_DATE': {
            const available_sensors_sd = [];
            state.available_sensors.map((sensor) => {
                if(action.date < new Date(sensor.max_end_time)) {
                    available_sensors_sd.push(sensor);
                }
            });
            return Object.assign({}, state, {available_sensors: available_sensors_sd});
        }

        case 'ADD_END_DATE':
            const available_sensors_ed = [];
            state.available_sensors.map((sensor) => {
                if(action.date > new Date(sensor.min_start_time)) {
                    available_sensors_ed.push(sensor);
                }
            });
            return Object.assign({}, state, {available_sensors: available_sensors_ed});

		default:
			return state
	}
}

function collectParameters(sensorsData) {
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

function collectSources(sensorsData) {
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

function collectLocations(sensorsData) {
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

// function filterAvailableSensors(state) {
//     var av_sensors = state.sensors.data;
//     state.selectedFilters.map ((filter) => {
//         switch(filter) {
//             case 'data_source':
//                 //filter by data_source
//             case 'parameters':
//                 //filter by parameters
//             case 'date':
//                 //filter by date
//             case 'location':
//                 //filter by location
//         }
//
//     })
//     return av_sensors;
// }
export default sensors