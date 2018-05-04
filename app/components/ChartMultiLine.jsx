import React, { Component } from 'react';
import rd3 from 'react-d3';
import {
    Card, CardHeader, CardTitle, CardText, CardMedia,
    Dialog, DialogBody, DialogHeader, DialogTitle, Icon
} from 'react-mdc-web';
import {getParameterName, getAlternateParameters, getDetailPageBAWInfoText} from '../utils/getConfig';
import BoxAndWhisker from '../components/BoxAndWhisker';
import styles from "../styles/detail.css";
let LineChart = rd3.LineChart;


class ChartMultiLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openInfoButton: false
        };
        (this:any).handleInfoIcon = this.handleInfoIcon.bind(this);
    }

    handleInfoIcon (button_status: boolean) {
        this.setState({
            openInfoButton: button_status
        });
    };

    render() {

        // Up to three parameters on one graph
        let loopValues = [];
        let lineDataValues = {};
        let lineData = [];
        let {params} = this.props;
        let chartTitle = ' | ';
        let param_name = '';
        let title_param_name = '';
        let param_color = '';
        let legend_box = [];
        let BAWValues = [];
        let boxAndWhiskers = [];
        let colorsRange = ["#FF6600", "#006600", "#000099"];

        legend_box = legend_box.concat("Legend: ").concat('\n');

        params.map(p => {
            loopValues = [];
            lineDataValues = {};
            BAWValues = [];

            if(this.props.sensorData[p]) {
                this.props.sensorData[p].map(function(d) {
                    loopValues.push({x: new Date(d.label), y: d.average});
                    BAWValues.push(d.average);
                });
                param_name = getParameterName(p, getAlternateParameters());
                param_color = colorsRange[params.indexOf(p)];
                lineDataValues = {
                    name: param_name,
                    values: loopValues
                };
                lineData.push(lineDataValues);
                boxAndWhiskers.push(
                    <BoxAndWhisker key={param_name}
                                   paramName={param_name}
                                   paramValues={BAWValues}
                                   paramColor={param_color}/>
                );
                title_param_name = param_name + ' | ';
                chartTitle = chartTitle.concat(title_param_name);
                legend_box = legend_box.concat(<li key={param_name} style={{'color': param_color}}>{param_name}</li>)
            }
        });

        let {interval_val} = this.props;

        return (
            <div>
                <Dialog open={Boolean(this.state.openInfoButton)}
                        onClose={()=>{this.setState({openInfoButton:false})}}>
                    <DialogHeader >
                        <DialogTitle>Box and Whisker Plots</DialogTitle>
                        <a className={styles.close_button_style}
                           onClick={()=>{this.setState({openInfoButton: false})}}>
                            <Icon name="close"/>
                        </a>
                    </DialogHeader>
                    <DialogBody scrollable>
                        {getDetailPageBAWInfoText()}
                    </DialogBody>
                </Dialog>
                <div className={styles.layout_style}>
                    <div className={styles.float_item_left}>
                        <Card className={styles.card_margins}>
                            <CardHeader>
                                <CardTitle>
                                    <span className={styles.card_title_style}>{chartTitle}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardMedia>
                                <LineChart
                                    data={lineData}
                                    width={500} height={300}
                                    xAxisLabel="Time"
                                    xAxisLabelOffset={Number(50)}
                                    viewBoxObject={{x: 0, y: 0, width: 700, height: 400}}
                                    colors={d3.scale.quantize().domain([0, 1, 2]).range(colorsRange)}
                                    xAxisTickInterval={{unit: 'year', interval: Number(interval_val)}}
                                />
                            </CardMedia>
                            <CardText>
                                {legend_box}
                            </CardText>
                        </Card>
                    </div>
                    <div className={styles.float_item_left}>
                        <Card className={styles.card_margins}>
                            <CardHeader>
                                <CardTitle>
                                    <span className={styles.card_title_style}>Box and Whisker</span>
                                    <a className={styles.open_button_style_baw}
                                       onClick={this.handleInfoIcon}>
                                        <Icon name="info"/>
                                    </a>
                                </CardTitle>
                            </CardHeader>
                            <CardText>
                                {boxAndWhiskers}
                            </CardText>
                        </Card>
                    </div>
                </div>
            </div>
        )

    }
}

export default ChartMultiLine;
