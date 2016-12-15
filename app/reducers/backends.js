const defaultState = {
	endpoints:[
    {url: "https://greatlakesmonitoring.org/clowder", label: "GLM"}, 
    {url: "https://gltg.ncsa.illinois.edu/clowder", label: "GLTG"},
    {url: "https://imlczo.ncsa.illinois.edu/clowder", label: "IMLCZO"}
  ], 
  selected: "https://greatlakesmonitoring.org/clowder"};

const backends = (state = defaultState, action) => {
	switch(action.type) {
    case 'SWITCH_BACKEND':
      return Object.assign({}, state, {selected: action.selected});
		default:
			return state
	}
};

export default backends