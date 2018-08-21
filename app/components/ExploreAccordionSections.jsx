import React, {Component} from 'react';
import exploreStyles from '../styles/explore.css';
import {Button, Card, CardTitle, CardSubtitle, CardHeader, CardText, Fab, Icon} from 'react-mdc-web';
import {getColor} from '../utils/getConfig';
import ol from 'openlayers';


class ExploreAccordionSections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inner_accordion_icon: false,
        };
        (this:any).clickSensor = this.clickSensor.bind(this);
        (this:any).clickedInnerAccordion = this.clickedInnerAccordion.bind(this);
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

            let lonLatPoint = [data.geometry.coordinates[0], data.geometry.coordinates[1]];
            let webMercatorPoint = ol.proj.fromLonLat(lonLatPoint);

            let color = getColor(data.properties.type.id);
            if (this.props.selectedSensorID !== data.id) {
                // Add opacity to the HEX color (50%)
                color = color + '80';
            }

            let longer_name = '';
            if (data.name.length >= 6) {
                longer_name = '...';
            }
            let help_text = data.properties.name;
            if(data.properties.name !== data.properties.popupContent) {
                help_text += " - " + data.properties.popupContent;
            }
            let button_label = data.properties.name.substring(0, 6).trim().replace("-", "_").replace(" ", "_");
            if (this.state.inner_accordion_icon) {
                item_pills.push(
                    <Button key={data.id} className={exploreStyles.exploreButton}
                            style={{backgroundColor: color}} id={data.id} title={help_text}
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
            // Add opacity to the HEX color (75%)
            color = color + 'BF';

            contents.push(
                <div key={this.props.id}>
                    <div onClick={() => {this.clickedInnerAccordion()}}>
                        <div style={{backgroundColor: color}}>
                            <span data-tooltip={this.props.tooltipVal} className={exploreStyles.regionLabel}>
                                {this.props.sectionLabel}
                            </span>
                            <span className={exploreStyles.regionCount}>
                                ({source_data.length})
                                <Icon className={"material-icons " + exploreStyles.accordionIcon}
                                      name={this.state.inner_accordion_icon ? 'expand_less' : 'expand_more'}
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
