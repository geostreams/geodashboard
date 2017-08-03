import React, {Component} from 'react';
import Menu from '../components/MenuPage';
import styles from '../styles/main.css';
import {getCustomTrendsRegion} from '../utils/getConfig';


class Detail extends Component {
    render() {
        return (
            <div>
                <Menu selected='trends'/>
                <div className={styles.content}>
                    Trends Detail Page for {getCustomTrendsRegion(this.props.params.region)}
                </div>
            </div>
        );
    }
}

export default Detail