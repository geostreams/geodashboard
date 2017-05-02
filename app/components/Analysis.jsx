import React, {Component} from 'react'
import Menu from './MenuPage'
import styles from '../styles/analysis.css';
import { connect } from 'react-redux'
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import List from 'material-ui/List';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import Slider from 'material-ui/Slider';
import Map from '../containers/Map';


class Analysis extends Component {

    state = {
        regions: {
            "1" : "All Regions",
            "2" : "Illinois",
            "3" : "Michigan",
            "4" : "Custom Region",
        },

        thresholdValue: 1,

        thresholdSlider: 5,
        thresholdMin: 0,
        thresholdMax: 10,
        thresholdStep: 1,

        baselinePeriod: 5,
        baselineMin: 0,
        baselineMax: 10,
        baselineStep: 1,

        rollingPeriod: 5,
        rollingMin: 0,
        rollingMax: 10,
        rollingStep: 1,
    };

    handleThresholdChange = (event, index, thresholdValue) => this.setState({thresholdValue});

    handleBaselineChange = (event, value) => {
        if (value < this.state.baselineMin) {
            value = this.state.baselineMin
        }
        if (value > this.state.baselineMax) {
            value = this.state.baselineMax
        }
        value = parseInt(value);
        this.setState({baselinePeriod: value});
    };

    handleRollingChange = (event, value) => {
        if (value < this.state.rollingMin) {
            value = this.state.rollingMin
        }
        if (value > this.state.rollingMax) {
            value = this.state.rollingMax
        }
        value = parseInt(value);
        this.setState({rollingPeriod: value});
    };

    handleSliderChange = (event, value) => {
        if (value < this.state.thresholdMin) {
            value = this.state.thresholdMin
        }
        if (value > this.state.thresholdMax) {
            value = this.state.thresholdMax
        }
        value = parseInt(value);
        this.setState({thresholdSlider: value});
    };

    selectParameter(event) {
        this.props.onSelectParameter(event);
    };

    render() {
        let title = 'Analysis';

        let paramsList = [];
        let paramsListMap = [];
        if(this.props.parameters) {
            paramsListMap = this.props.parameters.map(p => <RadioButton id={p.id} value={p.id} label={p.label} key={p.id}/>);
        }
        paramsList = paramsList.concat(paramsListMap);
        if(paramsListMap.length == 0) {
            paramsList = [ <RadioButton id="9999" value="9999" key="9999" label="None Available" disabled={true}/> ];
        }

        return (
            <div>
                <div className={styles.menustyle}>
                    <Menu selected="analysis"/>
                </div>
                <div className={styles.bodystyle}>
                    <div>
                        <List className={styles.liststyle}>

                            <Card zDepth={2} className={styles.paperstyle}>
                                <CardTitle
                                    title="Select Parameter"
                                    subtitle="Parameter to Explore"
                                />
                                <CardText>
                                    Number of Parameters Available: {this.props.parameters.length}
                                </CardText>
                                <CardActions>
                                    <RadioButtonGroup className={styles.showScroll} name="params"
                                                      defaultSelected="01" onChange={this.selectParameter.bind(this)}>
                                        {paramsList}
                                    </RadioButtonGroup>
                                </CardActions>
                            </Card>

                            <Card zDepth={2} className={styles.paperstyle}>
                                <CardTitle
                                    title="Change Calculation Setting"
                                    subtitle="Setting how to calculate change"
                                />
                                <CardActions>
                                    <TextField
                                        floatingLabelText="Baseline Avg Period (yr)" floatingLabelFixed={true}
                                        floatingLabelStyle={{width: 200}}
                                        type='number'
                                        min={this.state.baselineMin} max={this.state.baselineMax}
                                        step={this.state.baselineStep}
                                        style = {{width: 40, marginRight: 120}}
                                        value={this.state.baselinePeriod}
                                        onChange={this.handleBaselineChange}
                                    />
                                    <TextField
                                        floatingLabelText="Rolling Avg Period (yr)" floatingLabelFixed={true}
                                        floatingLabelStyle={{width: 200}}
                                        type='number'
                                        min={this.state.rollingMin} max={this.state.rollingMax}
                                        step={this.state.rollingStep}
                                        style = {{width: 40}}
                                        value={this.state.rollingPeriod}
                                        onChange={this.handleRollingChange}
                                    />
                                </CardActions>
                            </Card>

                            <Card zDepth={2} className={styles.paperstyle}>
                                <CardTitle
                                    title="Select Threshold Value"
                                    subtitle="Change the threshold value for analysis"
                                />
                                <CardActions>
                                    <SelectField value={this.state.thresholdValue} onChange={this.handleThresholdChange}>
                                        <MenuItem value={1} primaryText="Option 01" />
                                        <MenuItem value={2} primaryText="Option 02" />
                                        <MenuItem value={3} primaryText="Option 03" />
                                    </SelectField>

                                    <TextField
                                        floatingLabelText="Threshold" floatingLabelFixed={true}
                                        type='number'
                                        min={this.state.thresholdMin} max={this.state.thresholdMax}
                                        step={this.state.thresholdStep}
                                        className={styles.thresholdStyle} style={{width: 40}}
                                        value={this.state.thresholdSlider}
                                        onChange={this.handleSliderChange}
                                    />
                                    <Slider
                                        defaultValue={5}
                                        min={this.state.thresholdMin} max={this.state.thresholdMax}
                                        step={this.state.thresholdStep}
                                        className={styles.sliderStyle}
                                        value={this.state.thresholdSlider}
                                        onChange={this.handleSliderChange}
                                    />
                                </CardActions>
                            </Card>

                            <Card zDepth={2} className={styles.paperstyle2}>
                                <CardTitle
                                    title="Select Region"
                                    subtitle="Select region to apply the setting"
                                />
                                <CardActions>
                                    <RadioButtonGroup className={styles.showScroll} name="region" defaultSelected="01">
                                        <RadioButton value="01" label={this.state.regions[1]} />
                                    </RadioButtonGroup>
                                </CardActions>
                            </Card>

                        </List>
                        <Card className={styles.buttonstyle}>
                            <RaisedButton label="Apply Setting" primary={true}/>
                        </Card>
                    </div>

                    <div className={styles.root}>
                        <Card>
                            <Map display_trends='True' />
                        </Card>
                    </div>

                </div>
            </div>
        );
    }

}

export default Analysis;
