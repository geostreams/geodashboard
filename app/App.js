import React, {Component} from 'react'
import config from './config.json';
import sensorsData from '../data/sensors.json'
import { Router, Route, Link, browserHistory } from 'react-router'
import Search from './Search'
import Home from './pages/Home'
import Explore from './pages/Explore'
import RouteMismatch from './pages/RouteMismatch'

class App extends Component {

	render() {
		return (
		  <Router history={browserHistory}>
		    <Route path="/" component={Home}/>
		    <Route path="/explore" component={Explore}/>
		    <Route path="/search" component={Search}/>
		    <Route path="*" component={RouteMismatch}/>
		  </Router>
		);
	}

}

export default App;