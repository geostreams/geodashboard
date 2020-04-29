/*
 * @flow
 */

import React from 'react';
import { Link } from 'react-router-dom';
import styles from 'gd-core__old/app/styles/detailTabs.css';

const DetailTabs = ({ categories, sensorName, selected }) =>(

    <ul className={styles.navTabs}>
        {Object.keys(categories).map(category => (
            <li key={category} className={styles.navItem}>
                <Link
                    to={`/geostreaming/detail/location/${sensorName}/${category}`}
                    className={selected === category ? styles.navLinkActive : styles.navLink}
                >
                    {category}
                </Link>
            </li>
        ))}
    </ul>
)

export default DetailTabs;
