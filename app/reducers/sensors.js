import { SWITCH_BACKEND, REQUEST_SENSORS, RECEIVE_SENSORS} from '../actions'

const defaultState = {data:[], parameters: [], sources: []}

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
    	})
		default:
			return state
	}
}

function collectParameters(sensorsData) {
    var params = [];
    sensorsData.map(s => {
      s.parameters.map(p => {
        // check if paremets exists already
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

function getLocationName(source) {
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

function collectLocations(sensorsData) {
    let locations = [];
    sensorsData.map(s => {
        let location = s.properties.region;
        // check if source exists already
        let found = locations.some(function (e) {
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

export default sensors