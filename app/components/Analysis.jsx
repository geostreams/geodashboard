import React, {Component} from 'react'
import MenuPage from './MenuPage'
import styles from '../styles/main.css';
import analysisStyles from '../styles/analysis.css';
import {connect} from 'react-redux';
import {
    Card,
    CardHeader,
    Content,
    CardActions,
    CardTitle,
    CardSubtitle,
    CardText,
    List,
    Textfield,
    Button,
    Cell,
    Grid,
    RadioGroup,
    Radio
} from 'react-mdc-web';
import Map from '../containers/AnalysisMap';
import {getTrendSettings} from '../utils/getConfig';
import Select from './material/Select';

class Analysis extends Component {

    constructor(props) {
        super(props);

        this.state = {
            regions: [
                {
                    "region": {
                        "id": "all",
                        "title": "All Regions"
                    }
                },
                {
                    "region": {
                        "id": "draw",
                        "title": "Draw Custom Region"
                    }
                },
            ],
            chosenRegion: 'all',

            thresholdValue: 0,
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

            chosenParameter: "None",

            showResults: false,
        };
    }

    handleParameterChange = (event) => {
        this.setState({chosenParameter: event.target.value});
        this.state.thresholdDisabled02 = false;
        this.state.showResults = false;
    };

    handleThresholdChange = (event) => {
        const thresholdValue = event.target.value;
        if (thresholdValue > (this.state.thresholdLength - 1)) {
            this.state.thresholdDisabled02 = false;
        }
        this.setState({thresholdValue: thresholdValue, thresholdChooseValue: thresholdValue});
    };

    handleThresholdChooseValue = (event) => {
        let value = event.target.value;
        if (value < this.state.thresholdMin) {
            value = this.state.thresholdMin
        }
        if (value > this.state.thresholdMax) {
            value = this.state.thresholdMax
        }
        value = parseFloat(value);
        this.setState({thresholdChooseValue: value});
    };

    handleBaselineChange = (event) => {
        let value = event.target.value;
        if (value < this.state.baselineMin) {
            value = this.state.baselineMin
        }
        if (value > this.state.baselineMax) {
            value = this.state.baselineMax
        }
        value = parseFloat(value);
        this.setState({baselinePeriod: value});
    };

    handleRollingChange = (event) => {
        let value = event.target.value;
        if (value < this.state.rollingMin) {
            value = this.state.rollingMin
        }
        if (value > this.state.rollingMax) {
            value = this.state.rollingMax
        }
        value = parseFloat(value);
        this.setState({rollingPeriod: value});
    };

    handleRegionChange = (event) => {
        let chosenRegion = event.target.value;
        this.setState({chosenRegion: chosenRegion});
    };

