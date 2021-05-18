/* No Flow due to D3 Items */

import React, {Component} from 'react';
import D3Line from './D3/D3Line';
import PropTypes from 'prop-types';
import styles from '../styles/detail.css';
import ReactDOM from 'react-dom';
import {removeCharsIDs} from '../utils/graphUtils';


class LinePlot extends Component {

    constructor(props, context) {
        super(props, context);
        this.state = {
            width: 200,
            height: 400
        };
        this.measure = this.measure.bind(this);
    }

    static propTypes = {
        data: PropTypes.array,
        domain: PropTypes.object,
        selectedStartDate: PropTypes.instanceOf(Date),
        selectedEndDate: PropTypes.instanceOf(Date),
        sources: PropTypes.array,
        yAxisLabel: PropTypes.string,
        title: PropTypes.string
    };

    measure() {
        let rect = this.container.getBoundingClientRect();
        if (this.state.width !== rect.width) {
            this.setState({
                width: rect.width
            });
        }
    }

    componentDidMount() {
        const el = ReactDOM.findDOMNode(this);
        D3Line.create(el, {
            width: el.clientWidth,
            height: 400
        }, this.getLineState());
        this.measure();
    }

    componentDidUpdate() {
        this.measure();
        const el = ReactDOM.findDOMNode(this);
        D3Line.update(el, this.getLineState());
    }

    componentWillMount() {
        window.addEventListener('resize', this.measure, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.measure, false);
    }

    getLineState() {
        const el = ReactDOM.findDOMNode(this);
        return {
            width: el.clientWidth,
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

    render() {

        let linkID = removeCharsIDs(this.props.title) + 'Download';
        let chartID = removeCharsIDs(this.props.title) + 'Chart';

        // SVG and Button for Saving
        let svg = document.getElementById(chartID);
        let buttonInfo = document.getElementById(linkID);

        if (svg !== null) {
            // SVG Source Info
            let XMLserialize = new XMLSerializer();
            let SVGSourceInfoRaw = XMLserialize.serializeToString(svg);

            // Update the Button with the proper information
            if (buttonInfo !== null) {
                buttonInfo.alt = SVGSourceInfoRaw;
            }
        }

        return (
            <div className="line-container" id={chartID}
                 ref={(container) => {
                     this.container = container
                 }} style={{width: "100%"}}
            />
        )

    }
}

export default LinePlot;