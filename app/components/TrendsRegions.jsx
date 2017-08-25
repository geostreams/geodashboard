/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {
    Radio, RadioGroup,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions
} from 'react-mdc-web';


class TrendsRegions extends Component {

    constructor(props: Object) {
        super(props);
    }

    handleRegionChange = (event: Object) => {
        this.props.onSelectTrendsRegion(event.target.value, this.props.trends_page, this.props.trends_view_type);
    };


    render() {

        let trendsPageSettings = this.props.trends_regions;
        let trendsPageRegions = [];
        let trendsPageRegionsMap = [];
        let return_item;

        return_item = (
            <Card className={trendsStyles.cardMargin}>
            </Card>
        );


        if (trendsPageSettings) {
            trendsPageRegionsMap = trendsPageSettings
                .map(r => <Radio id={r.properties.id} value={r.properties.id}
                                 key={r.properties.id}> {r.properties.title}</Radio>);
        }
        trendsPageRegions = trendsPageRegions.concat(trendsPageRegionsMap);
        if (trendsPageRegionsMap.length == 0) {
            trendsPageRegions = [<Radio id="9999" value="9999" key="9999"
                                        disabled={true}> None Available </Radio>];
        }


        if (trendsPageRegions.length != 0) {

            return_item = (
                <Card className={trendsStyles.cardMargin}>
                    <CardHeader>
                        <CardTitle>
                            Select Region
                        </CardTitle>
                        <CardSubtitle>
                            Region to Explore
                        </CardSubtitle>
                    </CardHeader>
                    <CardActions>
                        <RadioGroup name="regions"
                                    value={this.props.chosenRegion.toString()}
                                    onChange={this.handleRegionChange.bind(this)}>
                            {trendsPageRegions}
                        </RadioGroup>
                    </CardActions>
                </Card>
            );

        }

        return return_item;

    }

}

export default TrendsRegions;
