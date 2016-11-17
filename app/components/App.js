import React, {Component} from 'react'
import { Router, Route, Link, browserHistory } from 'react-router'
import Search from '../containers/Search'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import RouteMismatch from '../pages/RouteMismatch'
import { connect } from 'react-redux'
import { fetchSensors } from '../actions'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  componentWillMount() {
    console.log('App did mount');
    const { loadSensors, sensors_url } = this.props;
    loadSensors(sensors_url)
  }

	render() {
		return (
		    <MuiThemeProvider>
		  <Router history={browserHistory}>
		    <Route path="/" component={Home}/>
		    <Route path="/explore" component={Explore}/>
		    <Route path="/search" component={Search}/>
		    <Route path="*" component={RouteMismatch}/>
		  </Router>
            </MuiThemeProvider>
		)
	}
}

export default App