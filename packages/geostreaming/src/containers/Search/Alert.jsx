// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    content: {
        marginBottom: theme.spacing(2)
    }
}));

type Props = {
    title: String,
    message: String,
    toggleState: ()=> void,
    open: boolean
}

function InfoDialog(props: Props) {
    const { title, message, toggleState, open } = props;

    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={()=> toggleState(false)}
            scroll="paper"
            PaperProps={{
                square: true
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="scroll-dialog-title" disableTypography>
                <Typography variant="h6">{title}</Typography>
            </DialogTitle>
            <DialogContent className={classes.content}>
                <DialogContentText
                    variant="body1"
                >
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={()=> toggleState(false)} color="primary">
            OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

InfoDialog.defaultProps = {
    title: '',
    message: '',
    open: false,
    toggleState: () => {}
};

export default InfoDialog;
