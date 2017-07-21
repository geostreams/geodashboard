/*
 * @flow
 */
import React, {Component, PropTypes} from 'react';
import {
    Button,
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    Icon,
    Menu,
    MenuItem,
    MenuAnchor
} from 'react-mdc-web';
import {getCustomLocation} from '../utils/getConfig';
import styles from '../styles/downloadButton.css';
import type {MapOfStrings} from '../utils/flowtype';

type DownloadStateType = {
    isOpen: boolean,
    link: string,
    openMenu: ? boolean
};

class DownloadButtons extends Component {
    state: DownloadStateType;

    constructor(props: Object) {
        super(props);
        this.state = {
            isOpen: false,
            link: "",
            openMenu: false
        };
    }

    // handle Permalink panel
    handleOpenPermalink = () => {
        let link: string = this.buildLink("json");
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

        let downloadApi = this.props.api + "/api/geostreams/datapoints?";
        // refer to https://opensource.ncsa.illinois.edu/bitbucket/projects/CATS/repos/clowder/browse/app/api/Geostreams.scala#665
        let params = {};
        params["format"] = type;
        params["since"] = this.props.selectedStartDate.toISOString().slice(0, 10);
        params["until"] = this.props.selectedEndDate.toISOString().slice(0, 10);

        if (this.props.selectedDataSources.length > 0) {
            params["sources"] = this.props.selectedDataSources;
        }
        if (this.props.selectedParameters.length > 0) {
            params["attributes"] = this.props.selectedParameters;
        }

        if (this.props.selectedLocation !== null) {

            let draw_area = this.props.drawShapeCoordinates;

            if (draw_area.length > 0) {

                params["geocode"] = draw_area[0].map(function (coordinate) {
                    return [coordinate[1], coordinate[0]]
                }).join(",");

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

    handleDownloadOption = (value: boolean) => {
        this.setState({
            openMenu: value,
        });
    };

    render() {

        // don't use a-href download for Download as CSV/JSON, otherwise buildLink
        // will be executed as the page loading, instead of onClick
        return (
            <div>
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


                <Button raised
                        onClick={this.onDownload.bind(this, "csv")}
                > Download Data </Button>

                <Button onClick={() => {
                    this.setState({openMenu: true})
                }}>
                    <Icon name="get_app"/>
                </Button>
                <MenuAnchor>
                    <Menu bottom open={this.state.openMenu} onClose={() => {
                        this.setState({openMenu: false})
                    }}>
                        <MenuItem value="1" onClick={this.onDownload.bind(this, "json")}>
                            Download as JSON
                        </MenuItem>
                        <MenuItem value="2" onClick={this.handleOpenPermalink}>
                            Permalink
                        </MenuItem>
                    </Menu>
                </MenuAnchor>

            </div>
        );
    }
}

export default DownloadButtons
