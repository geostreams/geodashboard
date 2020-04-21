/*
 * @flow
 */

import React, {Component} from 'react';
import {Router, Route, hashHistory} from 'react-router';
import Welcome from '../pages/Welcome';
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
    <Route component={LandingApp}>
        <Route path="/" component={Welcome}/>
    </Route>
);

class LandingApp extends Component {

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

export default LandingApp;