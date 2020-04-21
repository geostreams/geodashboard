/*
 * @flow
 */

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
import Partners from '../pages/Partners';
import Glossary from '../pages/Glossary';
import Help from '../pages/Help';
import FAQ from '../pages/FAQ';
import RouteMismatch from '../pages/RouteMismatch';
import 'material-components-web/dist/material-components-web.min.css';
import type {MapProps} from "../utils/flowtype";
import {
    Button, Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter, Icon
} from 'react-mdc-web/lib';
import {
    getIEAlertBoxTitle, getIEAlertBoxBody, getIEAlertButtonText, getIEAlertShow,
    getIEVersionsBeforeEleven, getIEVersionEleven, getIEVersionEdge
} from "../utils/getConfig";
import styles from '../styles/main.css';


const routes = (
    // $FlowFixMe
    <Route component={App}>
        <Route path="/" component={Home}/>
        <Route path="/explore/:stations" component={Explore}/>
        <Route
            path="/detail/location/:name/:category(?params=(:parameters_list))(&start=(:start_date))(&end=(:end_date))"
            component={Detail}/>
        <Route path="/search" component={Search}/>
        <Route path="/trendsstations" component={TrendsStation}/>
        <Route path="/trendsregions" component={TrendsRegion}/>
        <Route path="/trendsdetail/region/:region/:parameter/:season" component={TrendsDetail}/>
        <Route path="/analysis" component={Analysis}/>
        <Route path="/about" component={About}/>
        <Route path="/partners" component={Partners}/>
        <Route path="/glossary" component={Glossary}/>
        <Route path="/help" component={Help}/>
        <Route path="/faq" component={FAQ}/>
        <Route path="*" component={RouteMismatch}/>
    </Route>
);

class App extends Component {

    constructor(props: MapProps) {
        super(props);
        this.state = {
            isOpen: false
        };
        (this: any).handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    state: {
        isOpen: boolean
    };

    handleCloseAlert() {
        this.setState({isOpen: false})
    };

    componentWillMount() {
        console.log('App did mount');
        const {loadSensors} = this.props;
        // dispatch is synchronous by default,
        loadSensors(window.configruntime.gd3.geostreaming_endpoints[0].url);
    }

    componentDidMount() {

        // If enabled, and the Browser is IE or Edge, alert the User
        if (getIEAlertShow() === true) {
            let navUserAgent = navigator.userAgent.toLowerCase();
            let isIE = 'false';
            if (navUserAgent.indexOf('msie') !== -1) {
                isIE = parseInt(navUserAgent.split('msie')[1]).toString();
                if (getIEVersionsBeforeEleven().indexOf(isIE) !== -1) {
                    this.setState({isOpen: true});
                }
            }
            if (
                (navUserAgent.indexOf('msie') === -1 && navUserAgent.indexOf('trident') !== -1 &&
                    getIEVersionEleven() === true) ||
                (navUserAgent.indexOf('edge') !== -1 && getIEVersionEdge() === true)) {
                this.setState({isOpen: true});
            }
        }

    }

    render() {

        let popup_alert_content = '';
        if (getIEAlertBoxBody().length !== 0) {
            popup_alert_content = (
                <Dialog
                    open={this.state.isOpen}
                    onClose={this.handleCloseAlert}
                >
                    <DialogHeader className={styles.alertHeader}>
                        <DialogTitle>
                            <span className={styles.alertHeaderText}>{getIEAlertBoxTitle()}</span>
                        </DialogTitle>
                        <Icon className={styles.alertHeaderIcon} name="warning"/>
                    </DialogHeader>
                    <DialogBody>
                        <span className={styles.alertBodyText}>{getIEAlertBoxBody()}</span>
                    </DialogBody>
                    <DialogFooter>
                        <Button className={styles.alertButton}
                                onClick={this.handleCloseAlert}
                        >
                            {getIEAlertButtonText()}
                        </Button>
                    </DialogFooter>
                </Dialog>
            );
        }

        return (
            <div>
                <Router history={hashHistory}>
                    {routes}
                </Router>
                {popup_alert_content}
            </div>
        )

    }

}

export default App;