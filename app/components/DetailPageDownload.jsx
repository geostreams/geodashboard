/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button} from 'react-mdc-web';
import {getDownloadButtonPath} from '../utils/getConfig';
import {intersectArrays, serialize} from '../utils/arrayUtils';
import styles from '../styles/detail.css';


class DetailPageDownload extends Component {
    constructor(props: Object) {
        super(props);
    }

    buildLink(type: string): string {
        let downloadApi = this.props.api + getDownloadButtonPath();
        downloadApi += ("sensor_id=" + this.props.sensor_id + '&');

        // refer to https://opensource.ncsa.illinois.edu/bitbucket/projects/CATS/repos/clowder/browse/app/api/Geostreams.scala#665
        let params = {};
        params["format"] = type;

        if (this.props.selected_parameters.length > 0) {
            let parametersToSearch = Object.assign([], this.props.selected_parameters);
            const multiParameters =
                intersectArrays(Object.keys(window.configruntime.gd3.multi_parameter_map), this.props.selected_parameters);
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
        console.log(link);
        return downloadApi + link;
    }

    onDownload(type: string)  {
        let link = this.buildLink(type);
        window.open(link);
    }

    render() {
        let disabled = true;
        if (this.props.selected_parameters && this.props.selected_parameters.length > 0) {
            disabled = false;
        }

        return (
            <div className={styles.detailDownloadButtonPosition}>
                <Button className={disabled === false ? styles.detailDownloadButton: ''}
                        onClick={this.onDownload.bind(this, "csv")}
                        raised disabled={disabled}>
                    <span className={disabled === false ? styles.detailDownloadButtonText: ''}>Download</span>
                </Button>
            </div>
        );
    }
}

DetailPageDownload.propTypes = {
    api: PropTypes.string.isRequired,
    selected_parameters: PropTypes.array,
    id: PropTypes.number,
    selected_start_date: PropTypes.instanceOf(Date),
    selected_end_date: PropTypes.instanceOf(Date)
};

export default DetailPageDownload;
