import React, {Component} from 'react'
import config from './config.json';
import styles from './search.css';

class Search extends Component{
	render() {
		return (
			<div className={styles.root}>
				{config.greetText}
			</div>
		);
	}
}

export default Search