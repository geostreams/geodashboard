/*
 * @flow
 */

import React, {Component} from 'react';
import LineChartWithDeviations from '../containers/LineChartWithDeviations';

class TrendsDataGraph extends Component {

    constructor(props: Object) {
        super(props);
    }

    componentWillMount() {
        const {loadDetailSensor} = this.props;
        loadDetailSensor(this.props.selectedParameter, this.props.selectedSeason, this.props.trends_region);

    }

    render() {
        return (
            <LineChartWithDeviations
                trends_settings={this.props.trends_settings}
                trends_region_name={this.props.trends_region_name}
                trends_region={this.props.trends_region}
            />
        );
    }

}

export default TrendsDataGraph