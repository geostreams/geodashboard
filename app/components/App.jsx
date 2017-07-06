import React, {Component} from 'react'
import {Router, Route, browserHistory, hashHistory} from 'react-router'
import Search from '../containers/Search'
import Home from '../pages/Home'
import Explore from '../pages/Explore'
import Analysis from '../containers/Analysis';
import Detail from '../pages/Detail'
import About from '../pages/About';
import RouteMismatch from '../pages/RouteMismatch'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'material-components-web/dist/material-components-web.min.css';
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin();

class App extends Component {

    componentWillMount() {
        console.log('App did mount');
        const { loadSensors } = this.props;
        // dispatch is synchronous by default,
        loadSensors(window.configruntime.clowder_endpoints[0].url);
    }

    render() {
        return (
            <MuiThemeProvider>
                <Router history={hashHistory}>
                    <Route path="/" component={Home}/>
                    <Route path="/explore" component={Explore}/>
                    <Route path="/detail/location/:name" component={Detail}/>
                    <Route path="/search" component={Search}/>
                    <Route path="/analysis" component={Analysis}/>
                    <Route path="/about" component={About}/>
                    <Route path="*" component={RouteMismatch}/>
                </Router>
            </MuiThemeProvider>
        )
    }
}

export default App