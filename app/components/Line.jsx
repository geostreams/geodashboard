import React, {Component} from 'react';
import D3Line from './D3/D3Line'
import PropTypes from 'prop-types';
import {getTimeSeriesSensorExtent} from '../utils/getConfig.js'

class Line extends Component {

    static propTypes = {
        data: PropTypes.array,
        domain: PropTypes.object
    };

    componentDidMount() {
        // D3 Code to create the chart
        const el =  this._rootNode;
        D3Line.create(el, {
            width: 500,
            height: 400
        }, this.getLineState());

    }

    componentDidUpdate() {
        let el =  this._rootNode;
        D3Line.update(el, this.getLineState());
    }

    getLineState() {
        return{
            data: this.props.data,
            domain: this.props.domain,
            class_name_line: this.props.class_name_line,
            class_name_dots: this.props.class_name_dots,
            yAxisLabel: this.props.yAxisLabel,
            title: this.props.title,
            width: 500,
            height: 400,
            use_sensor_extent: getTimeSeriesSensorExtent(),
            selectedStartDate: this.props.selectedStartDate,
            selectedEndDate: this.props.selectedEndDate,
            sources: this.props.sources,
            displayLines: this.props.displayLines
        }
    }
    componentWillUnmount() {

        D3Line.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return (<div className="line-container" ref={this._setRef.bind(this)} />)
    }
}

export default Line;
