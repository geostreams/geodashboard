// @flow
import React from 'react';
import {
    Container,
    Divider,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Typography,
    makeStyles
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import historical from '../../images/faq/historical.png';
import offline from '../../images/faq/offline.png';
import online from '../../images/faq/online.png';
import usgsCalculations from '../../images/faq/usgs_calculations.png';

const useStyle = makeStyles({
    container: {
        paddingBottom: 40
    },
    header: {
        verticalAlign: 'text-top',
        margin: '20px auto'
    },
    panel: {
        margin: '20px auto'
    }
});

const FAQ = () => {
    const classes = useStyle();
    return (
        <Container className={classes.container}>
            <Typography
                className={classes.header}
                variant="h4"
                noWrap
                gutterBottom
            >
                Frequently Asked Questions (FAQ)
            </Typography>
            <Divider />

            <ExpansionPanel>
                <ExpansionPanelSummary
                    className={classes.panel}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        Q: How are gaps in data filled? How are load and cumulative load calculated?
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        A: Read this document.
                    </Typography>
                    <object data={usgsCalculations} width="75%" height="75%"> </object>
                </ExpansionPanelDetails>
            </ExpansionPanel>

            <ExpansionPanel>
                <ExpansionPanelSummary
                    className={classes.panel}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        Q: Definitions of continuous and static stations.
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        <b>Continuous Online:</b> A station that is updated daily and is showing data within the last
                        five days.
                        <img src={online} alt="online" />
                        <br />
                        <b>Continuous Offline:</b> A station that is updated daily and is NOT showing data within the
                        last five days.
                        <img src={offline} alt="offline" />
                        <br />
                        <b>Static:</b> A station that is not updated on a regular basis and only shows historical data.
                        <img src={historical} alt="historical" />
                        <br />
                        <i>
                            The pills that show in the accordion of the explore page appear like the pill to the right
                            of each definition. The markers on the map of the explore page have the same border color
                            as the pill. In the detail view above the graphs, there is text classifying the sensor as
                            online, offline, or static.
                        </i>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </Container>
    );
};

export default FAQ;
