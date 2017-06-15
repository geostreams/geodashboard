import React, {Component} from 'react'
import styles from '../styles/main.css'
import Select from './material/Select'

class SwitchAPI extends Component {

    handleChange = (e) => {
        const value = e.target.options[e.target.selectedIndex].value;
        this.props.onBackendChange(value);
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