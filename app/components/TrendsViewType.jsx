/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {Radio, RadioGroup,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions
} from 'react-mdc-web';


class TrendsViewType extends Component {

    state: {
        chosenViewType: Object,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            chosenViewType: this.props.trends_defaults[2].id,
        };
    }

    handleViewTypeChange = (event: Object) => {
        this.setState({chosenViewType: event.target.value});
        this.props.onSelectTrendsViewType(event.target.value);
    };

    render() {

        let return_item;

        let trendsPageSettings = this.props.trends_view_types;

        let trendsPageViewTypes = [];
        let trendsPageViewTypesMap = [];
        if (trendsPageSettings) {
            trendsPageViewTypesMap = trendsPageSettings
                .map(r => <Radio id={r.title} value={r.id}
                                 key={r.id}> {r.title}</Radio>);
        }
        trendsPageViewTypes = trendsPageViewTypes.concat(trendsPageViewTypesMap);
        if (trendsPageViewTypesMap.length == 0) {
            trendsPageViewTypes = [<Radio id="9999" value="9999" key="9999"
                                          disabled={true}> None Available </Radio>];
        }

        return_item=(
            <Card className={trendsStyles.cardMargin}>
                <CardHeader>
                    <CardTitle>
                        Select View Type
                    </CardTitle>
                    <CardSubtitle>
                        Select to view by Sensor or Region
                    </CardSubtitle>
                </CardHeader>
                <CardActions>
                    <RadioGroup name="viewtype"
                                value={this.state.chosenViewType.toString()}
                                onChange={this.handleViewTypeChange.bind(this)}>
                        {trendsPageViewTypes}
                    </RadioGroup>
                </CardActions>
            </Card>
        );

        return return_item;

    }

}

export default TrendsViewType;
