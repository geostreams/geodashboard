// @flow
import React, { useState } from 'react';
import {
    Typography,
    Button,
    Box,
    makeStyles
} from '@material-ui/core';
import DownloadIcon from '@material-ui/icons/SystemUpdateAlt';
import LinkIcon from '@material-ui/icons/Link';
import { serialize } from '@geostreams/core/src/utils/array';
import { useSelector, useDispatch } from 'react-redux';
import type { LocationType } from '../../utils/flowtype';
import { fetchDataPointsCount } from '../../actions/search';


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
    
    const { filters, custom_location } = useSelector(state => state.__new_searchFilters);
    

    const generateLink = (type: string) => {

        let downloadApi;

        const params = {};
        if (type !== 'None') {
            params.format = type;
            downloadApi = '/geostreams/datapoints/download?';
        } else {
            downloadApi = '/geostreams/api/datapoints?';
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
        console.log(link);

        return downloadApi + link;
    };

    const countDatapoints = () => {
        const countLink = `${generateLink('None') }&onlyCount=true`;

        dispatch(fetchDataPointsCount(countLink));
        // props.onSelectDownload(countLink);

        // return (
        //     intervalCounts(
        //         that.state.numDatapoints, that.props.show_spinner
        //     )
        // );
    };

    const onDownload = (type) => {
        // setState({ downloadIsOpen: false, loading: true });
        countDatapoints().then((datapointsCount) => {
            if (datapointsCount <= 500) {
                // Download the CSV File
                try {
                    const link = generateLink(type);
                    window.open(link);
                } catch (e) {
                    setState({
                        alertIsOpen: true,
                        error_text: 'Some error occured.Could not download datapoints.'
                    });
                }
            } else {
                setState({
                    alertIsOpen: true,
                    error_text: 'Too many datapoints selected. Please narrow down your selection.'
                });
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
                    onClick={()=> onDownload()}
                >
                    Get Permalink
                </Button>
            </Box>
        </>
    );
};

export default DownloadButtons;
