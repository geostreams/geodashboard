/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import trendsStyles from '../styles/trends.css';
import {
    Textfield, Cell, Grid,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions, CardText
} from 'react-mdc-web';
import {getMobileSizeMax} from '../utils/getConfig';
import Select from './material/Select';


class TrendsCalculationSettings extends Component {

    state: {
        baselinePeriod: number,
        rollingPeriod: number,
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            baselinePeriod: Number(''),
            rollingPeriod: Number(''),
        };
        (this:any).handleBaselineChange = this.handleBaselineChange.bind(this);
        (this:any).handleRollingChange = this.handleRollingChange.bind(this);
    }

    handleBaselineChange(event: Object) {
        let value = event.target.value;
        value = parseInt(value);
        this.setState({baselinePeriod: value});
        this.props.onSelectTrendsCalcBaselineSetting(value);
    }

    handleRollingChange(event: Object) {
        let value = event.target.value;
        value = parseInt(value);
        this.setState({rollingPeriod: value});
        this.props.onSelectTrendsCalcRollingSetting(value);
    }

    render() {

        let spacer;
        if (screen.width <= getMobileSizeMax()) {
            spacer = (<div><br/><br/></div>);
        }

        let trendsBaselineSettings = this.props.trends_baseline;
        let trendsBaseline = [<option value={'none'} key={0}>Baseline (yr)</option>];
        let trendsBaselineValue = [];
        let baseline = '';
        let trendsRollingSettings = this.props.trends_rolling;
        let trendsRollingValue = [];
        let trendsRolling = [<option value={'none'} key={0}>Rolling (yr)</option>];
        let rolling = '';
        
        for (let i = 0; i < trendsBaselineSettings.length; i++) {
            baseline = trendsBaselineSettings[i];
            trendsBaselineValue = (
                <option value={baseline.value} key={baseline.value} id={baseline.id}>
                    {baseline.title} 
                </option>
            );
            trendsBaseline = trendsBaseline.concat(trendsBaselineValue);
        }

        for (let i = 0; i < trendsRollingSettings.length; i++) {
            rolling = trendsRollingSettings[i];
            trendsRollingValue = (
                <option value={rolling.value} key={rolling.value} id={rolling.id}>
                    {rolling.title}
                </option>
            );
            trendsRolling = trendsRolling.concat(trendsRollingValue);
        }
        
        return (
            <Card className={trendsStyles.cardMargin} key="calculate">
                <CardHeader>
                    <CardTitle>Change Calculation Setting</CardTitle>
                    <CardSubtitle>{window.configruntime.gd3.calculation_subtitle}</CardSubtitle>
                </CardHeader>
                {spacer}
                <CardText>
                    <Grid>
                        <Cell col={6}>
                            <Select className={trendsStyles.select}
                                    value={this.state.baselinePeriod.toString()}
                                    onChange={this.handleBaselineChange}
                            >
                                {trendsBaseline}
                            </Select>
                        </Cell>

                        <Cell col={6}>
                            <Select className={trendsStyles.select}
                                    value={this.state.rollingPeriod.toString()}
                                    onChange={this.handleRollingChange}
                            >
                                {trendsRolling}
                            </Select>
                        </Cell>
                    </Grid>
                </CardText>
            </Card>
        );

    }

}

TrendsCalculationSettings.propTypes = {
    trends_defaults: React.PropTypes.array.isRequired
};

export default TrendsCalculationSettings;