/*
 * @flow
 */

import React, {Component} from "react";
import TrendsGraph from '../components/TrendsGraph';
import Spinner from './Spinner';
import YearSlider from './YearSlider';
import {intervalCounts} from '../utils/spinnerUtils';


class TrendDetailRight extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            selectedStartYear: 0,
            selectedEndYear: 0,
            loading: false,
            data: {},
            loading_time: 0
        };
        (this: any).onSliderChange = this.onSliderChange.bind(this);
    }

    state: {
        selectedStartYear: number,
        selectedEndYear: number,
        loading: boolean,
        data: any,
        loading_time: number
    };

    loadDetailData() {
        const that = this;
        this.props.fetchRegionDetailTrends(
            this.props.trends_parameter, this.props.trends_season, this.props.trends_region_id
        );

        let checkVal = that.props.trends_regions.find(function (element) {
            return element !== undefined && element.name === that.props.trends_region_id;
        });

        return (
            intervalCounts(
                checkVal, that.props.show_spinner, 'trends_detail'
            )
        );
    }

    componentWillMount() {
        this.setState({loading: true});
        this.loadDetailData().then((data) => {
            this.setState({
                loading: false,
                data: data,
            });
            let value = [this.state.selectedStartYear, this.state.selectedEndYear];
            // $FlowFixMe
            this.onSliderChange(value);
        });
    }

    componentDidUpdate() {
        let that = this;
        window.onhashchange = function () {
            if (window.location.href.indexOf("trendsdetail/region") > -1) {
                that.setState({loading: true});
                that.loadDetailData().then((data) => {
                    that.setState({
                        loading: false,
                        data: data,
                        loading_time: 0
                    });
                });
            }
        };
    }

    onSliderChange(value: Object) {
        this.setState({selectedStartYear: value[0], selectedEndYear: value[1]})
    }

    render() {
        if (this.state.loading) {
            return (
                <div>
                    <Spinner loading_time_text={true}/>
                </div>
            );
        }

        let years = [];
        this.state.data.map(k => {
            Object.keys(k).map(l => years.push(parseInt(l)));
        });
        let minYear = Math.min.apply(null, years);
        let maxYear = Math.max.apply(null, years);
        let start_year = this.state.selectedStartYear === 0 ? minYear : this.state.selectedStartYear;
        let end_year = this.state.selectedEndYear === 0 ? maxYear : this.state.selectedEndYear;
        let parameter = this.props.parameters.find(x => x.name === this.props.trends_parameter);

        let contents = <div> ERROR! Please Try Again! </div>;

        if (parameter && !this.state.loading && this.state.data.length > 0) {
            contents =
                <div>
                    <YearSlider start_year={minYear} end_year={maxYear}
                                selectedStartYear={start_year}
                                selectedEndYear={end_year}
                                onSliderChange={this.onSliderChange}
                    />
                    <TrendsGraph
                        trends_settings={this.props.trends_settings}
                        trends_region_id={this.props.trends_region_id}
                        trends_parameter={this.props.trends_parameter}
                        title={parameter.title}
                        units={parameter.unit}
                        trends_season={this.props.trends_season}
                        start_year={start_year}
                        end_year={end_year}
                        trends_regions={this.props.trends_regions}
                    />
                </div>
        }

        return (
            <div>
                {contents}
            </div>
        );
    }

}

export default TrendDetailRight;