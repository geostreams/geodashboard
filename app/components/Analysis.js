import React, {Component} from 'react'
import Menu from './MenuPage'
import styles from '../styles/analysis.css';

class Analysis extends Component {

    render() {
        return (
            <div>
                <Menu selected='analysis'/>
                <div className={styles.centeredcontent}>
                    <p>Exploratory Analysis Page</p>
                </div>
            </div>
        );
    }

}

export default Analysis;