import React, {Component} from 'react'
import Map from '../containers/Map'
import Menu from '../components/MenuPage'
import ExploreSourcesTab from '../containers/ExploreSourcesTab'
import {Card, CardTitle, CardMedia, CardText} from 'material-ui/Card'
import Sensors from '../containers/Sensors'
import styles from '../styles/main.css'
import { connect } from 'react-redux'

class Explore extends Component {
	render() {

		let sourceLists = this.props.sources.map(s=>
			<Card >
				<CardTitle
					title={s.label}
					titleStyle={{'fontSize':'12px', 'text-transform':'capitalize'}}
					actAsExpander={true}
				/>
				<CardText expandable={true}>
					<ExploreSourcesTab source={s} />
				</CardText>
			</Card>
		)
		return (
			<div>
				<div className={styles.menu}>
					<Menu selected='explore'/>
				</div>
				<div>
					<div className={styles.body}>
						<div className={styles.leftcolumn}>
							{sourceLists}
						</div>
						<div className={styles.rightmap}>
							<Card>
								<Map />
							</Card>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		sources: state.sensors.sources
	}
};

export default connect(mapStateToProps)(Explore)