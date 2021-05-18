/* No Flow due to D3 Items */

import React, {Component} from "react";
import D3BoxAndWhiskers from './D3/D3BoxAndWhiskers';
import PropTypes from 'prop-types';
import styles from "../styles/detail.css";


class BoxAndWhiskers extends Component {

    static propTypes = {
        data: PropTypes.array
    };

    componentDidMount() {
        const el = this._rootNode;
        D3BoxAndWhiskers.create(el, {
            width: 200,
            height: 400
        }, this.getBoxAndWhiskersState());
    }

    componentDidUpdate() {
        let el = this._rootNode;
        D3BoxAndWhiskers.update(el, this.getBoxAndWhiskersState());
    }

    getBoxAndWhiskersState() {
        return {
            width: 200,
            height: 400,
            boxClass: styles.box,
            lineClass: styles.line,
            rectClass: styles.rect,
            circleClass: styles.circle,
            centerClass: styles.center,
            outlierClass: styles.outlier,
            medianClass: styles.median_line,
            data: this.props.data,
            startAtZero:this.props.startAtZero
        }
    }

    componentWillUnmount() {

        D3BoxAndWhiskers.destroy(this._rootNode);
    }

    _setRef(componentNode) {
        this._rootNode = componentNode;
    }

    render() {
        return (<div className="box-container" ref={this._setRef.bind(this)} />)
    }

}

export default BoxAndWhiskers;
