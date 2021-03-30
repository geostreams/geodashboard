// @flow
import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Fab from '@material-ui/core/Fab';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';
import PdfIcon from '@material-ui/icons/PictureAsPdf';
import { updateLoadingStatus } from 'gd-core/src/actions/page';
import { entries } from 'gd-core/src/utils/array';
import { useElementRect } from 'gd-core/src/utils/hooks';
import logger from 'gd-core/src/utils/logger';

import type { Action as PageAction } from 'gd-core/src/actions/page';

import { BMP_API_URL } from '../../config';
import { BMPContext } from '../Context';
import { RESULTS, createRequestParams } from './config';
import Pdf from './Pdf';


const useStyle = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 150
    },
    plotContainer: {
        height: '100%',
        overflowY: 'auto'
    },
    plotTooltip: {
        position: 'fixed',
        background: '#283d4b',
        color: '#fff',
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 5,
        opacity: 0
    },
    pdfDialogAppBar: {
        position: 'relative'
    },
    pdfDialogTitle: {
        marginLeft: theme.spacing(2),
        flex: 1
    }
}));

type Props = {
    dispatch: (pageAction: PageAction) => void;
};

const Results = ({ dispatch }: Props) => {
    const classes = useStyle();

    // Is the pdf view open?
    const [pdfView, updatePdfView] = React.useState(false);

    const { filters, results, updateResults } = React.useContext(BMPContext);

    const [activeResultKey, updateActiveResultKey] = React.useState<string>('');
    const [activeResultCategory, updateActiveResultCategory] = React.useState<$Keys<typeof RESULTS>>('programsCount');
    const { component: ResultComponent } = RESULTS[activeResultCategory];

    const plotTooltipRef = React.useRef<null | HTMLDivElement>(null);

    React.useEffect(() => {
        const queryParams = createRequestParams(activeResultCategory, filters);
        const queryParamsBase64 = btoa(queryParams);
        if (results[queryParamsBase64]) {
            updateActiveResultKey(queryParamsBase64);
        } else {
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
                    updateActiveResultKey(queryParamsBase64);
                })
                .catch(logger.error)
                .finally(() => {
                    dispatch(updateLoadingStatus(false));
                });
        }
    }, [activeResultCategory]);

    const plotContainer = React.useRef();
    const plotContainerRect = useElementRect(plotContainer);

    return (
        <>
            <Grid container direction="column">
                <Grid container item>
                    <FormControl className={classes.formControl}>
                        <Select
                            native
                            value={activeResultCategory}
                            onChange={({ target: { value } }) => {
                                updateActiveResultKey('');
                                updateActiveResultCategory(value);
                            }}
                        >
                            {entries(RESULTS).map(([name, { config: { label } }]) => (
                                <option
                                    key={name}
                                    value={name}
                                >
                                    {label}
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                    <Box display="flex" flexGrow={1} justifyContent="end">
                        <Tooltip title="Export to PDF">
                            <Fab color="primary" size="small" onClick={() => updatePdfView(true)}>
                                <PdfIcon />
                            </Fab>
                        </Tooltip>
                    </Box>
                </Grid>
                <Grid ref={plotContainer} className={classes.plotContainer} item>
                    {results[activeResultKey] ?
                        <ResultComponent
                            filters={filters}
                            data={results[activeResultKey]}
                            containerRect={plotContainerRect}
                            tooltipRef={plotTooltipRef}
                        /> :
                        null}
                    <div ref={plotTooltipRef} className={classes.plotTooltip} />
                </Grid>
            </Grid>
            {pdfView ? <Pdf handleClose={() => updatePdfView(false)} /> : null}
        </>
    );
};

export default connect()(Results);
