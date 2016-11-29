import React, {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';
import Search from './Search';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import About from '../pages/About';
import RouteMismatch from '../pages/RouteMismatch';
import { connect } from 'react-redux';
import { fetchSensors } from '../actions';
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
                    <Route path="/about" component={About}/>
                    <Route path="*" component={RouteMismatch}/>
                </Router>
            </MuiThemeProvider>
		)
	}

}

const mapStateToProps = (state, ownProps) => {
    return {
        sensors: state.sensors,
        api: state.backends.selected,
        sensors_url: state.backends.selected
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        loadSensors: (selected) => {
            dispatch(fetchSensors(selected))
            }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);