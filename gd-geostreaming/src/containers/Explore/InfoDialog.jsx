// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

import type { SourceConfig } from '../../utils/flowtype';

/*
 Displays the dialog box for more information about the sources.
 Props:
    sourceInfo: sourcesConfig object with details of the source that needs to shown.
    dialogControl: Control for whether the dialog is open or not
    toggleDialog: Function to toggle dialogControl
*/

const useStyles = makeStyles((theme) => ({
    closeButton: {
        position: 'absolute',
        right: theme.spacing(2),
        top: theme.spacing(2),
        color: 'red'
    },
    content: {
        marginBottom: theme.spacing(2)
    }
}));

type Props = {
    sourceInfo: SourceConfig;
    dialogControl: boolean,
    toggleDialog: Function
}

function InfoDialog(props: Props) {
    const open = props.dialogControl;
    const sourceInfo = props.sourceInfo || {};

    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={()=> props.toggleDialog(false)}
            scroll="paper"
            PaperProps={{
                square: true
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="scroll-dialog-title" disableTypography>
                <Typography variant="h6">{sourceInfo.label}</Typography>
                <IconButton
                    className={classes.closeButton}
                    size="small"
                    onClick={()=> props.toggleDialog(false)}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <DialogContentText
                    id="scroll-dialog-description"
                    variant="body1"
                    tabIndex={-1}
                >
                    {sourceInfo.description}
                </DialogContentText>
                <DialogContentText>
                    {sourceInfo.qaqc}
                </DialogContentText>
                <Link
                    href={sourceInfo.link}
                    rel="noopener noreferrer"
                    target="_blank"
                    variant="subtitle2"
                    color="primary"
                >
                    {sourceInfo.more_info}
                </Link>
            </DialogContent>
        </Dialog>
    );
}

InfoDialog.defaultProps = {
    sourceInfo: {
        label: '',
        description: '',
        qaqc: '',
        more_info: '',
        link: ''
    }
};

export default InfoDialog;
