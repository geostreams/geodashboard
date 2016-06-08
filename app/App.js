import React, {Component} from 'react'
import config from './config.json';
import sensorsData from '../data/sensors.json'
import { Router, Route, Link, browserHistory } from 'react-router'
import Search from './Search'
import Home from './pages/Home'
import Explore from './pages/Explore'
import RouteMismatch from './pages/RouteMismatch'
import { connect } from 'react-redux'
import { fetchSensors } from './actions'

class App extends Component {

  componentWillMount() {
    console.log('App did mount')
    const { loadSensors, sensors_url } = this.props
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

const mapStateToProps = (state, ownProps) => {
  return {
    sensors: state.sensors,
    api: state.backends.selected,
    sensors_url: state.backends.selected
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    loadSensors: (selected) => {
      dispatch(fetchSensors(selected))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)