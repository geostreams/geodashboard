/*
 * @flow
 */

import React, {Component} from 'react';
import {Link} from 'react-router';
import {Row, Col} from 'react-flexbox-grid';
import styles from "../styles/detail.css";
import mainStyles from '../styles/main.css'
import BoxAndWhiskers from '../components/BoxAndWhiskers';
import LinePlot from './LinePlot';
import LineNoData from './LineNoData';
import {
    Button, Dialog, DialogHeader, DialogTitle, DialogBody, DialogFooter, Icon
} from 'react-mdc-web/lib';
import {removeCharsIDs} from '../utils/graphUtils';


class Chart extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            displayDownload: false,
            openInfoButton: false
        };
        (this: any).handleOpenDownload = this.handleOpenDownload.bind(this);
        (this: any).handleCloseDownload = this.handleCloseDownload.bind(this);
    }

    state: {
        displayDownload: boolean,
        openInfoButton: boolean
    };

    handleCloseDownload() {
        this.setState({displayDownload: !this.state.displayDownload});
    };

    handleOpenDownload() {
        this.setState({displayDownload: !this.state.displayDownload});
    }

    render() {

        let chartData = '';
        let BAWValues = [];
        let boxAndWhiskers = [];
        let downloadDialog, downloadButton = '';
        const {units, title} = this.props;
        let values = [];
        let that = this;

        // Getting the datapoints for parameter: this.props.param
        if (this.props.sensorData[this.props.param]) {
            let sensor_data = this.props.sensorData[this.props.param];

            if (this.props.filterBySeason) {
                const selectedSeason = this.props.selectedSeason.length > 0 ? this.props.selectedSeason : "spring";
                sensor_data = sensor_data.filter(p => p.label.includes(selectedSeason))
            }

            sensor_data.map(function (d) {
                const bin_date = new Date(d.date);
                if (bin_date.getTime() > that.props.selectedStartDate.getTime() &&
                    bin_date.getTime() < that.props.selectedEndDate.getTime()) {
                    values.push({date: bin_date, average: d.average});
                    BAWValues.push(d.average);
                }
            });

            boxAndWhiskers.push(
                <BoxAndWhiskers key={title}
                                data={BAWValues}
                                startAtZero={this.props.startAtZero}
                />
            );
        }

        let sources = [];
        if (this.props.parameterSources) {
            sources = this.props.parameterSources[this.props.param];
        }

        if (values.length === 0) {
            values.push({date: new Date(0), average: 0});
            boxAndWhiskers = '';
            chartData = (
                <LineNoData data={values}
                            yAxisLabel={units}
                            title={title}
                />
            );
        } else {
            chartData = (
                <LinePlot data={values}
                          selectedStartDate={this.props.selectedStartDate}
                          selectedEndDate={this.props.selectedEndDate}
                          yAxisLabel={units}
                          displayLines={this.props.displayLines}
                          title={title}
                          sources={sources}
                          startAtZero={this.props.startAtZero}
                          sameTimeScale={this.props.sameTimeScale}
                          binType={this.props.binType}
                />
            );
            let buttonID = removeCharsIDs(title) + 'Download';
            let buttonHTML: any = document.getElementById(buttonID);
            let popupText = '';
            if (buttonHTML !== null) {
                if (buttonHTML.alt === undefined) {
                    popupText = '<div>No Data Available</div>';
                } else {
                    popupText = '<div>' + buttonHTML.alt + '</div>';
                }
            }
            let downloadFileName = buttonID + ".svg";

            let dialogName = "displayDownload" + buttonID;

            downloadButton = (
                <Button dense className={styles.downloadGraphButtonDialog}
                        key={dialogName} id={dialogName}
                        onClick={() => {
                            this.handleOpenDownload()
                        }}
                >
                    <div className={styles.downloadIcon}><Icon name="get_app"/></div>
                    <div className={styles.downloadText}>Download Chart</div>
                </Button>
            );

            downloadDialog = (
                <Dialog
                    open={this.state.displayDownload}
                    onClose={this.handleCloseDownload}
                >
                    <DialogHeader>
                        <DialogTitle>DOWNLOAD CHART</DialogTitle>
                    </DialogHeader>
                    <DialogBody>Download {title} Chart</DialogBody>
                    <DialogFooter>
                        <Button onClick={this.handleCloseDownload}>
                            Decline
                        </Button>
                        <Button>
                            <Link className={styles.downloadGraphButton} id={buttonID}
                                  download={downloadFileName} href="#"
                                  onClick={() => {
                                      let fileContent = popupText;
                                      let downloadLinkId = buttonID;
                                      let objUrl = null;
                                      if (objUrl !== null) {
                                          window.URL.revokeObjectURL(objUrl);
                                      }
                                      // The file data object for downloading
                                      let data = new Blob([fileContent], {type: 'image/svg+xml'});
                                      objUrl = window.URL.createObjectURL(data);
                                      // Add the data to the download
                                      let downloadLinkButton: any = document.getElementById(downloadLinkId);
                                      if (downloadLinkButton) {
                                          downloadLinkButton.href = objUrl;
                                      }
                                      this.handleCloseDownload();
                                  }}
                            >
                                Download
                            </Link>
                        </Button>
                    </DialogFooter>
                </Dialog>
            );
        }

        return (
            <Row className={mainStyles.fullWidth}>
                <Col md={10}>
                    <div className={styles.layout_style}>
                        <div className={styles.float_item_left}>
                            {downloadButton}
                            {chartData}
                            {downloadDialog}
                        </div>
                    </div>
                </Col>
                <Col md={2} className={styles.float_item_left}>
                    {boxAndWhiskers}
                </Col>
            </Row>
        )

    }
}

export default Chart;
