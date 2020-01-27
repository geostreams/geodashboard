import React, {Component} from 'react';
import exploreStyles from '../styles/explore.css';
import {Button, Card, CardTitle, CardSubtitle, CardHeader, CardText, Fab, Icon} from 'react-mdc-web/lib';
import {getColor, displayOnlineStatus} from '../utils/getConfig';
import {applyColors} from '../utils/colorUtils';
import ol from 'openlayers';


class ExploreAccordionSections extends Component {
    constructor(props: Object) {
        super(props);
        this.state = {
            inner_accordion_icon: false,
        };
        (this: any).clickSensor = this.clickSensor.bind(this);
        (this: any).clickedInnerAccordion = this.clickedInnerAccordion.bind(this);
    }

    clickedInnerAccordion() {
        this.setState({inner_accordion_icon: !this.state.inner_accordion_icon});
    }

    clickSensor(id, name, coordinates, e) {
        this.props.selectSensor(id, name, coordinates.slice(0, 2));
    };

    render() {

        let contents = [];
        let item_pills = [];

        let source_data = this.props.sourceData;

        source_data.map(data => {

            let trim_length = 6;
            let longer_name = '';

            // Online and Offline Stations if option present on the Sensor
            let borderStyle = 'none';
            let statusColor = 'white';
            if (displayOnlineStatus() === true) {
                if (data.properties.online_status === "online") {
                    borderStyle = 'solid 0.3em';
                    statusColor = 'green';
                    trim_length = 5;
                }

                if (data.properties.online_status === "offline") {
                    borderStyle = 'dashed';
                    statusColor = 'red';
                    trim_length = 5;
                }
            }

            if (data.name.length >= trim_length) {
                longer_name = '...';
            }

            let lonLatPoint = [data.geometry.coordinates[0], data.geometry.coordinates[1]];
            let webMercatorPoint = ol.proj.fromLonLat(lonLatPoint);

            //change colors of pills according to state
            let color = getColor(data.properties.type.id);

            if (this.props.selectedSensorID !== data.id) {
                color = applyColors(["000000", color], [0.03, 0.1]);
            }

            let help_text = data.properties.name;
            if (data.properties.name !== data.properties.popupContent) {
                help_text += " - " + data.properties.popupContent;
            }
            let button_label = data.properties.name.substring(0, trim_length).trim().replace("-", "_").replace(" ", "_");
            if (this.state.inner_accordion_icon) {

                // Move Popup slightly when clicking the Accordion Icons
                webMercatorPoint[0] = webMercatorPoint[0] + 1500;
                webMercatorPoint[1] = webMercatorPoint[1] + 20000;
                item_pills.push(
                    <Button key={data.id} className={exploreStyles.exploreButton}
                            style={{backgroundColor: color, border: borderStyle, borderColor: statusColor}}
                            id={data.id} title={help_text}
                            onClick={() => {
                                this.clickSensor(data.id, data.name, webMercatorPoint)
                            }}>
                            <span className={exploreStyles.exploreButtonText}>
                                {button_label}{longer_name}
                            </span>
                    </Button>
                )
            } else {
                item_pills = '';
            }

        });

        let color = getColor(this.props.sourceId);
        color = applyColors(["000000", color], [0.05, 0.2]);
        contents.push(
            <div key={this.props.id}>
                <div onClick={() => {
                    this.clickedInnerAccordion()
                }}>
                    <div style={{backgroundColor: color}}>
                            <span data-tooltip={this.props.tooltipVal} className={exploreStyles.regionLabel}>
                                {this.props.sectionLabel}
                            </span>
                        <span className={exploreStyles.regionCount}>
                                ({source_data.length})
                                <Icon className={"material-icons " + exploreStyles.accordionIcon}
                                      name={this.state.inner_accordion_icon ? 'expand_more' : 'chevron_right'}
                                />
                            </span>
                    </div>
                </div>
                <div className={exploreStyles.sectionPills}>{item_pills}</div>
            </div>
        );

        return (
            <div>{contents}</div>
        );

    }
}

export default ExploreAccordionSections;