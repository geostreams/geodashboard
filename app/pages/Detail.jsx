import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import DataGraph from '../containers/DataGraph';
import styles from '../styles/main.css';

class Detail extends Component {
    render() {
        return (
            <div>
                <Menu selected='explore'/>
                <div className={styles.content}>
                  <DataGraph sensorName={this.props.params.name} />
                </div>
            </div>
        );
    }
}

export default Detail
