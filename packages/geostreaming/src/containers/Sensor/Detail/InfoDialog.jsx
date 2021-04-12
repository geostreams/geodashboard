// @flow
import React from 'react';
import { connect } from 'react-redux';
import { Container, Dialog, DialogContent, DialogTitle, IconButton, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

import { getSourceName } from '../../../utils/sensors';

import type { SourceConfig } from '../../../utils/flowtype';

type Props = {
    showDialog: boolean;
    contentType: ?string;
    sourceConfig: SourceConfig;
    source: {
        id: string;
        title: string;
    };
    handleClose: Function;
}

const getDialogContent = (contentType, sourceConfig, source) => {
    switch (contentType) {
        case 'parameters': {
            const { description, qaqc, more_info, link } = sourceConfig;
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
                        <Typography variant="subtitle2" component="a" href={link} target="_blank">
                            {more_info || link}
                        </Typography>
                    </Container>
                );
            }
            return [
                getSourceName(sourceConfig, source),
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
        sourceConfig,
        source,
        handleClose
    } = props;

    const [dialogTitle, dialogBody] = getDialogContent(contentType, sourceConfig, source);

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

const mapStateToProps = (state) => ({
    sourceConfig: state.config.source
});

export default connect(mapStateToProps)(InfoDialog);
