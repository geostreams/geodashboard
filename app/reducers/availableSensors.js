import { ADD_START_DATE, ADD_END_DATE} from '../actions'

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

const defaultState = {available_sensors: []};
const available_sensors = (state= defaultState, action) => {
    switch(action.type) {
        case 'ADD_SEARCH_PARAMETER':
            const available_sensors_p = [];
                state.available_sensors.map((sensor) => {
                if(inArray(sensor.parameters, this.state.selectedParameters)) {
                    available_sensors_p.push(sensor);
                }
            });
            return Object.assign({}, state, {available_sensors: available_sensors_p});

        case 'ADD_SEARCH_DATASOURCE':
            const available_sensors_ds = [];
            this.state.available_sensors.map((sensor) => {
                if(this.state.selectedDataSources.indexOf(sensor.properties.type.id) > -1) {
                    available_sensors_ds.push(sensor);
                }
            });
            return Object.assign({}, state, {available_sensors: available_sensors_ds});
        case 'ADD_SEARCH_LOCATION':
            const available_sensors_l = [];
            state.available_sensors.map((sensor) => {
                if(action.location === sensor.properties.region) {
                    available_sensors_l.push(sensor);
                }
            });
            return Object.assign({}, state, {available_sensors: available_sensors_l});
        case 'ADD_START_DATE':
            const available_sensors_sd = [];
            state.available_sensors.map((sensor) => {
                if(action.date < new Date(sensor.max_end_time)) {
                    available_sensors_sd.push(sensor);
                }
            });
            return Object.assign({}, state, {available_sensors: available_sensors_sd});
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
};

export default available_sensors