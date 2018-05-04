import React, {Component} from 'react';
import MiniMap from '../components/MiniMap';
import { Grid, Row, Col } from 'react-flexbox-grid';
import styles from "../styles/detail.css";
import {getMobileSizeMax, getMobileExplorePath} from '../utils/getConfig';
import {Dialog, DialogBody, DialogHeader, DialogTitle, Icon} from 'react-mdc-web';
import {Link} from 'react-router';


class DetailPageContents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openInfoButton: false
        };
        (this:any).handleInfoIcon = this.handleInfoIcon.bind(this);
    }

    handleInfoIcon(button_status: boolean) {
        this.setState({
            openAboutButton: button_status
        });
    };

    render() {
        let sensor = this.props.sensorInfo;
        let headerValue = '', miniMapObject= '';

        if (sensor) {
            headerValue = <h1>{sensor.properties.popupContent}</h1>;

            let center = sensor.geometry.coordinates.slice(0, 2);
            if (screen.width > getMobileSizeMax()) {
                miniMapObject = (
                    <Row key="miniMap" className={styles.parameters_list}>
                        <MiniMap sensor={sensor} center={center}/>
                    </Row>
                );
            }
        }

        if (screen.width <= getMobileSizeMax()) {
            headerValue = (
                <h1><Link href={getMobileExplorePath()}>Explore</Link><span> > {this.props.sensorName}</span></h1>
            );
        }

        return (
            <Grid fluid>
                <Dialog open={Boolean(this.state.openAboutButton)}
                        onClose={()=>{this.setState({openAboutButton:false})}}>
                    <DialogHeader >
                        <DialogTitle>Selecting Chart Parameters</DialogTitle>
                        <a className={styles.close_button_style}
                           onClick={()=>{this.setState({openAboutButton: false})}}>
                            <Icon name="close"/>
                        </a>
                    </DialogHeader>
                    <DialogBody scrollable>
                        {this.props.paramInfoText}
                    </DialogBody>
                </Dialog>
                <Row key="header">{headerValue}</Row>
                <Row key="pageContents" around="xs">
                    <Col md={3}>
                        <Row key="paramTitle" className={styles.parameters_list} >
                            <h3>Selected Parameters</h3>
                            <a className={styles.open_button_style}
                               onClick={this.handleInfoIcon}>
                                <Icon name="info"/>
                            </a>
                        </Row>
                        <Row key="paramList" className={styles.parameters_list} >
                            <div>
                                {this.props.paralist}
                            </div>
                        </Row>
                        {miniMapObject}
                    </Col>
                    <Col md={8}>
                        <Row key="paramChartTitle" className={styles.parameters_chart_title} >
                            <h3>Parameter Charts</h3>{this.props.paramChartsInfoText}
                        </Row>
                        <Row className={styles.parameters_chart_positioning}>
                            {this.props.charts}
                        </Row>
                    </Col>
                </Row>
            </Grid>

        );
    }
}

export default DetailPageContents;
