import React, {Component} from 'react';
import {Router, Route, hashHistory} from 'react-router';
import Search from '../pages/Search';
import Home from '../pages/Home';
import Explore from '../pages/Explore';
import TrendsStation from '../pages/TrendsSensor';
import TrendsRegion from '../pages/TrendsRegion';
import Analysis from '../pages/Analysis';
import Detail from '../pages/Detail';
import TrendsDetail from '../pages/TrendsDetail';
import About from '../pages/About';
import RouteMismatch from '../pages/RouteMismatch';
import 'material-components-web/dist/material-components-web.min.css';
import {getApplicationBackends} from '../utils/getConfig';

class App extends Component {

    componentWillMount() {
        console.log('App did mount');
        const { loadSensors } = this.props;
        // dispatch is synchronous by default,
        loadSensors(window.configruntime.gd3.clowder_endpoints[0].url);

    }

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Home}/>
                <Route path="/explore/:stations" component={Explore}/>
                <Route path="/detail/location/:name" component={Detail}/>
                <Route path="/search" component={Search}/>
                <Route path="/trendsstations" component={TrendsStation}/>
                <Route path="/trendsregions" component={TrendsRegion}/>
                <Route path="/trendsdetail/region/:region/:parameter/:season" component={TrendsDetail}/>
                <Route path="/analysis" component={Analysis}/>
                <Route path="/about" component={About}/>
                <Route path="*" component={RouteMismatch}/>
            </Router>
        )
    }
}

export default App