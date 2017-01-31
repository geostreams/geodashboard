import React, {Component} from 'react';
import {RaisedButton, Dialog, FlatButton} from 'material-ui';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FileFileDownload from 'material-ui/svg-icons/file/file-download';
import styles from '../styles/downloadButton.css';

class DownloadButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    // handle Permalink panel
    handleOpenPermalink = () => {
        var link = this.buildLink("json");
        this.setState({open: true, link: link});
    };

    handleClosePermalink = () => {
        this.setState({open: false});
    };

    //convert a map object to url parameters
    serialize = function (obj) {
        var str = [];
        for (var p in obj)
            if (obj.hasOwnProperty(p)) {
                if (Array.isArray(obj[p])) {
                    for (var a in obj[p]) {
                        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p][a]));
                    }
                } else {
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                }
            }
        return str.join("&");
    };

    buildLink = function (type) {

        var downloadApi = this.props.api + "/api/geostreams/datapoints?";
        // refer to https://opensource.ncsa.illinois.edu/bitbucket/projects/CATS/repos/clowder/browse/app/api/Geostreams.scala#665
        var params = {};
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

            //TODO: Needs Update when setting up the lakes
            //params["geocode"] = this.props.location;
            // a config file like: https://opensource.ncsa.illinois.edu/bitbucket/projects/GEOD/repos/seagrant/browse/config/areas.js
        }

        var link = this.serialize(params);
        console.log(link);

        return downloadApi + link;
    };

    onDownload = (type) => {
        var link = this.buildLink(type);
        window.open(link);
    };

    handleDownloadOption = (value) => {
        this.setState({
            openMenu: value,
        });
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClosePermalink}
            />
        ];

        // don't use a-href download for Download as CSV/JSON, otherwise buildLink
        // will be executed as the page loading, instead of onClick
        return (
            <div className={styles.buttonstyle}>
                <Dialog
                    title="Permalink"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClosePermalink}
                >
                    <a href={this.state.link}/> {this.state.link}
                </Dialog>
                <RaisedButton className={styles.raisedbuttonstyle}
                              label="Download as CSV"
                              onClick={this.onDownload.bind(this, "csv")}
                />

                <RaisedButton className={styles.iconbuttonstyle}>
                    <IconMenu
                        iconButtonElement={<IconButton><FileFileDownload /></IconButton>}
                        open={this.state.openMenu}
                        onRequestChange={this.handleDownloadOption}
                    >
                        <MenuItem value="1" primaryText="Download as JSON"
                                  onClick={this.onDownload.bind(this, "json")}
                        />
                        <MenuItem value="2" primaryText="Permalink"
                                  onTouchTap={this.handleOpenPermalink}
                        />
                    </IconMenu>
                </RaisedButton>
            </div>
        );
    }
}

export default DownloadButtons
