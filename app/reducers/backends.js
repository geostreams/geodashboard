const defaultState = {
	endpoints:[
    {url: "https://greatlakesmonitoring.org/clowder", label: "GLM"}, 
    {url: "http://gltg.ncsa.illinois.edu/clowder", label: "GLTG"},
    {url: "http://data.imlczo.org/clowder", label: "IMLCZO"}
  ], 
  selected: "http://gltg.ncsa.illinois.edu/clowder"}

const backends = (state = defaultState, action) => {
	switch(action.type) {
    case 'SWITCH_BACKEND':
      return Object.assign({}, state, {selected: action.selected})
		default:
			return state
	}
}

export default backends