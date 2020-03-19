// @flow
import React from 'react';
import { Container, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import CONFIG from '../../../config';
import { getSourceName } from '../../../utils/sensors';

type Props = {
    showDialog: boolean;
    contentType: ?string;
    source: {
        id: string;
        title: string;
    };
    handleClose: Function;
}

const getDialogContent = (contentType, source) => {
    switch (contentType) {
        case 'parameters': {
            const { description, qaqc, more_info, link } = CONFIG.source[source.id];
            const content = [];
            if (description) {
                content.push(
                    <Container key="paramDescription">
                        <Typography variant="body2">
                            {description}
                        </Typography>
                    </Container>
                );
            }
            if (qaqc) {
                content.push(
                    <Container key="paramQAQC">
                        <Typography variant="subtitle2">
                            {qaqc}
                        </Typography>
                    </Container>
                );
            }
            if (link) {
                content.push(
                    <Container key="paramLink">
                        <Typography variant="subtitle2" component="a" href={link}>
                            {more_info || link}
                        </Typography>
                    </Container>
                );
            }
            return [
                getSourceName(source),
                content
            ];
        }
        case 'box':
            return [
                'Box and Whisker Plots',
                'Box and Whisker Plots provide a visual look at the data distribution. Lowest values are on the left, and the Highest values are on the right'
            ];
        default:
            return [null, null];
    }
};

const InfoDialog = (props: Props) => {
    const {
        showDialog,
        contentType,
        source,
        handleClose
    } = props;

    const [dialogTitle, dialogBody] = getDialogContent(contentType, source);

    return (
        <Dialog
            maxWidth="md"
            open={showDialog}
            onClose={handleClose}
        >
            <DialogTitle disableTypography>
                <Typography variant="h6">
                    {dialogTitle}
                    <IconButton
                        className="right noPadding actionIcon"
                        onClick={handleClose}
                    >
                        <CloseIcon />
                    </IconButton>
                </Typography>
            </DialogTitle>
            <DialogContent dividers>
                {dialogBody}
            </DialogContent>
        </Dialog>
    );
};

export default InfoDialog;
