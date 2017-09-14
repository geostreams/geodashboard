/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import trendsStyles from '../styles/trends.css';
import {
    Textfield, Cell, Grid,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions, CardText
} from 'react-mdc-web';


class TrendsCalculationSettings extends Component {

    state: {
        baselinePeriod: number,
        baselineMin: number,
        baselineMax: number,

        rollingPeriod: number,
        rollingMin: number,
        rollingMax: number
    };

    constructor(props: Object) {
        super(props);
        this.state = {
            baselinePeriod: this.props.trends_defaults[4].value,
            baselineMin: this.props.trends_defaults[5].value,
            baselineMax: this.props.trends_defaults[6].value,

            rollingPeriod: this.props.trends_defaults[7].value,
            rollingMin: this.props.trends_defaults[8].value,
            rollingMax: this.props.trends_defaults[9].value
        };
        (this:any).handleBaselineChange = this.handleBaselineChange.bind(this);
        (this:any).handleRollingChange = this.handleRollingChange.bind(this);
    }

    handleBaselineChange(event: Object) {
        let value = event.target.value;
        if (value < this.state.baselineMin) {
            value = this.state.baselineMin
        }
        if (value > this.state.baselineMax) {
            value = this.state.baselineMax
        }
        value = parseFloat(value);
        this.setState({baselinePeriod: value});
        this.props.onSelectTrendsCalcBaselineSetting(value);
    }

    handleRollingChange(event: Object) {
        let value = event.target.value;
        if (value < this.state.rollingMin) {
            value = this.state.rollingMin
        }
        if (value > this.state.rollingMax) {
            value = this.state.rollingMax
        }
        value = parseFloat(value);
        this.setState({rollingPeriod: value});
        this.props.onSelectTrendsCalcRollingSetting(value);
    }

    render() {

        return (
            <Card className={trendsStyles.cardMargin} key="calculate">
                <CardHeader>
                    <CardTitle>Change Calculation Setting</CardTitle>
                    <CardSubtitle>Set Average Baseline and Rolling Periods</CardSubtitle>
                </CardHeader>
                <CardText>
                    <Grid>
                        <Cell col={6}>
                            <Textfield
                                floatingLabel="Baseline (yr)"
                                type="number"
                                min={this.state.baselineMin} max={this.state.baselineMax}
                                className={trendsStyles.textField}
                                value={this.state.baselinePeriod}
                                onChange={this.handleBaselineChange}
                                helptext="Must be a Number"
                            />
                        </Cell>

                        <Cell col={6}>
                            <Textfield
                                floatingLabel="Rolling (yr)"
                                type="number"
                                min={this.state.rollingMin} max={this.state.rollingMax}
                                className={trendsStyles.textField}
                                value={this.state.rollingPeriod}
                                onChange={this.handleRollingChange}
                                helptext="Must be a Number"
                            />
                        </Cell>
                    </Grid>
                </CardText>
            </Card>
        );

    }

}

export default TrendsCalculationSettings;

