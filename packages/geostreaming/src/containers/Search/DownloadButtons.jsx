// @flow
import React, { useState } from 'react';
import {
    Backdrop,
    CircularProgress,
    Typography,
    Button,
    Box,
    makeStyles
} from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/SystemUpdateAlt';
import LinkIcon from '@material-ui/icons/Link';
import { serialize } from '@geostreams/core/src/utils/array';
import { useSelector, useDispatch } from 'react-redux';
import { callAPI } from '@geostreams/core/src/utils/io';
import logger from '@geostreams/core/src/utils/logger';
import type { LocationType } from '../../utils/flowtype';
import Alert from './Alert';



const useStyles = makeStyles(() => ({
    controlpanel: {
        width: '100%',
        height: '8%',
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    count: {
        color: 'gray',
        height: '12px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    backdrop: {
        zIndex: 1,
        display: 'flex',
        flexDirection: 'column'
    }
}));

type Props = {
    sensorCount: Number,
    locations: LocationType[];
}

const DownloadButtons = (props: Props) => {
    const { sensorCount, locations } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    const { filters, custom_location } = useSelector(state => state.search);
    const config = useSelector(state => state.config);
    const [downloadState, setDownloadState] = useState('ready');
    const [alert, setAlert] = useState({ title: '', message: '' });

    const setError = (message) =>{
        setAlert({ 
            title: 'Error', 
            message
        });
    };
    

    const generateLink = (type: string) => {

        let downloadApi;

        const params = {};
        if (type !== 'count') {
            params.format = type;
            downloadApi = '/api/datapoints/download?';
        } else {
            downloadApi = '/api/datapoints?onlyCount=true&';
        }
        if (filters.time.length === 2) {
            params.since = filters.time[0].toISOString().slice(0, 10);
            params.until = filters.time[1].toISOString().slice(0, 10);
        }

        if (filters.sources.length > 0) {
            params.sources = filters.sources;
        }
        if (filters.parameters.length > 0) {
            params.attributes = filters.parameters;
        }
        if(filters.locations.length > 0){
            // If we have a defined custom location
            if(custom_location && 'geometry' in custom_location){
                const{ geometry:{ type: shapeType, properties, coordinates } } = custom_location;
                if(shapeType === 'Circle'){
                    // Add center and radius to geocode if circle
                    params.geocode = [properties.center[1],properties.center[0],properties.radius].join(',');
                } else{
                    // Else, stringify as is
                    params.geocode = coordinates[0].map((coordinate) => [coordinate[1], coordinate[0]]).join(',');
                }
            } else if(filters.locations[0] !== 'custom'){
                const area = locations.find((loc)=> loc.properties.id === filters.locations[0]);
                if (area && area.geometry) {
                    params.geocode = area.geometry.coordinates[0].map((coordinate) => 
                        // swap coordinate
                        [coordinate[1], coordinate[0]]).join(',');
                }
            }
        }

        const link = serialize(params);

        return downloadApi + link;
    };

    const fetchDatapointsCount = (callback) => {
        const link = generateLink('count');

        callAPI(
            config.geostreamingEndpoint,
            link,
            callback,
            logger.error,
            dispatch
        );
    };

    const onDownload = (type) => {
        setDownloadState('count-initiated');
        fetchDatapointsCount((datapointsCount)=> {
            if(datapointsCount > 500){
                setDownloadState('error');
                setError(`${datapointsCount} datapoints selected. Please narrow down your selection.` );
            } else {
                try {
                    if(downloadState === 'count-initiated'){
                        const link = generateLink(type);
                        window.open(link);
                        setDownloadState('link-ready');
                    }
                } catch (e) {
                    setDownloadState('error');
                    setError('An error was encountered. Please try again.');
                    logger.error(e);
                }
            }
        });
    };

    const onPermaLink = () => {
        setDownloadState('count-initiated');
        fetchDatapointsCount((datapointsCount)=> {
            if(datapointsCount > 500){
                setDownloadState('error');
                setError(`${datapointsCount} datapoints selected. Please narrow down your selection.` );
            } else {
                try {
                    if(downloadState === 'count-initiated'){
                        const link = generateLink('csv');
                        setAlert({
                            title: 'Download Link',
                            message: link
                        });
                        setDownloadState('ready');
                    }
                } catch (e) {
                    setDownloadState('error');
                    setError('An error was encountered. Please try again.');
                    logger.error(e);
                }
            }
        });
    };


    return (
        <>
            <Box className={classes.count}>
                <Typography variant="overline">
                        Selected Sites Count: {sensorCount}
                </Typography>
            </Box>
            <Box className={classes.controlpanel} >
                <Button 
                    startIcon={<DownloadIcon />} 
                    variant="outlined" 
                    color="primary" 
                    size="large"
                    onClick={()=> onDownload('csv')}
                >
                    Download
                </Button>
                <Button 
                    startIcon={<LinkIcon />} 
                    variant="outlined" 
                    color="secondary" 
                    size="large"
                    onClick={()=> onPermaLink()}
                >
                    Get Permalink
                </Button>
            </Box>
            <Backdrop className={classes.backdrop} open={downloadState !== 'ready'} >
                <CircularProgress color="inherit" />
                <Button onClick={()=> setDownloadState('ready')}> Cancel </Button>
            </Backdrop>
            <Alert 
                open={downloadState === 'error' || downloadState === 'link-ready'}
                title="Error"
                message={alert}
                toggleState={() => setDownloadState('ready')}
            />
        </>
    );
};

export default DownloadButtons;
