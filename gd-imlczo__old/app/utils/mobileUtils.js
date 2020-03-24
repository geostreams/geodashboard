/*
 * @flow
 */

import React from 'react';
import {Tab, Tabbar} from 'react-mdc-web/lib';
import {getChromeDisabled} from './getConfig';
import styles from '../styles/main.css';


export function generateMobilePageTabs(
    mapTabText: string, viewSelection: string, clickedViewSelection: ((value: string) => any)
): Object {

    let mapViewText = (<span className={styles.tabTextStyle}>Map View</span>);
    let mapDisabled = false;

    // Should the Map be Disabled?
    if (navigator.userAgent.toLowerCase().indexOf('android') > -1 && getChromeDisabled() === true) {
        mapDisabled = true;
        mapViewText = (
            <span className={styles.tabTextStyleDisabled}>
                {mapTabText} (Unavailable with Chrome)
            </span>
        );
    }

    return (
        <div className={styles.tabBackground}>
            <Tabbar key='mobile_tabs'>
                <Tab active={viewSelection === "list-view"}
                     key='list-view' value="list-view"
                     onClick={() => {
                        clickedViewSelection("list-view")
                     }}
                >
                    <span className={styles.tabTextStyle}>List View</span>
                </Tab>
                <Tab active={viewSelection === "map-view"}
                     key='map-view' value="map-view"
                     onClick={() => {
                         if (mapDisabled === false) {
                            clickedViewSelection("map-view")
                         }
                     }}
                >
                    {mapViewText}
                </Tab>
            </Tabbar>
        </div>
    );

}
