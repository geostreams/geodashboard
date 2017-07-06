import React, {Component} from 'react'
import styles from '../styles/main.css'
import Select from './material/Select'

class SwitchAPI extends Component {

	handleChange = (e) => {
        const index = e.target.selectedIndex;
		this.props.onBackendChange(this.props.endpoints[index].url, this.props.endpoints[index].title,
			this.props.endpoints[index].subtitle);
	}

    render() {
        return (
            <div className={styles.contentcenter}>
                <h4>Pick an instance</h4>
                <Select value={this.props.selected} onChange={this.handleChange}>
                    {this.props.endpoints.map((b, index) =>
                        <option value={b.url} key={index}> {b.label} </option>
                    )}
                </Select>
            </div>
        )
    }
}

export default SwitchAPI