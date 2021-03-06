/* No Flow due to D3 Items */

import React, {Component} from 'react';
import D3RawProcessedLine from './D3/D3RawProcessedLine';
import PropTypes from 'prop-types';
import styles from '../styles/detail.css';

class RawProcessedLine extends Component {

    static propTypes = {
        data: PropTypes.array,
        pointData: PropTypes.array,
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
        D3RawProcessedLine.create(el, {
            width: 500,
            height: 400
        }, this.getLineState());
    }

    componentDidUpdate() {
        let el = this._rootNode;
        D3RawProcessedLine.update(el, this.getLineState());
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
            selectedStartDate: this.props.selectedStartDate,
            selectedEndDate: this.props.selectedEndDate,
            sources: this.props.sources,
            displayLines: this.props.displayLines,
            data: this.props.data,
            pointData: this.props.pointData,
            domain: this.props.domain,
            yAxisLabel: this.props.yAxisLabel,
            title: this.props.title,
            startAtZero: this.props.startAtZero
        }
    }

    componentWillUnmount() {
        D3RawProcessedLine.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return (<div className="line-container" ref={this._setRef.bind(this)}/>)
    }

}

export default RawProcessedLine;