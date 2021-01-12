// @flow
import React from 'react';
import { Box, Container, Fab, Tooltip, Typography, makeStyles } from '@material-ui/core';
import FiltersIcon from '@material-ui/icons/Tune';
import ResultsIcon from '@material-ui/icons/BarChart';

import { BMPContext } from './Context';
import Filters from './Filters';
import Results from './Results';

const useStyle = makeStyles({
    topHeader: {
        background: '#e2ebf4',
        minHeight: 60,
        padding: '0 20px'
    },
    headerText: {
        margin: '10px auto'
    }
});

const Sidebar = () => {
    const classes = useStyle();

    const { activeView, updateActiveView } = React.useContext(BMPContext);

    return (
        <>
            <Box
                className={classes.topHeader}
                display="flex"
                alignItems="center"
            >
                {activeView === 'results' ?
                    <>
                        <Typography variant="h4">
                            Results
                        </Typography>
                        <Box display="flex" flexGrow={1} justifyContent="end">
                            <Tooltip title="Back to the filters">
                                <Fab color="primary" size="small" onClick={() => updateActiveView('filter')}>
                                    <FiltersIcon />
                                </Fab>
                            </Tooltip>
                        </Box>
                    </> :
                    <>
                        <Typography variant="h4">
                            Filters
                        </Typography>
                        <Box display="flex" flexGrow={1} justifyContent="end">
                            <Tooltip title="See the results">
                                <Fab color="primary" size="small" onClick={(() => updateActiveView('results'))}>
                                    <ResultsIcon />
                                </Fab>
                            </Tooltip>
                        </Box>
                    </>}
            </Box>
            <Container>
                <Typography
                    className={classes.headerText}
                    variant="h5"
                >
                    {activeView === 'results' ? <Results /> : <Filters />}
                </Typography>
            </Container>
        </>
    );
};

export default Sidebar;
