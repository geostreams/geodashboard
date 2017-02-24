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
        // case 'ADD_SEARCH_PARAMETER':
        //     const available_sensors_p = [];
        //
        //     let selectedParameters = action.payload.selectedParameters.parameters;
        //     if(action.payload.parameter.length > 0 && selectedParameters.indexOf(action.payload.parameter) == -1) {
        //         selectedParameters = selectedParameters.concat(action.payload.parameter);
        //     }
        //     if(selectedParameters.length > 0) {
        //         var idx = action.payload.selected_filters.indexOf("parameters");
        //         if(idx < 0) {
        //             idx = action.payload.selected_filters.length;
        //         }
        //         state.available_sensors[idx-1].map((sensor) => {
        //             if(inArray(selectedParameters, sensor.parameters)) {
        //                 available_sensors_p.push(sensor);
        //             }
        //         });
        //         let available_sensors_p_all = state.available_sensors;
        //         available_sensors_p_all[idx] = available_sensors_p;
        //         return Object.assign({}, state, {available_sensors: available_sensors_p_all});
        //
        //     } else {
        //         return state
        //     }
        //
        // case 'ADD_SEARCH_DATASOURCE': {
        //     const available_sensors_ds = [];
        //     let selectedDataSources = action.payload.selectedDataSources.data_sources;
        //     //If the current data source hasn't been added to the global state. Add it here to the list to check.
        //     //This seems to be called when you add this filter to the application. And it is sent in an empty array as
        //     // the data_source. That is the reason for the check against the length.
        //     if(action.payload.data_source.length > 0 && selectedDataSources.indexOf(action.payload.data_source) == -1) {
        //        selectedDataSources =  selectedDataSources.concat(action.payload.data_source);
        //     }
        //     if(selectedDataSources.length > 0) {
        //
        //         state.available_sensors.map((sensor) => {
        //             if(selectedDataSources.indexOf(sensor.properties.type.id) > -1) {
        //                 available_sensors_ds.push(sensor);
        //             }
        //         });
        //         return Object.assign({}, state, {available_sensors: available_sensors_ds});
        //     } else {
        //         return state
        //     }
        // }
        //
        //
        //
        // case 'ADD_SEARCH_LOCATION': {
        //     const available_sensors_l = [];
        //
        //     if(action.payload.location !== null ) {
        //         var idx = action.payload.selected_filters.indexOf("location");
        //         if(idx < 0) {
        //             idx = state.available_sensors.length;
        //         }
        //         state.available_sensors[idx-1].map((sensor) => {
        //             if(action.payload.location === sensor.properties.region) {
        //                 available_sensors_l.push(sensor);
        //             }
        //         });
        //         let available_sensors_l_all = state.available_sensors;
        //         available_sensors_l_all[idx] = available_sensors_l;
        //         return Object.assign({}, state, {available_sensors: available_sensors_l_all});
        //     } else {
        //         return state;
        //     }
        //
        // }
        //
        // case 'ADD_START_DATE': {
        //     const available_sensors_sd = [];
        //     state.available_sensors.map((sensor) => {
        //         if(action.date < new Date(sensor.max_end_time)) {
        //             available_sensors_sd.push(sensor);
        //         }
        //     });
        //     return Object.assign({}, state, {available_sensors: available_sensors_sd});
        // }
        //
        // case 'ADD_END_DATE':
        //     const available_sensors_ed = [];
        //     state.available_sensors.map((sensor) => {
        //         if(action.date > new Date(sensor.min_start_time)) {
        //             available_sensors_ed.push(sensor);
        //         }
        //     });
        //     return Object.assign({}, state, {available_sensors: available_sensors_ed});

        case UPDATE_AVAILABLE_SENSORS:
            let newSensors = filterAvailableSensors(state, action.selected_filters, action.selected_search)
            return Object.assign({}, state, {available_sensors: newSensors});
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