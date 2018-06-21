import React, {Component} from "react";
import {Dialog, DialogBody, DialogHeader, DialogTitle, Icon} from 'react-mdc-web';
import styles from "../styles/main.css";

class DialogWrapper extends Component {

    render() {
        return (
            <Dialog open={Boolean(this.props.isOpen)}
                    onClose={this.props.closeDialog}>
                <DialogHeader >
                    <DialogTitle>{this.props.title}</DialogTitle>
                    <a className={styles.close_button_style}
                       onClick={this.props.closeDialog}>
                        <Icon name="close"/>
                    </a>
                </DialogHeader>
                <DialogBody>
                    {this.props.body}
                </DialogBody>
            </Dialog>
        );
    }

}

export default DialogWrapper;
