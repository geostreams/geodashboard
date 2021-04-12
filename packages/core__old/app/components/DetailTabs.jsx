/*
 * @flow
 */

import React, {Component} from 'react';
import styles from '../styles/detailTabs.css';
import {Tabbar, Tab} from 'react-mdc-web/lib';


class DetailTabs extends Component {
    render() {
        let detail_link = '#/detail/location/' + this.props.sensorName;
        let tabs;
        const that = this;
        // TODO: If there is nothing, select the first tab
        if (this.props.categories && Object.keys(this.props.categories).length > 0) {
            tabs = Object.keys(this.props.categories).map(category => {
                return (
                    <Tab active={that.props.selected === category} key={category} href={detail_link + '/' + category}>
                        <span className={styles.tabTextStyle}>{category}</span>
                    </Tab>)
            });
        }
        let pageTabs = (
            <div>
                <Tabbar key='detail_tabs'>
                    {tabs}
                </Tabbar>
            </div>
        );
        return (pageTabs);
    }
}

export default DetailTabs;
