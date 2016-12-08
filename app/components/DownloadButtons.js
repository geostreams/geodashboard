import React, {Component} from 'react';
import {RaisedButton, Dialog, FlatButton} from 'material-ui';

class DownloadButtons extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }
    // handle Permalink panel
    handleOpen = () => {
        var link = this.buildLink("json");
        this.setState({open: true, link: link});
    };

    handleClose = () => {
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

        //TODO: Needs Update when setting up the lakes
        //Add lake


        var link = this.serialize(params);
        console.log(link);

        return downloadApi + link;
    };

    onDownload = (type) => {
        var link = this.buildLink(type);
        window.open(link);
    };

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onTouchTap={this.handleClose}
            />
        ];

        // don't use a-href download for Download as CSV/JSON, otherwise buildLink will be executed as the page loading,
        // instead of onClick
        return (
            <div>
                <RaisedButton label="Download as CSV" onClick={this.onDownload.bind(this, "csv")}/>
                <RaisedButton label="Download as JSON" onClick={this.onDownload.bind(this, "json")}/>
                <RaisedButton label="Permalink" onTouchTap={this.handleOpen}/>
                <Dialog
                    title="Permalink"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    <a href={this.state.link}/> {this.state.link}
                </Dialog>

            </div>
        );
    }
}

export default DownloadButtons
