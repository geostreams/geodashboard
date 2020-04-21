/*
 * @flow
 */

import React, {Component} from "react";
import {
    Body1, Body2, Dialog, DialogBody, DialogHeader, DialogTitle, Icon
} from 'react-mdc-web/lib';
import styles from "../styles/main.css";
import {Link} from 'react-router';


class DialogWrapper extends Component {

    constructor(props: Object) {
        super(props);
        this.state = {
            openDialog: false
        };
        (this: any).closeDialog = this.closeDialog.bind(this);
        (this: any).openDialog = this.openDialog.bind(this);
    }

    state: {
        openDialog: boolean
    };

    closeDialog() {
        this.setState({openDialog: false})
    }

    openDialog() {
        this.setState({openDialog: true})
    }

    render() {

        let body_text = "";
        let qaqc_text = "";
        let moreinfo_text = "";
        let moreinfo_link = "";

        if (this.props.body !== undefined) {
            if (this.props.body.description !== undefined) {
                body_text = this.props.body.description;
            }
            if (this.props.body.qaqc !== undefined) {
                qaqc_text = this.props.body.qaqc;
            }
            if (this.props.body.more_info !== undefined) {
                moreinfo_text = this.props.body.more_info;
            }
            if (this.props.body.link !== undefined) {
                moreinfo_link = this.props.body.link;
            }
        }

        return (
            <span className={this.props.customStyle}>
                <Dialog open={Boolean(this.state.openDialog)}
                        onClose={this.closeDialog}>
                    <DialogHeader>
                        <DialogTitle>{this.props.title}</DialogTitle>
                        <a className={styles.close_button_style} onClick={this.closeDialog}>
                            <Icon name="close"/>
                        </a>
                    </DialogHeader>
                    <DialogBody>
                        <Body1>
                            {body_text}<br/>{qaqc_text}
                        </Body1>
                        <Body2>
                            <Link href={moreinfo_link}>{moreinfo_text}</Link>
                        </Body2>
                    </DialogBody>
                </Dialog>
                <a onClick={this.openDialog} title={this.props.title}>
                    <Icon className={styles.open_button_style} name="info_outline"/>
                </a>
            </span>
        );
    }

}

export default DialogWrapper;