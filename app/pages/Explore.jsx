import React, {Component} from 'react'
import Map from '../containers/Map'
import Menu from '../components/MenuPage'
import {Card, CardTitle} from 'material-ui/Card'
import Sensors from '../containers/Sensors'
import styles from '../styles/main.css'
import { connect } from 'react-redux'

class Explore extends Component {
	render() {
		return (
			<div>
				<Menu selected='explore'/>
				<div>
					<div className={styles.bodystyle}>
						<div className={styles.leftcolumn}>
							<Card >
								<CardTitle
									title="Explore Trends"
									titleStyle={{'fontSize':'17px', 'fontWeight':'bold', 'text-transform':'capitalize',}}
								/>
								<CardTitle
									title="Explore Sources"
									titleStyle={{'fontSize':'17px', 'fontWeight':'bold', 'text-transform':'capitalize',}}
								/>
							</Card>
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

const mapStateToProps = (state, ownProps) => {
	return {
		sensorsData: state.sensors.data
	}
};

export default connect(mapStateToProps)(Explore)