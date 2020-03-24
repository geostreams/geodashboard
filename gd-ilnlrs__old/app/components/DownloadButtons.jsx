/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button, Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter, Icon
} from 'react-mdc-web/lib';
import {
    getCustomLocation, getDownloadButtonPath, getDownloadButtonPathCount, getDownloadMaxDatapointsAllowed,
    getGeneralDownloadErrorText, getDatapointsDownloadErrorText
} from '../utils/getConfig';
import {intersectArrays, serialize} from '../utils/arrayUtils';
import styles from '../styles/downloadButton.css';
import stylesMain from '../styles/main.css';
import Spinner from './Spinner';
import {intervalCounts} from "../utils/spinnerUtils";


type DownloadStateType = {
    isOpen: boolean,
    link: string,
    alertIsOpen: boolean,
    numDatapoints: number,
    loading: boolean,
    loading_time: number,
    error_text: string
};

class DownloadButtons extends Component {
    state: DownloadStateType;

    constructor(props: Object) {
        super(props);
        this.state = {
            isOpen: false,
            link: "",
            alertIsOpen: false,
            numDatapoints: this.props.numberPoints,
            loading: false,
            loading_time: 0,
            error_text: ''
        };
        (this: any).handleCloseAlert = this.handleCloseAlert.bind(this);
    }

    handleCloseAlert() {
        this.setState({alertIsOpen: false})
    };

    // handle Permalink panel
    handleOpenPermalink = () => {
        this.setState({loading: true});
        this.countDatapoints().then((numberDatapoints) => {
            this.setState({
                loading: false,
                numDatapoints: Number(numberDatapoints)
            });
            if (this.state.numDatapoints <= getDownloadMaxDatapointsAllowed()) {
                let link: string = this.buildLink("csv");
                this.setState({
                    alertIsOpen: false,
                    isOpen: true,
                    link: link,
                });
            } else {
                this.setState({
                    alertIsOpen: true,
                    isOpen: false,
                    error_text: getDatapointsDownloadErrorText()
                });
            }
        });
    };

    handleClosePermalink = () => {
        this.setState({isOpen: false});
    };

    buildLink = function (type: string): string {

        let downloadApi;

        let params = {};
        if (type !== 'None') {
            params["format"] = type;
            downloadApi = this.props.api + getDownloadButtonPath();
        } else {
            downloadApi = this.props.api + getDownloadButtonPathCount();
        }
        if (this.props.selectedFilters.indexOf("time") > -1) {
            if (this.props.selectedStartDate !== null && this.props.selectedStartDate !== "") {
                params["since"] = this.props.selectedStartDate.toISOString().slice(0, 10);
                // Having until without since doesn't make much sense.
                if (this.props.selectedEndDate !== null && this.props.selectedEndDate !== "") {
                    params["until"] = this.props.selectedEndDate.toISOString().slice(0, 10);
                }
            }

        }

        if (this.props.selectedDataSources.length > 0) {
            params["sources"] = this.props.selectedDataSources;
        }
        let {multi_parameter_map} = this.props;
        if (this.props.selectedParameters.length > 0) {
            let parametersToSearch = Object.assign([], this.props.selectedParameters);
            const multiParameters = intersectArrays(Object.keys(multi_parameter_map), this.props.selectedParameters);
            multiParameters.map((parameter) =>
                multi_parameter_map[parameter].map((alternate) => {
                    parametersToSearch.push(alternate);
                })
            );
            params["attributes"] = parametersToSearch;
        }

        if (this.props.selectedLocation !== null) {

            // Get the Drawn Shape Coordinates if they exist
            let draw_area = this.props.drawShapeCoordinates;

            // For a Drawn Circle
            if (draw_area.length === 1) {

                params["geocode"] = draw_area.map(function (coordinate) {
                    return [coordinate[1], coordinate[0], coordinate[2]]
                }).join(",");

            // For a Drawn Polygon
            } else if (draw_area.length > 1) {

                params["geocode"] = draw_area[0].map(function (coordinate) {
                    return [coordinate[1], coordinate[0]]
                }).join(",");

            // For a Predefined Location
            } else {

                const area = getCustomLocation(this.props.selectedLocation);

                if (area && area.geometry) {
                    params["geocode"] = area.geometry.coordinates[0].map(function (coordinate) {
                        // swap coordinate
                        return [coordinate[1], coordinate[0]]
                    }).join(",");
                }
            }
        }

        let link = serialize(params);
        console.log(link);

        return downloadApi + link;

    };

