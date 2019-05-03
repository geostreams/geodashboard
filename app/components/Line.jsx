/* No Flow due to D3 Items */

import React, {Component} from 'react';
import D3Line from './D3/D3Line';
import PropTypes from 'prop-types';
import styles from '../styles/detail.css';


class Line extends Component {

    static propTypes = {
        data: PropTypes.array,
        domain: PropTypes.object,
        selectedStartDate: PropTypes.instanceOf(Date),
        selectedEndDate: PropTypes.instanceOf(Date),
        sources: PropTypes.array,
        yAxisLabel: PropTypes.string,
        title: PropTypes.string
    };

    componentDidMount() {
        // D3 Code to create the chart
        const el = this._rootNode;
        D3Line.create(el, {
            width: 500,
            height: 400
        }, this.getLineState());
    }

    componentDidUpdate() {
        let el = this._rootNode;
        D3Line.update(el, this.getLineState());
    }

    getLineState() {
        return {
            width: 500,
            height: 400,
            class_name_line: styles.graph_line,
            class_name_dots: styles.graph_dot,
            boxClass: styles.box,
            lineClass: styles.line,
            rectClass: styles.rect,
            medianClass: styles.median_line,
            outlierClass: styles.outlier,
            hoverClass: styles.hoverLine,
            overlayClass: styles.overlay,
            tooltipClass: styles.tooltip,
            use_sensor_extent: this.props.sameTimeScale,
            selectedStartDate: this.props.selectedStartDate,
            selectedEndDate: this.props.selectedEndDate,
            sources: this.props.sources,
            displayLines: this.props.displayLines,
            data: this.props.data,
            domain: this.props.domain,
            yAxisLabel: this.props.yAxisLabel,
            title: this.props.title,
            startAtZero: this.props.startAtZero,
            binType: this.props.binType
        }
    }

    componentWillUnmount() {
        D3Line.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return (<div className="line-container" ref={this._setRef.bind(this)}/>)
    }

}

export default Line;
