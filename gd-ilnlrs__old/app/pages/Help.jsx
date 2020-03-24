import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import styles from '../styles/main.css';

class Help extends Component {

    render() {
        return (
            <div>
                <Menu selected='about'/>
                <div className={styles.contentcenter}>
                    <h2>
                        Help
                    </h2>
                    <br/>
                    <p>
                        Coming Soon!
                    </p>
                </div>
            </div>
        );
    }

}

export default Help;