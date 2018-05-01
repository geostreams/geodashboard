import React, {Component} from 'react';
import styles from '../styles/detailTabs.css';
import {Tabbar, Tab} from 'react-mdc-web';

class DetailTabs extends Component {
    render() {
        let detail_link = '#/detail/location/' + this.props.sensorName;
        let pageTabs = (
            <div className={styles.tabBackground}>
                <Tabbar key='detail_tabs'>
                    <Tab active={this.props.detail === 'separate'}
                         key='separate' href={detail_link  + '/separate/'}>
                        <span className={styles.tabTextStyle}>Separate Graphs</span>
                    </Tab>
                    <Tab active={this.props.detail === 'combined'}
                         key='combined' href={detail_link + '/combined/'}>
                        <span className={styles.tabTextStyle}>Combined Graphs</span>
                    </Tab>
                </Tabbar>
            </div>
        );
        return (pageTabs);
    }
}

export default DetailTabs;