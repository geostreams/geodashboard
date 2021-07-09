// @flow
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';

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
    open: boolean;
    closeDialog: () => void;
};

const LegendInfo = ({ open, closeDialog }: Props) => {
    const classes = useStyles();

    return (
        <Dialog
            open={open}
            onClose={()=> closeDialog()}
            scroll="paper"
            PaperProps={{
                square: true
            }}
            fullWidth
            maxWidth="md"
        >
            <DialogTitle id="scroll-dialog-title" disableTypography>
                <Typography variant="h6">About This Data</Typography>
                <IconButton
                    className={classes.closeButton}
                    size="small"
                    onClick={()=> closeDialog()}
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
                    All trend calculations are utilizing the delta between the 10 year average minus the lifetime
                    average over the lifetime average to calculate the trending direction. Even though this
                    information provides a good indication towards the stability of the lake environment, it should
                    not be used as a definitive indication and only predictor.
                </DialogContentText>
                <DialogContentText>
                    * Trends based on sensor data are calculated using the average parameter value in the top two
                    meters of the water column. Depth profiles for the entire water column can be found at the explore
                    data link.
                </DialogContentText>
            </DialogContent>
        </Dialog>
    );
};

export default LegendInfo;
