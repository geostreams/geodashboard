// @flow
import React from 'react';
import { interpolateRgb } from 'd3';
import {
    Box,
    Button,
    Checkbox,
    Container,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import CircleCheckedFilledIcon from '@material-ui/icons/CheckCircle';
import CircleUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { entries } from 'gd-core/src/utils/array';

import { getSourceColor } from '../../utils/sensors';
import type { SensorType, SourceType } from '../../utils/flowtype';

const useStyle = makeStyles({
    header: {
        margin: '30px auto'
    },
    accordion: {
        'boxShadow': 'none',
        '&::before': {
            background: 'none'
        }
    },
    expandIcon: {
        position: 'absolute',
        right: 0
    },
    sourceHeaderContent: {
        background: '#e6ecf1'
    },
    sourceCheckbox: {
        background: 'transparent'
    },
    sourceLabel: {
        paddingLeft: '10px !important'
    },
    regionHeader: {
        paddingLeft: '10px !important',
        marginTop: 10,
        height: 38,
        minHeight: '0 !important'
    },
    sensorButton: {
        margin: 5
    }
});

type Props = {
    data: {
        [sourceId: string]: {
            sensorCount: number,
            regions: {
                [regionId: string]: SensorType[]
            }
        }
    };
    sources: SourceType[];
    selectedFeature: ?number;
    addRegionsToMap: Function;
    removeRegionsFromMap: Function;
    handlePopupOpen: Function;
    handlePopupClose: Function;
}

const Sidebar = ({
    data,
    sources,
    selectedFeature,
    addRegionsToMap,
    removeRegionsFromMap,
    handlePopupOpen,
    handlePopupClose
}: Props) => {
    const classes = useStyle();

    const [removedSources, updateRemovedSources] = React.useState({});
    const handleSourceClick = (e, sourceId) => {
        e.stopPropagation();
        const regions = data[sourceId].regions;
        if (removedSources[sourceId]) {
            // deselect
            updateRemovedSources({ ...removedSources, [sourceId]: false });
            addRegionsToMap(regions);
        } else {
            // select
            updateRemovedSources({ ...removedSources, [sourceId]: true });
            removeRegionsFromMap(regions);
        }
    };

    const handleSensorClick = (sensorIdx) => {
        if (sensorIdx === selectedFeature) {
            handlePopupClose();
        } else {
            handlePopupOpen(sensorIdx);
        }
    };

    return (
        <Container>
            <Typography
                className={classes.header}
                variant="h6"
            >
                Explore Sources
            </Typography>
            {sources.map((source) => {
                const primaryColor = getSourceColor(source.id);
                const secondaryColor = interpolateRgb(primaryColor, '#fff')(0.8);
                return (
                    <ExpansionPanel
                        key={`${source.id}-${source.label}`}
                        className={classes.accordion}
                        TransitionProps={{ timeout: 0, unmountOnExit: true }}
                    >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            className="noPadding"
                            classes={{
                                content: `${classes.sourceHeaderContent} noMargin`,
                                expandIcon: classes.expandIcon
                            }}
                        >
                            <Grid
                                container
                                alignContent="center"
                                alignItems="center"
                            >
                                <Grid
                                    className={`${classes.sourceCheckbox} centeredText`}
                                    item
                                    xs={2}
                                    style={{ background: primaryColor }}
                                    onClick={(e) => handleSourceClick(e, source.id)}
                                >
                                    <Checkbox
                                        defaultChecked
                                        icon={<CircleUncheckedIcon htmlColor="white" />}
                                        checkedIcon={<CircleCheckedFilledIcon htmlColor="white" />}
                                    />
                                </Grid>
                                <Grid className={classes.sourceLabel} item xs={7}>
                                    {source.label}
                                </Grid>
                                <Grid className="centeredText" item xs={3}>
                                    ({data[source.id].sensorCount})
                                </Grid>
                            </Grid>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className="noPadding">
                            <Container className="noPadding">
                                {entries(data[source.id].regions).map(([region, sensors]) => (
                                    <ExpansionPanel
                                        key={region}
                                        className={classes.accordion}
                                        TransitionProps={{ timeout: 0, unmountOnExit: true }}
                                    >
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            className={`${classes.regionHeader} noPadding`}
                                            classes={{
                                                content: 'noMargin'
                                            }}
                                            style={{ background: secondaryColor }}
                                        >
                                            <Typography variant="subtitle2">
                                                {region} ({sensors.length})
                                            </Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Box display="flex" flexWrap="wrap">
                                                {sensors.map((sensor) => (
                                                    <Button
                                                        key={sensor.id}
                                                        className={classes.sensorButton}
                                                        style={{
                                                            background: selectedFeature === sensor.idx ?
                                                                primaryColor :
                                                                secondaryColor
                                                        }}
                                                        size="small"
                                                        onClick={() => handleSensorClick(sensor.idx)}
                                                    >
                                                        {sensor.name}
                                                    </Button>
                                                ))}
                                            </Box>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                ))}
                            </Container>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                );
            })}
        </Container>
    );
};

export default Sidebar;