    handleClickAnalysis = () =>{

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
        if (trendSettings) {
            paramsListMap = trendSettings
                .map(p => <Radio id={p.parameter.id} value={p.parameter.id}
                                 key={p.parameter.id}> {p.parameter.title}</Radio>);
        }
        paramsList = paramsList.concat(paramsListMap);
        if (paramsListMap.length == 0) {
            //TODO: need fix
            paramsList = [<Radio id="9999" value="9999" key="9999"
                                 disabled={true}> None Available </Radio>];
        }

        let regionsList = [];
        let regionsListMap = [];
        let setRegions = this.state.regions;
        regionsListMap = setRegions
            .map(r => <Radio id={r.region.id} value={r.region.id} key={r.region.id}>{r.region.title}</Radio>);
        regionsList = regionsList.concat(regionsListMap);
        if(regionsListMap.length == 0) {
            regionsList = [ <Radio id="9999" value="9999" key="9999" disabled={true}>None Available</Radio> ];
        }

        let thresholdListMap = [];
        let thresholdList = [];
        if (this.state.chosenParameter != 'None') {
            this.state.thresholdDisabled01 = false;
            for (let i = 0; i < trendSettings.length; i++) {
                if (trendSettings[i].parameter.id == this.state.chosenParameter) {
                    let thresholdTrendSettings = trendSettings[i].thresholds;
                    this.state.thresholdLength = thresholdTrendSettings.length;
                    thresholdListMap = thresholdTrendSettings
                        .map(p => <option value={p.value} key={p.value}> {p.title} </option>);
                    thresholdList = thresholdList.concat(thresholdListMap);
                    thresholdList = thresholdList.concat(<option value={0} key={0}> Enter a Value</option>);
                }
            }
        } else {
            this.state.thresholdDisabled01 = true;
            thresholdList = [<option value={1} key={1}> None Available</option>];
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

                <MenuPage selected="analysis"/>
                <Content>
                    <div className={styles.body}>
                        <Grid className={styles.noPadding}>
                            <Cell col={2}>
                                <List className={styles.list}>
                                    <Card className={analysisStyles.cardMargin} key="Parameter">
                                        <CardHeader>
                                            <CardTitle>
                                                Select Parameter
                                            </CardTitle>
                                            <CardSubtitle>
                                                Parameter to Explore
                                            </CardSubtitle>
                                        </CardHeader>
                                        <CardActions>
                                            <RadioGroup name="params"
                                                        value={this.state.chosenParameter}
                                                        onChange={this.handleParameterChange}>
                                                {paramsList}
                                            </RadioGroup>
                                        </CardActions>
                                    </Card>

                                    <Card className={analysisStyles.cardMargin} key="calculate">
                                        <CardHeader>
                                            <CardTitle>Change Calculation Setting</CardTitle>
                                            <CardSubtitle>Settings how to calculate change</CardSubtitle>
                                        </CardHeader>
                                        <CardText>
                                            <Grid>
                                                <Cell col={6}>
                                                    <Textfield
                                                        floatingLabel="Baseline Avg Period (yr)"
                                                        type="number"
                                                        className={analysisStyles.textField}
                                                        min={this.state.baselineMin} max={this.state.baselineMax}
                                                        value={this.state.baselinePeriod}
                                                        onChange={this.handleBaselineChange}
                                                    />
                                                </Cell>
                                                <Cell col={6}>
                                                    <Textfield
                                                        floatingLabel="Rolling Avg Period (yr)"
                                                        type="number"
                                                        className={analysisStyles.textField}
                                                        min={this.state.rollingMin} max={this.state.rollingMax}
                                                        value={this.state.rollingPeriod}
                                                        onChange={this.handleRollingChange}
                                                    />
                                                </Cell>
                                            </Grid>
                                        </CardText>
                                    </Card>

                                    <Card className={analysisStyles.cardMargin} key="Threshold">
                                        <CardHeader>
                                            <CardTitle>Select Threshold Value</CardTitle>
                                            <CardSubtitle>Change the threshold value for analysis</CardSubtitle>
                                        </CardHeader>
                                        <CardText>
                                            <Grid>
                                                <Cell col={6}>
                                                    <Select className={analysisStyles.select}
                                                            disabled={this.state.thresholdDisabled01}
                                                            value={this.state.thresholdValue.toString()}
                                                            onChange={this.handleThresholdChange.bind(this)}
                                                            defaultValue="0">
                                                        {thresholdList}
                                                    </Select>
                                                </Cell>
                                                <Cell col={6}>

                                                    <Textfield
                                                        floatingLabel="Threshold"
                                                        type="number"
                                                        disabled={this.state.thresholdDisabled02}
                                                        min={this.state.thresholdMin} max={this.state.thresholdMax}
                                                        className={analysisStyles.textField}
                                                        value={this.state.thresholdChooseValue}
                                                        onChange={this.handleThresholdChooseValue}
                                                    />

                                                </Cell>
                                            </Grid>
                                        </CardText>
                                    </Card>

                                    <Card className={analysisStyles.cardMargin} key="Region">
                                        <CardHeader>
                                            <CardTitle> Select Region </CardTitle>
                                            <CardSubtitle> Select region to apply the settings</CardSubtitle>
                                        </CardHeader>
                                        <CardActions>
                                            <RadioGroup name="region"
                                                        value={this.state.chosenRegion}
                                                        onChange={this.handleRegionChange}>
                                                {regionsList}
                                            </RadioGroup>
                                        </CardActions>
                                    </Card>

                                </List>

                                <div className={styles.leftActions}>

                                    <div className={analysisStyles.comboStyling}>
                                        <Button raised className={analysisStyles.buttonStyle}
                                                primary onClick={this.handleClickAnalysis}> Apply Settings </Button>
                                        <span className={analysisStyles.counterText}>
                                            {counterText}
                                        </span>
                                    </div>

                                </div>
                            </Cell>

                            <Cell col={10}>
                                <div className={styles.rightmap}>
                                    <Card>
                                        <Map display_trends='True'
                                             display_draw='True'/>
                                    </Card>
                                </div>

                            </Cell>
                        </Grid>
                    </div>
                </Content>
            </div>
        )
            ;
    }

}

export default Analysis;
