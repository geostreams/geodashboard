/* No Flow due to D3 Items */

import React, {Component} from 'react';
import D3LineNoData from './D3/D3LineNoData';
import PropTypes from 'prop-types';


class LineNoData extends Component {

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
        const el =  this._rootNode;
        D3LineNoData.create(el, {
            width: 500,
            height: 400
        }, this.getLineState());
    }

    componentDidUpdate() {
        let el =  this._rootNode;
        D3LineNoData.update(el, this.getLineState());
    }

    getLineState() {
        return{
            width: 500,
            height: 400,
            data: this.props.data,
            yAxisLabel: this.props.yAxisLabel,
            title: this.props.title,
        }
    }
    componentWillUnmount() {
        D3LineNoData.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return (<div className="line-container" ref={this._setRef.bind(this)} />)
    }

}

export default LineNoData;
