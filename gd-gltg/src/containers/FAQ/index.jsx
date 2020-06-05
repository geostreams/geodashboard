// @flow
import React from 'react';
import {
    Container,
    Divider,
    ExpansionPanel,
    ExpansionPanelSummary,
    ExpansionPanelDetails,
    Paper,
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
    },
    summary: {
        margin: 10,
        padding: 10
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
            <ExpansionPanel>
                <ExpansionPanelSummary
                    className={classes.panel}
                    expandIcon={<ExpandMoreIcon />}
                >
                    <Typography>
                        Q: What is the source of the HUC-8 data?
                    </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <Typography>
                        A: The data was compiled by Dr. Greg McIsaac as part of the Illinois Nutrient Loss Reduction
                        Strategy Science Assessment and Update.
                        Here is the summary of the report:
                        <br />
                        <Paper className={classes.summary} elevation={1}>
                            The purpose of this report was to update estimates and quantify changes in riverine
                            nitrate-N and total phosphorus (TP) loads and yields in Illinois as part of the Illinois
                            Nutrient Loss Reduction Strategy (NLRS) process. Using river flow data from the USGS and
                            concentration data from IEPA, USGS, Metropolitan Water Reclamation District of Greater
                            Chicago (MWRD),the Fox River Study Group (FRSG) and University of Illinois, nitrate-N and
                            total phosphorus (TP) loads for the eight major rivers draining Illinois were calculated
                            through the 2017 water year and aggregated to estimate state wide annual losses.
                            For the five year period from 2013-17 the statewide water flow, nitrate-N loads and TP
                            loads were estimated to be 13%, 7% and 26% above the 1980-96 baseline period. Much of the
                            increase in the nitrate load occurred in the Rock River while much of the increase in TP
                            load occurred in the Illinois River. Point source discharges of total N (TN) and TP for the
                            2017 calendar year were provided by IEPA. Statewide, point source TN discharge was about 75
                            million lb/yr, or about 14% less than the previous estimate for 2011. TP discharge from
                            point sources for 2017 was estimated to be 14 million lb/yr or about 22% less than the 2011
                            estimate of 18 million lb/yr. Nitrate and TP yields were also estimated for the eight digit
                            hydrologic units (HUC8s). In general, 2012-17 nitrate-N yields were similar to values
                            calculated for 1997-2011. For HUCs with nitrate-N yield greater than 11 lb N/ac-yr, changes
                            in nitrate yield were correlated with change in water yield. For three HUCs in north western
                            Illinois (Mackinaw, Spoon, and Flint Henderson) there appeared to be some reduction in
                            nitrate-N yield independent of changes in water yield. Changes in estimation methods used
                            for the Lower Illinois River and Lower Sangamon River resulted in lower estimates of
                            nitrate-N loads for these HUCs. Reductions in TP yield from the Des Plaines and Chicago HUCs
                            of 15 and 27%, respectively, corresponded to reductions in point source discharges in those
                            HUCs. On the other hand, increases in TP yield were calculated for the Upper Sangamon,
                            Macoupin and several other HUCs. Suggestions for improving future nutrient loss assessments
                            include more frequent river sampling, especially for phosphorus at high flows, and
                            identifying relationships between monitored nutrient loads and watershed characteristics
                            to estimate loads from unmonitored areas.
                        </Paper>
                        All data can be found here:&nbsp;
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www2.illinois.gov/epa/topics/water-quality/watershed-management/excess-nutrients/Documents/NLRS_SCIENCE_ASSESSMENT_UPDATE_2019%20v7_FINAL%20VERSION_web.pdf"
                        >
                            NLRS-Biennial-Report-2019
                        </a>
                    </Typography>
                </ExpansionPanelDetails>
            </ExpansionPanel>

        </Container>
    );
};

export default FAQ;
