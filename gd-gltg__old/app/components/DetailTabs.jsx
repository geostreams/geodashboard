/*
 * @flow
 */

import React from 'react';
import styles from 'gd-core__old/app/styles/detailTabs.css';

const DetailTabs = ({ categories, sensorName, selected }) =>(

    <ul className={styles.navTabs}>
        {Object.keys(categories).map(category => (
            <li key={category} className={styles.navItem}>
                <a
                    href={`/geostreaming/detail/location/${sensorName}/${category}`}
                    className={selected === category ? styles.navLinkActive : styles.navLink}
                >
                    {category}
                </a>
            </li>
        ))}
    </ul>
)

export default DetailTabs;
