// @flow
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import type { SourceConfig } from '../../utils/flowtype';

/*
 Displays the dialog box for more information about the sources.
 Props:
    sourceInfo: sourcesConfig object with details of the source that needs to shown.
    dialogControl: Control for whether the dialog is open or not
    toggleDialog: Function to toggle dialogControl 
*/

type Props = {
    sourceInfo: SourceConfig;
    dialogControl: boolean,
    toggleDialog: Function
}

function InfoDialog(props: Props) {
    const open = props.dialogControl;
    const sourceInfo = props.sourceInfo;

    return (
        <div>
            <Dialog
                open={open}
                onClose={()=> props.toggleDialog(false)}
                scroll="paper"
                fullWidth
                maxWidth="md"
            >   
                <Grid container direction="row" justify="space-between">
                    <DialogTitle id="scroll-dialog-title">{sourceInfo.label}</DialogTitle>
                    <IconButton size="small" aria-label="close" onClick={()=> props.toggleDialog(false)}>
                        <CloseIcon />
                    </IconButton>
                </Grid>
                <DialogContent dividers>
                    <DialogContentText
                        id="scroll-dialog-description"
                        tabIndex={-1}
                    >
                        {sourceInfo.description}
                    </DialogContentText>
                    <DialogContentText>
                        {sourceInfo.qaqc}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Link component={Button} href={sourceInfo.link} rel="noopener noreferrer" target="_blank" color="inherit">
                        {sourceInfo.more_info}
                    </Link>
                </DialogActions>
            </Dialog>
        </div>
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