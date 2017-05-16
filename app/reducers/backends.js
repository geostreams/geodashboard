/*
 * @flow
 */
import type { backendsState } from '../utils/flowtype'

type BackendAction = {| type:'SWITCH_BACKEND', selected:string |};

const defaultState = {
	endpoints:[
    {url: "https://greatlakesmonitoring.org/clowder", label: "GLM PROD"},
    {url: "https://seagrant-dev.ncsa.illinois.edu/clowder", label: "GLM DEV"},
    {url: "http://greatlakestogulf.org/clowder", label: "GLTG PROD"},
    {url: "http://gltg-dev.ncsa.illinois.edu/clowder", label: "GLTG DEV"},
    {url: "http://data.imlczo.org/clowder", label: "IMLCZO PROD"},
    {url: "https://imlczo-dev.ncsa.illinois.edu/clowder", label: "IMLCZO DEV"},
    {url: "http://141.142.211.37/clowder", label: "IMLCZO NEBULA"},
    {url:"http://localhost:9000", label:"TEST"}
  ], 
  selected: "https://greatlakesmonitoring.org/clowder"};


const backends = (state:backendsState = defaultState, action:BackendAction) => {
	switch(action.type) {
        case 'SWITCH_BACKEND':
            return Object.assign({}, state, {selected: action.selected});
        default:
            return state
    }
};

export default backends