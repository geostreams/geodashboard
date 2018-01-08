/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    Button, Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter,
    Icon, Menu, MenuItem, MenuAnchor
} from 'react-mdc-web';
import {getCustomLocation} from '../utils/getConfig';
import styles from '../styles/downloadButton.css';


type DownloadStateType = {
    isOpen: boolean,
    link: string,
};

class DownloadButtons extends Component {
    state: DownloadStateType;

    constructor(props: Object) {
        super(props);
        this.state = {
            isOpen: false,
            link: "",
        };
    }

    // handle Permalink panel
    handleOpenPermalink = () => {
        let link: string = this.buildLink("csv");
        this.setState({isOpen: true, link: link});
    };

    handleClosePermalink = () => {
        this.setState({isOpen: false});
    };

    //convert a map object to url parameters
    serialize = function (obj: Object): string {
        let str = [];
        for (let p in obj)
            if (obj.hasOwnProperty(p)) {
                if (Array.isArray(obj[p])) {
                    for (let a in obj[p]) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p][a]));
                    }
                } else {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
        return str.join("&");
    };

    buildLink = function (type: string): string {

        let downloadApi = this.props.api.slice(0, -8) + "/geostreams/datapoints/download?";
        // refer to https://opensource.ncsa.illinois.edu/bitbucket/projects/CATS/repos/clowder/browse/app/api/Geostreams.scala#665
        let params = {};
        params["format"] = type;
        if(this.props.selectedFilters.indexOf("time") > -1) {
            if(this.props.selectedStartDate != null && this.props.selectedStartDate !== "") {
	            params["since"] = this.props.selectedStartDate.toISOString().slice(0, 10);
	            // Having until without since doesn't make much sense.
	            if(this.props.selectedEndDate != null && this.props.selectedEndDate !== ""){
		            params["until"] = this.props.selectedEndDate.toISOString().slice(0, 10);
	            }
            }

        }

        if (this.props.selectedDataSources.length > 0) {
            params["sources"] = this.props.selectedDataSources;
        }
        if (this.props.selectedParameters.length > 0) {
            params["attributes"] = this.props.selectedParameters;
        }

        if (this.props.selectedLocation !== null) {

            // Get the Drawn Shape Coordinates if they exist
            let draw_area = this.props.drawShapeCoordinates;

            // For a Drawn Circle
            if (draw_area.length == 1) {

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

        let link = this.serialize(params);
        console.log(link);

        return downloadApi + link;
    };

    onDownload = (type: string) => {
        let link = this.buildLink(type);
        window.open(link);
    };

    render() {

        let numSensors = this.props.availableSensors.length;
        let disabled = true;
        if(this.props.selectedParameters.length > 0 || this.props.selectedDataSources.length > 0
            || this.props.selectedLocation !== null ||
            (this.props.selectedStartDate !== null && this.props.selectedStartDate !== "")) {
            disabled = false;
        }

        // don't use a-href download for Download as CSV/JSON, otherwise buildLink
        // will be executed as the page loading, instead of onClick
        return (
            <div className={styles.bottomSection}>
                <Dialog
                    open={this.state.isOpen}
                    onClose={this.handleClosePermalink}
                >
                    <DialogHeader>
                        <DialogTitle>Permalink</DialogTitle>
                    </DialogHeader>
                    <DialogBody>
                        <a href={this.state.link}/> {this.state.link}
                    </DialogBody>
                    <DialogFooter>
                        <Button
                            primary
                            onClick={this.handleClosePermalink}
                        > Close </Button>
                    </DialogFooter>
                </Dialog>

                <Button raised primary disabled={disabled}
                        onClick={this.onDownload.bind(this, "csv")}
                >
                    Download
                </Button>

                <Button className={styles.button} raised disabled={disabled}  onClick={this.handleOpenPermalink}>
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
    api: React.PropTypes.string.isRequired,
    selectedStartDate: React.PropTypes.string,
    selectedEndDate: React.PropTypes.string,
    selectedParameters: React.PropTypes.array,
    selectedFilters: React.PropTypes.array,
    availableSensors: React.PropTypes.array,
    selectedLocation: React.PropTypes.string,
    drawShapeCoordinates: React.PropTypes.array,
    selectedDataSources: React.PropTypes.array
};

export default DownloadButtons
