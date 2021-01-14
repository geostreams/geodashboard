// @flow
import React from 'react';
import { connect } from 'react-redux';
import { interpolateRgb } from 'd3';
import {
    Box,
    Button,
    Checkbox,
    Grid,
    Typography,
    IconButton,
    makeStyles
} from '@material-ui/core';
import CircleCheckedFilledIcon from '@material-ui/icons/CheckCircle';
import CircleUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import BaseSidebar from 'gd-core/src/components/theme/BaseSidebar';
import SidebarCategory from 'gd-core/src/components/theme/SidebarCategory';
import { entries } from 'gd-core/src/utils/array';
import { Skeleton } from '@material-ui/lab';
import type { SensorType, SourceConfig } from '../../utils/flowtype';
import { getSourceColor } from '../../utils/sensors';
import InfoDialog from './InfoDialog';

const useStyle = makeStyles(()=>({
    categoryHeader: {
        background: '#5f99c1',
        color: '#ffff',
        lineHeight: 2,
        fontSize: 'x-large !important',
        fontWeight: 700,
        paddingLeft: 5,
        borderRadius: 4
    },
    categoryDropDown: {
        alignSelf: 'center',
        position: 'initial'

    },
    sourceHeader: {
        background: '#e6ecf1',
        justifyContent: 'space-between',
        borderRadius: 4,
        overflow: 'hidden',
        paddingRight: 2
    },
    headerPlaceholder: {
        borderRadius: 4,
        marginBottom: 6,
        marginTop: 6
    },
    sourceCheckbox: {
        background: 'transparent',
        height: '100%',
        minHeight: 60,
        display: 'flex',
        justifyContent: 'center'
    },
    sourceLabel: {
        fontWeight: '500',
        padding: '1em',
        fontSize: '15px !important',
        lineHeight: '24px'
    },
    regionHeader: {
        paddingLeft: '10px !important',
        marginTop: 1,
        marginBottom: 1,
        height: 38,
        borderRadius: 4,
        alignItems: 'stretch',
        alignContent: 'center'
    },
    sensorButton: {
        margin: 5
    },
    sourceContent: {
        marginRight: 5
    }
}));

type Props = {
    data: {
        [sourceId: string]: {
            sensorCount: number,
            regions: {
                [regionId: string]: SensorType[]
            }
        }
    };
    sourcesConfig: { [k: string]: SourceConfig; };
    sources: Object;
    selectedFeature: ?number;
    addRegionsToMap: Function;
    removeRegionsFromMap: Function;
    handlePopupOpen: Function;
    handlePopupClose: Function;
}

const Sidebar = ({
    data,
    sourcesConfig,
    sources,
    selectedFeature,
    addRegionsToMap,
    removeRegionsFromMap,
    handlePopupOpen,
    handlePopupClose
}: Props) => {
    const classes = useStyle();

    const [removedSources, updateRemovedSources] = React.useState({});
    const [isSidebarOpen, toggleSidebar] = React.useState(true);
    const [infoDialogControl, toggleInfoDialog] = React.useState(false);
    const [selectedSourceId, setSourceId] = React.useState('');

    const handleInfoDialog = (e, id)=> {
        e.stopPropagation();
        setSourceId(id);
        toggleInfoDialog(true);
    };

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
        <BaseSidebar 
            toggleSidebar={toggleSidebar}
            expanded={isSidebarOpen}
        >
            <SidebarCategory 
                key="sidebarcat"
                title="Explore Sources"
                classes={{ 
                    header: classes.categoryHeader, 
                    content: classes.sourceContent, 
                    icon: classes.categoryDropDown 
                }}
                defaultOpen>
                {sources.map((source) => {
                    const primaryColor = getSourceColor(sourcesConfig[source.id]);
                    const secondaryColor = interpolateRgb(primaryColor, '#fff')(0.8);
                    if(!data)
                        return <Skeleton key={`placeholder-${source.id}-${source.label}`} classes={{ root: classes.headerPlaceholder }} variant="rect" width={375} height={50} />; 
                    return (
                        <SidebarCategory
                            key={`${source.id}-${source.label}-main`}
                            classes={{ header: classes.sourceHeader }}
                            title={
                                <Grid
                                    container
                                    alignContent="center"
                                    alignItems="center"
                                    wrap="nowrap"
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
                                    <>
                                        <Grid className={classes.sourceLabel} item xs={7}>
                                            {source.label}
                                        </Grid>
                                        <Grid className="centeredText" item xs={3}>
                                    ({data[source.id].sensorCount})
                                        </Grid>
                                        <IconButton style={{ alignSelf: 'flex-start' }} onClick={(e)=>handleInfoDialog(e,source.id)} 
                                            edge="end" 
                                            size="small" 
                                            id={`info-icon-${classes.sourceCheckbox} `}
                                            color="primary"
                                            alignItems="flex-start"
                                        >
                                            <InfoOutlinedIcon id={`info-icon-${classes.sourceCheckbox} `} />
                                        </IconButton>
                                    </>

                                </Grid> 
                            }
                        >
                            {data ? entries(data[source.id].regions).map(([region, sensors]) => (
                                <SidebarCategory 
                                    key={`${source.id}-${region}-main`}
                                    classes={{ 
                                        header: classes.regionHeader, 
                                        icon: classes.categoryDropDown 
                                    }}
                                    backgroundColor= {secondaryColor}
                                    title={<Typography variant="subtitle2">
                                        {region} ({sensors.length})
                                    </Typography>}
                                >
                                    <Box idx={`${source.id}-${region}-sensors`} display="flex" flexWrap="wrap">
                                        {sensors.map((sensor) => (
                                            <Button
                                                key={sensor.idx}
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
                                </SidebarCategory>
                            )) : <Skeleton />}
                        </SidebarCategory>
                    );
                })}
            </SidebarCategory>
            <InfoDialog
                dialogControl={infoDialogControl}
                sourceInfo={sourcesConfig[selectedSourceId]}
                toggleDialog={toggleInfoDialog}
            />
        </BaseSidebar>
    );
};

const mapStateToProps = (state) => ({
    sourcesConfig: state.config.source
});

export default connect(mapStateToProps)(Sidebar);
