import React, {Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Search from '../containers/Search'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import RouteMismatch from '../pages/RouteMismatch'

class App extends Component {

  componentWillMount() {
    console.log('App did mount');
    const { loadSensors, sensors_url } = this.props;
    loadSensors(sensors_url)
  }

	render() {
		return (
		  <Router history={browserHistory}>
		    <Route path="/" component={Home}/>
		    <Route path="/explore" component={Explore}/>
		    <Route path="/search" component={Search}/>
		    <Route path="*" component={RouteMismatch}/>
		  </Router>
		)
	}
}

export default App