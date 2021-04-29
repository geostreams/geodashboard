/* No Flow due to D3 Items */

import React, {Component} from 'react';
import D3StackedBar from './D3/D3StackedBar';
import PropTypes from 'prop-types';
import styles from '../styles/detail.css';

class StackedBar extends Component {

    static PropTypes = {
        data: PropTypes.array,
        selectedStartDate: PropTypes.instanceOf(Date),
        selectedEndDate: PropTypes.instanceOf(Date),
        title: PropTypes.string,
        yAxisLabel: PropTypes.string
    };

    componentDidMount() {
        const el = this._rootNode;
        D3StackedBar.create(el, {
            width: 800,
            height: 400
        }, this.getStackedBarState());
    }

    componentDidUpdate() {
        let el = this._rootNode;
        D3StackedBar.update(el, this.getStackedBarState());
    }

    getStackedBarState() {
        return {
            width: 800,
            height: 400,
            selectedStartDate: this.props.selectedStartDate,
            selectedEndDate: this.props.selectedEndDate,
            data: this.props.data,
            yAxisLabel: this.props.yAxisLabel,
            title: this.props.title,
            scaleColors: this.props.scale_colors,
            scaleNames: this.props.scale_names,
            season: this.props.selectedSeason,
            tooltipClass: styles.bar_tooltip
        }
    }

    componentWillUnmount() {
        D3StackedBar.destroy(this._rootNode)
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return (
            <div className="stacked-bar-container" ref={this._setRef.bind(this)} />
        )
    }

}

export default StackedBar;