    componentDidUpdate(newProps: Object, oldState: Object) {
        // Make sure the State updates appropriately
        if (oldState.numDatapoints !== newProps.numberPoints) {
            this.setState({numDatapoints: this.props.numberPoints});
        }
    }

    countDatapoints() {
        const that = this;
        let countLink = this.buildLink("None") + '&onlyCount=true';
        this.props.onSelectDownload(countLink);

        return (
            intervalCounts(
                that.state.numDatapoints, that.props.show_spinner
            )
        );
    }

    onDownload(type: string) {
        this.setState({loading: true});
        this.countDatapoints().then((numberDatapoints) => {
            this.setState({
                loading: false,
                numDatapoints: Number(numberDatapoints)
            });
            if (this.state.numDatapoints <= getDownloadMaxDatapointsAllowed()) {
                // Download the CSV File
                try {
                    let link = this.buildLink(type);
                    window.open(link);
                } catch (e) {
                    this.setState({
                        alertIsOpen: true,
                        error_text: getGeneralDownloadErrorText()
                    });
                }
            } else {
                this.setState({
                    alertIsOpen: true,
                    error_text: getDatapointsDownloadErrorText()
                });
            }
        });
    }

    render() {

        if (this.state.loading) {
            return (
                <div>
                    <Spinner loading_time_text={true}/>
                </div>
            );
        }

        let numSensors = this.props.showSensors.length;
        let disabled = true;
        if (
            (this.props.selectedParameters.length > 0 || this.props.selectedDataSources.length > 0
                || this.props.selectedLocation !== null ||
                (this.props.selectedStartDate !== null && this.props.selectedStartDate !== "")) &&
            numSensors !== 0
        ) {
            disabled = false;
        }

        let popup_alert_content = '';
        if (this.state.alertIsOpen === true) {
            popup_alert_content = (
                <Dialog
                    open={this.state.alertIsOpen}
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
                            {this.state.error_text}
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

        // don't use a-href download for Download as CSV/JSON, otherwise buildLink
        // will be executed as the page loading, instead of onClick
        return (
            <div className={styles.bottomSection}>

                {popup_alert_content}
                <Dialog
                    open={this.state.isOpen}
                    onClose={this.handleClosePermalink}
                >
                    <DialogHeader>
                        <DialogTitle>Permalink</DialogTitle>
                    </DialogHeader>
                    <DialogBody scrollable={true}>
                        <a href={this.state.link}/> {this.state.link}
                    </DialogBody>
                    <DialogFooter>
                        <Button onClick={this.handleClosePermalink}> Close </Button>
                    </DialogFooter>
                </Dialog>

                <Button raised disabled={disabled} className={styles.button}
                        onClick={this.onDownload.bind(this, "csv")}
                >
                    Download
                </Button>

                <Button className={styles.buttonPermalink} raised disabled={disabled}
                        onClick={this.handleOpenPermalink}>
                    Permalink
                </Button>

                <span className={styles.counterText}>
                    Sites: {numSensors}
                </span>

            </div>
        );

    }
}

DownloadButtons.propTypes = {
    api: PropTypes.string.isRequired,
    selectedStartDate: PropTypes.instanceOf(Date),
    selectedEndDate: PropTypes.instanceOf(Date),
    selectedParameters: PropTypes.array,
    selectedFilters: PropTypes.array,
    showSensors: PropTypes.array,
    selectedLocation: PropTypes.string,
    drawShapeCoordinates: PropTypes.array,
    selectedDataSources: PropTypes.array,
    numberPoints: PropTypes.number
};

export default DownloadButtons;
