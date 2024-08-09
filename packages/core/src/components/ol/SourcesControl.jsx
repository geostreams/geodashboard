// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { interpolateRgb } from 'd3';
import {
    Box,
    Button,
    Checkbox,
    Grid,
    Typography,
    IconButton,
    makeStyles,
    Card,
    CardContent,
    List
} from '@material-ui/core';
import CircleCheckedFilledIcon from '@material-ui/icons/CheckCircle';
import CircleUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { Skeleton } from '@material-ui/lab';
import BaseSidebar from '@geostreams/core/src/components/theme/BaseSidebar';
import SidebarCategory from '@geostreams/core/src/components/theme/SidebarCategory';
import { entries } from '@geostreams/core/src/utils/array';
import CloseIcon from '@material-ui/icons/Close';
import { getSourceColor } from '../../utils/sensors';
import type { SensorType, SourceConfig } from '../../utils/flowtype';
import InfoDialog from './InfoDialog';

const useStyles = makeStyles((theme) => ({
    button: {
        width: '15em !important',
        height: '2em !important',
        display: 'block',
        margin: '1px',
        padding: '0',
        color: 'white',
        fontSize: '1.14em',
        fontWeight: 'bold',
        textDecoration: 'none',
        textAlign: 'center',
        lineHeight: '.4em',
        backgroundColor: 'rgba(0,60,136,0.5)',
        border: 'none',
        borderRadius: '2px'
    
    },
    card: {
        width: 320
    },
    cardContent: {
        padding: 6,
        height: 'calc(100vh - 12em)',
        overflowY: 'auto'
    },
    cardHeader: {
        background: '#467a9e',
        color: '#fff',
        padding: 6
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1.5),
        top: theme.spacing(1),
        background: 'none !important'
    },
    checkbox: {
        minWidth: 0
    },
    legendLabelRoot: {
        minHeight: 0,
        flexDirection: 'row-reverse'
    },
    legendLabelContent: {
        margin: 0,
        padding: 0
    },
    legendImage: {
        width: '90%'
    },
    opacitySlider: {
        width: '80%',
        margin: 'auto'
    },
    divider: {
        'width': '80%',
        'margin': 'auto',
        '&:last-child': {
            display: 'none'
        }
    },
    categoryHeader: {
        background: '#5f99c1',
        color: '#ffff',
        lineHeight: 2,
        fontSize: 'x-large !important',
        fontWeight: 700,
        paddingLeft: 5
    },
    categoryDropDown: {
        alignSelf: 'center',
        position: 'initial'
    },
    sourceHeader: {
        background: '#e6ecf1',
        justifyContent: 'space-between',
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
  el: HTMLElement,
  data: ?{
    [sourceId: string]: {
      sensorCount: number,
      regions: {
        [regionId: string]: SensorType[],
      },
    },
  },
  sourcesConfig: { [k: string]: SourceConfig },
  sources: Object,
  selectedFeature: ?{ idx: number, zoom: boolean },
  toggleRegions: (sourcesVisibility: { [sourceId: string]: boolean }) => void,
  handlePopupOpen: (feature: number) => void,
  handlePopupClose: () => void,
};

const SourcesControl = ({
    el,
    data,
    sourcesConfig,
    sources,
    filterSources,
    selectedFeature,
    toggleRegions,
    handlePopupOpen,
    handlePopupClose
}: Props) => {
    const classes = useStyles();

    const [sourcesVisibility, updateSourcesVisibility] = React.useState<{
    [sourceId: string]: boolean,
  }>({});
    const [allSourcesVisibility, updateAllSourcesVisibility] = React.useState<boolean>(true);
    const [isSidebarOpen, toggleSidebar] = React.useState(true);
    const [infoDialogControl, toggleInfoDialog] = React.useState(false);
    const [selectedSourceId, setSourceId] = React.useState('');
    const [showSensors, updateShowSensors] = React.useState(false);

    React.useEffect(() => {
    // When new data comes in, make all sources visible.
        if (data) {
            const updatedSourcesVisibility = Object.keys(data).reduce(
                (regionsVisibility, sourceId) => {
                    regionsVisibility[sourceId] = true;
                    return regionsVisibility;
                },
                {}
            );
            updateSourcesVisibility(updatedSourcesVisibility);
            toggleRegions(updatedSourcesVisibility);
        }
    }, [data]);

    const handleInfoDialog = (e, id) => {
        e.stopPropagation();
        setSourceId(id);
        toggleInfoDialog(true);
    };

    const toggleSource = (e, sourceId) => {
        e.stopPropagation();
        if (data) {
            const updatedSourcesVisibility = {
                ...sourcesVisibility,
                [sourceId]: !sourcesVisibility[sourceId]
            };
            updateSourcesVisibility(updatedSourcesVisibility);
            toggleRegions(updatedSourcesVisibility);
        }
    };

    const toggleAllSources = () => {
        if (data) {
            const updatedSourcesVisibility = Object.keys(data).reduce(
                (regionsVisibility, sourceId) => {
                    regionsVisibility[sourceId] = !allSourcesVisibility;
                    return regionsVisibility;
                },
                {}
            );
            updateSourcesVisibility(updatedSourcesVisibility);
            toggleRegions(updatedSourcesVisibility);
            updateAllSourcesVisibility(!allSourcesVisibility);
        }
    };

    const handleSensorClick = (sensorIdx) => {
        if (selectedFeature && selectedFeature.idx === sensorIdx) {
            handlePopupClose();
        } else {
            handlePopupOpen(sensorIdx);
        }
    };

    const getStatusStyle = (sensor) => {
        switch (sensor.properties.online_status) {
            case 'online':
                return '.15rem solid green';
            case 'offline':
                return '.15rem dashed red';
            default:
                return 'none';
        }
    };

    let filteredSources = sources;
    // Filter sources by id checking if it is in sourcesConfig
    if (filterSources) {
        filteredSources = sources.filter((source) => sourcesConfig[source.id]);
    }


    return ReactDOM.createPortal(
        <>
            <Button
                className={`${classes.button} ${showSensors ? 'hidden' : ''}`}
                onClick={() => updateShowSensors(true)}
            >
        Monitoring Locations
            </Button>
            <Card className={`${classes.card} ${showSensors ? '' : 'hidden'}`} square>
                <CardContent className={classes.cardHeader}>
                    <Typography gutterBottom variant="h6">
            Monitoring Locations
                    </Typography>
                    <IconButton
                        className={classes.closeButton}
                        size="small"
                        onClick={() => updateShowSensors(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </CardContent>
                <CardContent className={classes.cardContent}>
                    <List>
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
                                style={{ background: '#143849' }}
                                onClick={(e) => toggleAllSources(e)}
                            >
                                <Checkbox
                                    checked={allSourcesVisibility}
                                    icon={<CircleUncheckedIcon htmlColor="white" />}
                                    checkedIcon={
                                        <CircleCheckedFilledIcon htmlColor="white" />
                                    }
                                />
                            </Grid>
                            <Grid className={classes.sourceLabel} item xs={12}>
                                <Typography gutterBottom variant="subtitle1">
                                            Switch on/off all sources
                                </Typography>
                            </Grid>
                        </Grid>
                        {filteredSources.map((source) => {
                            const primaryColor = getSourceColor(sourcesConfig[source.id]);
                            const secondaryColor = interpolateRgb(primaryColor, '#FFF')(0.8);
                            if (!data)
                                return (
                                    <Skeleton
                                        key={`placeholder-${source.id}-${source.label}`}
                                        classes={{ root: classes.headerPlaceholder }}
                                        variant="rect"
                                        width={375}
                                        height={50}
                                    />
                                );
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
                                                onClick={(e) => toggleSource(e, source.id)}
                                            >
                                                <Checkbox
                                                    checked={!!sourcesVisibility[source.id]}
                                                    icon={<CircleUncheckedIcon htmlColor="white" />}
                                                    checkedIcon={
                                                        <CircleCheckedFilledIcon htmlColor="white" />
                                                    }
                                                />
                                            </Grid>
                                            <>
                                                <Grid className={classes.sourceLabel} item xs={7}>
                                                    {source.label}
                                                </Grid>
                                                <Grid className="centeredText" item xs={3}>
                                                    {data[source.id].sensorCount}
                                                </Grid>
                                                <IconButton
                                                    style={{ alignSelf: 'flex-start' }}
                                                    onClick={(e) => handleInfoDialog(e, source.id)}
                                                    edge="end"
                                                    size="small"
                                                    id={`info-icon-${classes.sourceCheckbox} `}
                                                    color="primary"
                                                >
                                                    <InfoOutlinedIcon
                                                        id={`info-icon-${classes.sourceCheckbox} `}
                                                    />
                                                </IconButton>
                                            </>
                                        </Grid>
                                    }
                                >
                                    {data ? (
                                        entries(data[source.id].regions)
                                            .sort()
                                            .map(([region, sensors]) => (
                                                <SidebarCategory
                                                    key={`${source.id}-${region}-main`}
                                                    classes={{
                                                        header: classes.regionHeader,
                                                        icon: classes.categoryDropDown
                                                    }}
                                                    backgroundColor={secondaryColor}
                                                    title={
                                                        <Typography variant="subtitle2">
                                                            {region} ({sensors.length})
                                                        </Typography>
                                                    }
                                                >
                                                    <Box
                                                        id={`${source.id}-${region}-sensors`}
                                                        display="flex"
                                                        flexWrap="wrap"
                                                    >
                                                        {sensors.map((sensor) => (
                                                            <Button
                                                                key={sensor.id}
                                                                className={classes.sensorButton}
                                                                style={{
                                                                    background:
                                    selectedFeature &&
                                    selectedFeature.idx === sensor.idx ?
                                        primaryColor :
                                        secondaryColor,
                                                                    border: getStatusStyle(sensor),
                                                                    width: 'auto',
                                                                    padding: '6px 6px',
                                                                    overflow: 'ellipsis'
                                                                }}
                                                                size="small"
                                                                disabled={!sourcesVisibility[source.id]}
                                                                onClick={() => handleSensorClick(sensor.idx)}
                                                            >
                                                                {sensor.name}
                                                            </Button>
                                                        ))}
                                                    </Box>
                                                </SidebarCategory>
                                            ))
                                    ) : (
                                        <Skeleton />
                                    )}
                                </SidebarCategory>
                            );
                        })}
                    </List>
                </CardContent>
            </Card>
        </>, el
    );
};

export default SourcesControl;
