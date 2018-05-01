import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import DataGraph from '../containers/DataGraph';
import DataGraphMultiLine from '../containers/DataGraphMultiLine';
import styles from '../styles/main.css';
import {getMobileSizeMax, getShowDetailTabs} from "../utils/getConfig";
import DetailTabs from '../components/DetailTabs';

class Detail extends Component {
    render() {

        let display_tabs = '';
        let graph = '';

        if (this.props.params.chart_type === 'separate') {
            if (getShowDetailTabs() === true && screen.width > getMobileSizeMax()) {
                display_tabs = <DetailTabs sensorName={this.props.params.name} detail='separate'/>
            }
            graph = <DataGraph sensorName={this.props.params.name}/>;
        }

        if (this.props.params.chart_type === 'combined') {
            if (getShowDetailTabs() === true) {
                display_tabs = <DetailTabs sensorName={this.props.params.name} detail='combined'/>
            }
            graph = <DataGraphMultiLine sensorName={this.props.params.name}/>;
        }

        let page_content = (
            <div>
                <Menu selected='explore'/>
                {display_tabs}
                <div className={styles.content}>
                    {graph}
                </div>
            </div>
        );

        return (page_content);

    }
}

export default Detail;