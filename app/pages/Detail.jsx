import React, {Component} from 'react'
import Menu from '../components/MenuPage'
import DataGraph from '../containers/DataGraph'
import styles from '../styles/main.css'
import { connect } from 'react-redux'
import {Card, CardHeader, CardTitle, CardMedia, CardText} from 'material-ui/Card';
import List from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import { Grid, Row, Col } from 'react-flexbox-grid';

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