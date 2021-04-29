// @flow
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import { updateLoadingStatus } from 'gd-core/src/actions/page';
import { entries } from 'gd-core/src/utils/array';
import { useElementRect } from 'gd-core/src/utils/hooks';
import logger from 'gd-core/src/utils/logger';
import { htmlToPdf } from 'gd-core/src/utils/pdf';

import type { Action as PageAction } from 'gd-core/src/actions/page';

import { BMP_API_URL } from '../../config';
import { BMPContext } from '../Context';
import { RESULTS, createRequestParams } from './config';

const useStyle = makeStyles((theme) => ({
    appBar: {
        position: 'relative'
    },
    title: {
        marginLeft: theme.spacing(2),
        flex: 1
    },
    contentContainer: {
        padding: theme.spacing(1)
    },
    categoryContainer: {
        padding: theme.spacing(1)
    }
}));

interface Props {
    handleClose: () => void;
    dispatch: (pageAction: PageAction) => void;
}

const Pdf = ({ handleClose, dispatch }: Props) => {
    const classes = useStyle();

    const { filters, results, updateResults } = React.useContext(BMPContext);

    const [selectedCategories, updateSelectedCategories] = React.useState<Map<string, boolean>>(new Map());

    const outputContainer = React.useRef();
    const outputContainerRect = useElementRect(outputContainer);

    const plotTooltipRef = React.useRef<null | HTMLDivElement>(null);

    const renderResult = ([category, { component: ResultComponent, config: { label } }]) => {
        if (!selectedCategories.get(label)) {
            return <React.Fragment key={category} />;
        }
        const queryParams = createRequestParams(category, filters);
        const queryParamsBase64 = btoa(queryParams);
        if (results[queryParamsBase64]) {
            return (
                <div key={category} className={classes.categoryContainer}>
                    <Typography variant="h6">{label}</Typography>
                    <ResultComponent
                        filters={filters}
                        data={results[queryParamsBase64]}
                        containerRect={outputContainerRect}
                        tooltipRef={plotTooltipRef}
                        showVegaActions={false}
                    />
                </div>
            );
        }
        dispatch(updateLoadingStatus(true));
        fetch(
            `${BMP_API_URL}/practices?${queryParams}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            }
        )
            .then((response) => response.json())
            .then((response) => {
                updateResults({
                    ...results,
                    [queryParamsBase64]: response.results
                });
            })
            .catch(logger.error)
            .finally(() => {
                dispatch(updateLoadingStatus(false));
            });
        return (
            <React.Fragment key={category}>
                <Typography variant="h6">{label}</Typography>
                <div>Loading</div>
            </React.Fragment>
        );
    };

    return (
        <Dialog fullScreen open onClose={handleClose}>
            <AppBar className={classes.appBar}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Export to PDF
                    </Typography>
                    <Button
                        color="inherit"
                        variant="outlined"
                        startIcon={<PdfIcon />}
                        disabled={
                            Array.from(selectedCategories.values()).every((v) => !v) ||
                            !outputContainer.current
                        }
                        onClick={() => {
                            if (outputContainer.current) {
                                htmlToPdf(
                                    outputContainer.current,
                                    {
                                        filename: 'bmp.pdf'
                                    }
                                );
                            }
                        }}
                    >
                        Save
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container className={classes.contentContainer}>
                <Grid item xs={4}>
                    <Typography variant="h6">Include in the report</Typography>
                    <List>
                        {entries(RESULTS).map(([name, { config: { label } }]) => (
                            <ListItem
                                key={name}
                                dense
                                button
                                onClick={
                                    () => updateSelectedCategories(
                                        new Map([...selectedCategories, [label, !selectedCategories.get(label)]])
                                    )
                                }
                            >
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        disableRipple
                                        checked={selectedCategories.get(label) || false}
                                    />
                                </ListItemIcon>
                                <ListItemText>
                                    {label}
                                </ListItemText>
                            </ListItem>
                        ))}
                    </List>
                </Grid>
                <Grid ref={outputContainer} item xs={8}>
                    {entries(RESULTS).map((resultProps) => renderResult(resultProps))}
                </Grid>
            </Grid>
            <div ref={plotTooltipRef} className={classes.plotTooltip} />
        </Dialog>
    );
};

export default connect()(Pdf);
