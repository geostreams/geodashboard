/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button, Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter, Icon
} from 'react-mdc-web/lib';
import {
    getDownloadButtonPath, getDownloadMessageText, getUseDownloadMessageText
} from '../utils/getConfig';
import {intersectArrays, serialize} from '../utils/arrayUtils';
import styles from '../styles/detail.css';
import stylesMain from '../styles/main.css';


class DetailPageDownload extends Component {
    state: {
        downloadIsOpen: boolean,
        displayErrorMessage: boolean
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            downloadIsOpen: false,
            displayErrorMessage: false
        };
        (this: any).handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    handleCloseAlert() {
        this.setState({displayErrorMessage: false})
    };

    buildLink(type: string): string {
        let downloadApi = this.props.api + getDownloadButtonPath();
        downloadApi += ("sensor_id=" + this.props.sensor_id + '&');

        let params = {};
        params["format"] = type;

        if (this.props.selected_parameters.length > 0) {
            let parametersToSearch = Object.assign([], this.props.selected_parameters);
            const multiParameters =
                intersectArrays(Object.keys(this.props.multi_param_map), this.props.selected_parameters);
            multiParameters.map((parameter) =>
                window.configruntime.gd3.multi_parameter_map[parameter].map((alternate) => {
                    parametersToSearch.push(alternate);
                })
            );
            params["attributes"] = parametersToSearch;
        }
        params["since"] = this.props.selected_start_date.toISOString().slice(0, 10);
        params["until"] = this.props.selected_end_date.toISOString().slice(0, 10);

        let link = serialize(params);
        return downloadApi + link;
    }

    // handle Download panel
    handleOpenDownload = () => {
        this.setState({
            downloadIsOpen: true
        });
    };

    handleCloseDownload = () => {
        this.setState({
            downloadIsOpen: false
        });
    };

    onDownload(type: string) {
        this.setState({downloadIsOpen: false});
        try {
            let link = this.buildLink(type);
            window.open(link);
        } catch (e) {
            this.setState({displayErrorMessage: true});
        }
    }

    render() {
        let disabled = true;
        if (this.props.selected_parameters && this.props.selected_parameters.length > 0) {
            disabled = false;
        }

        let popup_alert_content = '';
        if (this.state.displayErrorMessage === true) {
            popup_alert_content = (
                <Dialog
                    open={this.state.displayErrorMessage}
                    onClose={this.handleCloseAlert}
                >
                    <DialogHeader className={stylesMain.alertHeader}>
                        <DialogTitle>
                            <span className={stylesMain.alertHeaderText}>DOWNLOAD ERROR</span>
                        </DialogTitle>
                        <Icon className={stylesMain.alertHeaderIcon} name="warning"/>
                    </DialogHeader>
                    <DialogBody>
                        <span className={stylesMain.alertBodyText}>
                            An ERROR occurred with Download - Please try again!
                        </span>
                    </DialogBody>
                    <DialogFooter>
                        <Button className={stylesMain.alertButton}
                                onClick={this.handleCloseAlert}
                        >
                            Close
                        </Button>
                    </DialogFooter>
                </Dialog>
            );
        }

        let downloadButtonValue = (
            <Button raised disabled={disabled} className={styles.button}
                    onClick={this.onDownload.bind(this, "csv")}
            >
                Download
            </Button>
        );

        if (getUseDownloadMessageText() === true) {
            downloadButtonValue = (
                <Button raised disabled={disabled} className={styles.button}
                        onClick={this.handleOpenDownload}
                >
                    Download
                </Button>
            )
        }

        return (
            <div className={styles.detailDownloadButtonPosition}>

                {popup_alert_content}

                <Dialog
                    open={this.state.downloadIsOpen}
                    onClose={this.handleCloseDownload}
                >
                    <DialogHeader>
                        <DialogTitle>Download</DialogTitle>
                    </DialogHeader>
                    <DialogBody scrollable={false}>
                        {getDownloadMessageText()}
                    </DialogBody>
                    <DialogFooter>
                        <Button raised disabled={disabled} className={styles.button}
                                onClick={this.onDownload.bind(this, "csv")}
                        >
                            Continue
                        </Button>
                        <Button onClick={this.handleCloseDownload}> Cancel </Button>
                    </DialogFooter>
                </Dialog>

                {downloadButtonValue}

            </div>
        );
    }
}

DetailPageDownload.propTypes = {
    api: PropTypes.string.isRequired,
    selected_parameters: PropTypes.array,
    id: PropTypes.number,
    selected_start_date: PropTypes.instanceOf(Date),
    selected_end_date: PropTypes.instanceOf(Date),
    multi_param_map: PropTypes.any
};

export default DetailPageDownload;
