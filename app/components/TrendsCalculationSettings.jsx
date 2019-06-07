/*
 * @flow
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import trendsStyles from '../styles/trends.css';
import mainStyles from '../styles/main.css';
import {
    Textfield, Cell, Grid,
    Card, CardHeader, CardTitle, CardSubtitle, CardActions, CardText
} from 'react-mdc-web/lib';
import {getMobileSizeMax} from '../utils/getConfig';


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
            baselinePeriod: this.props.chosenBaseline,
            baselineMin: 0,
            baselineMax: 30,

            rollingPeriod: this.props.chosenRolling,
            rollingMin: 0,
            rollingMax: 30,
        };
        (this: any).handleBaselineChange = this.handleBaselineChange.bind(this);
        (this: any).handleRollingChange = this.handleRollingChange.bind(this);
    }

    handleBaselineChange(event: Object) {
        let value = event.target.value;
        if (value < this.state.baselineMin) {
            value = this.state.baselineMin
        }
        if (value > this.state.baselineMax) {
            value = this.state.baselineMax
        }
        value = parseInt(value);
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
        value = parseInt(value);
        this.setState({rollingPeriod: value});
        this.props.onSelectTrendsCalcRollingSetting(value);
    }

    render() {

        let spacer;
        if (screen.width <= getMobileSizeMax()) {
            spacer = (<div><br/><br/></div>);
        }

        return (
            <Card className={trendsStyles.cardMargin} key="calculate">
                <CardHeader>
                    <CardTitle className={mainStyles.title_card}>Change Calculation Setting</CardTitle>
                    <CardSubtitle>{window.configruntime.gd3.calculation_subtitle}</CardSubtitle>
                </CardHeader>
                {spacer}
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

TrendsCalculationSettings.propTypes = {
    trends_defaults: PropTypes.array.isRequired
};

export default TrendsCalculationSettings;
