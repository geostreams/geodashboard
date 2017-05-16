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
import Map from '../containers/Map';
import {getTrendSettings} from '../utils/getConfig'


class Analysis extends Component {

    constructor(props) {
        super(props);

        this.state = {
            regions: {
                "1" : "All Regions",
            },

            thresholdValue: 0,
            thresholdChooseValue: 0,
            thresholdMin: 0,
            thresholdMax: 100,
            thresholdLength: 3,

            thresholdDisabled01: true,
            thresholdDisabled02: true,

            baselinePeriod: 30,
            baselineMin: 0,
            baselineMax: 30,

            rollingPeriod: 2,
            rollingMin: 0,
            rollingMax: 10,

            chosenParameter:"None",

            showResults: false,
        };
    }

    handleParameterChange = (event, value) => {
        this.setState({chosenParameter:value});
        this.state.thresholdDisabled02 = false;
        this.state.showResults = false;
    };

    handleThresholdChange = (event, value, thresholdValue) => {
        if (value > (this.state.thresholdLength - 1)) {
            this.state.thresholdDisabled02 = false;
        }
        this.setState({thresholdValue: thresholdValue});
        this.setState({thresholdChooseValue: thresholdValue});

    };

    handleThresholdChooseValue = (event, value) => {
        if (value < this.state.thresholdMin) {
            value = this.state.thresholdMin
        }
        if (value > this.state.thresholdMax) {
            value = this.state.thresholdMax
        }
        value = parseFloat(value);
        this.setState({thresholdChooseValue: value});
    };

    handleBaselineChange = (event, value) => {
        if (value < this.state.baselineMin) {
            value = this.state.baselineMin
        }
        if (value > this.state.baselineMax) {
            value = this.state.baselineMax
        }
        value = parseFloat(value);
        this.setState({baselinePeriod: value});
    };

    handleRollingChange = (event, value) => {
        if (value < this.state.rollingMin) {
            value = this.state.rollingMin
        }
        if (value > this.state.rollingMax) {
            value = this.state.rollingMax
        }
        value = parseFloat(value);
        this.setState({rollingPeriod: value});
    };

    handleClickAnalysis = (event) =>{

        this.state.showResults = true;

        this.props.onClickAnalysis(
            this.state.chosenParameter,
            this.state.baselinePeriod,
            this.state.rollingPeriod,
            this.state.thresholdChooseValue,
        )
    };


    render() {
        let title = 'Analysis';

        const trendSettings = getTrendSettings();

        let paramsList = [];
        let paramsListMap = [];
        if(trendSettings) {
            paramsListMap = trendSettings
                .map(p => <RadioButton id={p.parameter.id} value={p.parameter.id}
                                       label={p.parameter.title} key={p.parameter.id}/>);
        }
        paramsList = paramsList.concat(paramsListMap);
        if(paramsListMap.length == 0) {
            //TODO: need fix
            paramsList = [ <RadioButton id="9999" value="9999" key="9999"
                                        label="None Available" disabled={true}/> ];
        }

        let thresholdListMap = [];
        let thresholdList = [];
        if(this.state.chosenParameter != 'None'){
            this.state.thresholdDisabled01 = false;
            for(let i = 0; i < trendSettings.length; i++) {
                if(trendSettings[i].parameter.id == this.state.chosenParameter) {
                    let thresholdTrendSettings = trendSettings[i].thresholds;
                    this.state.thresholdLength = thresholdTrendSettings.length;
                    thresholdListMap = thresholdTrendSettings
                        .map(p => <MenuItem value={p.value} key={p.value} primaryText={p.title} />);
                    thresholdList = thresholdList.concat(thresholdListMap);
                    thresholdList = thresholdList.concat(<MenuItem value={0} key={0} primaryText="Enter a Value" />);
                }
            }
        } else {
            this.state.thresholdDisabled01 = true;
            thresholdList = [ <MenuItem value={1} key={1} primaryText="None Available" /> ];
        }

        let counterText;
        if (this.state.showResults == true) {
            let trendsCompleted = this.props.trendNumberCompleted;
            let trendsTotal = (this.props.sensorsData.filter(s => s.parameters.indexOf(this.state.chosenParameter) >= 0)).length;
            counterText = 'Results: ' + trendsCompleted + ' / ' + trendsTotal;
        } else {
            counterText = 'Results: 0 / 0';
        }

        return (
            <div>
                <div className={styles.menustyle}>
                    <Menu selected="analysis"/>
                </div>
                <div className={styles.bodystyle}>
                    <div>
                        <List className={styles.liststyle}>

                            <Card zDepth={2} className={styles.paperstyle} key="Parameter">
                                <CardTitle
                                    title="Select Parameter"
                                    subtitle="Parameter to Explore"
                                />
                                <CardActions>
                                    <RadioButtonGroup name="params"
                                                      value={this.state.chosenParameter}
                                                      onChange={this.handleParameterChange}>
                                        {paramsList}
                                    </RadioButtonGroup>
                                </CardActions>
                            </Card>

                            <Card zDepth={2} className={styles.paperstyle} key="calculate">
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
                                        style = {{width: 50, marginRight: 120}}
                                        value={this.state.baselinePeriod}
                                        onChange={this.handleBaselineChange}
                                    />
                                    <TextField
                                        floatingLabelText="Rolling Avg Period (yr)" floatingLabelFixed={true}
                                        floatingLabelStyle={{width: 200}}
                                        type='number'
                                        min={this.state.rollingMin} max={this.state.rollingMax}
                                        style = {{width: 50}}
                                        value={this.state.rollingPeriod}
                                        onChange={this.handleRollingChange}
                                    />
                                </CardActions>
                            </Card>

                            <Card zDepth={2} className={styles.paperstyle} key="Threshold">
                                <CardTitle
                                    title="Select Threshold Value"
                                    subtitle="Change the threshold value for analysis"
                                />
                                <CardActions>
                                    <SelectField disabled={this.state.thresholdDisabled01}
                                                 value={this.state.thresholdValue}
                                                 onChange={this.handleThresholdChange}
                                                 defaultValue="0">
                                        {thresholdList}
                                    </SelectField>

                                    <TextField
                                        disabled={this.state.thresholdDisabled02}
                                        floatingLabelText="Threshold" floatingLabelFixed={true}
                                        type='number'
                                        min={this.state.thresholdMin} max={this.state.thresholdMax}
                                        className={styles.thresholdStyle}
                                        value={this.state.thresholdChooseValue}
                                        onChange={this.handleThresholdChooseValue}
                                    />
                                </CardActions>
                            </Card>

                            <Card zDepth={2} className={styles.paperstyle} key="Region">
                                <CardTitle
                                    title="Select Region"
                                    subtitle="Select region to apply the setting"
                                />
                                <CardActions>
                                    <RadioButtonGroup name="region" defaultSelected="01">
                                        <RadioButton value="01" label={this.state.regions[1]} />
                                    </RadioButtonGroup>
                                </CardActions>
                            </Card>

                        </List>
                        <Card className={styles.actionStyle} key="Button">
                            <div className={styles.comboStyling}>
                                <RaisedButton className={styles.buttonStyle} label="Apply Setting"
                                              primary={true} onClick={this.handleClickAnalysis}/>
                                <span className={styles.counterText}>
                                    {counterText}
                                </span>
                            </div>
                        </Card>
                    </div>

                    <div className={styles.root}>
                        <Card>
                            <Map display_trends='True'/>
                        </Card>
                    </div>

                </div>
            </div>
        );
    }

}

export default Analysis;
