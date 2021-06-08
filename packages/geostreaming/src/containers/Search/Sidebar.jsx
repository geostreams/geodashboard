/* eslint-disable react/prop-types */
// @flow
import React, { useState } from 'react';
import {
    Box,
    makeStyles
} from '@material-ui/core';
import BaseSidebar from '@geostreams/core/src/components/theme/BaseSidebar';
import { useDispatch, useSelector } from 'react-redux';
import SourcesIcon from '@material-ui/icons/GroupWork';
import LocationIcon from '@material-ui/icons/LocationOn';
import ParametersIcon from '@material-ui/icons/Description';
import TimeIcon from '@material-ui/icons/Timelapse';
import OnlineIcon from '@material-ui/icons/OfflineBolt';
import Filter from './filters/Filter';
import sanitizeParameters from '../../utils/parameters';
import { setFilter, removeFilter, resetCustomLocation } from '../../actions/search';
import DownloadButtons from './DownloadButtons';
import type { LocationType } from '../../utils/flowtype';

const useStyles = makeStyles(() => ({
    content: {
        height: '100%'
    },
    filters: {
        height: '92%',
        width: '100%',
        overflowY: 'scroll'
    },
    sidebarContainer: {
        background: '#f5f7f9'
    }
}));

type Props = {
    sensorCount: Number,
    drawMode: boolean,
    toggleDrawMode: () => void,
    minMaxDates: []
}

const Sidebar = (props: Props) => {
    const { sensorCount, drawMode, toggleDrawMode, minMaxDates } = props;
    const [isSidebarOpen, toggleSidebar] = useState(true);
    const [currentFilter, setCurrentFilter] = useState('Locations');
    const { filters, custom_location } = useSelector(state => state.search);
    const locations: LocationType[] = useSelector(state => state.config.locations);
    const { sources, sensors } = useSelector(state => state.__new_sensors);
    const parameters = useSelector(state => state.__new_parameters.parameters.filter(param => param.search_view));

    const dispatch = useDispatch();
    const classes = useStyles();

    const params = sanitizeParameters(sensors, parameters);

    const openFilter = (id, value) => {
        if(value === false && currentFilter === id){
            setCurrentFilter('none');
        } else if(value){
            setCurrentFilter(id);
        }
    };

    const getAllLocations = () => {
        let loc = locations;
        if(Array.isArray(loc) && custom_location && 'properties' in custom_location){
            loc = [custom_location, ...locations];
        }
        return loc.map(({ properties: { title, id } }) => ({ label:title, id }));
    };

    const customDrawButton = () => {
        const title = 'New Custom Location';
        const action = () => {
            toggleDrawMode(true);
            if(custom_location && 'geometry' in custom_location){
                dispatch(resetCustomLocation());
            }
            dispatch(setFilter('locations', ['custom_location']));

        };
        return{ title, action, props: { disabled: drawMode } };
    };
    return (
        <BaseSidebar
            classes={{ drawerPaper: classes.sidebarContainer, content: classes.content }}
            toggleSidebar={toggleSidebar}
            expanded={isSidebarOpen}
            disableGutters
        >
            <Box className={classes.filters}>
                <Filter
                    type="singleSelect"
                    title="Locations" 
                    icon={LocationIcon}
                    value={filters.locations || []}
                    onChange={(query)=>dispatch(setFilter('locations', query))}
                    onReset={()=>dispatch(removeFilter('locations'))}
                    options={getAllLocations()} 
                    action={[customDrawButton()]}
                    isExpanded={currentFilter === 'Locations' }
                    toggleExpandedState={(v)=> openFilter('Locations', v)}
                />
                <Filter  
                    type="multiSelect"
                    title="Parameters" 
                    icon={ParametersIcon}
                    value={filters.parameters || []}
                    onChange={(query)=>dispatch(setFilter('parameters', query))}
                    onReset={()=>dispatch(removeFilter('parameters'))}
                    options={params} 
                    isExpanded={currentFilter === 'Parameters' }
                    toggleExpandedState={(v)=> openFilter('Parameters', v)}                
                />
                <Filter  
                    type="multiSelect"
                    title="Data Sources" 
                    icon={SourcesIcon}
                    value={filters.sources || []}
                    onChange={(query)=>dispatch(setFilter('sources', query))}
                    onReset={()=>dispatch(removeFilter('sources'))}
                    options={sources} 
                    isExpanded={currentFilter === 'Data Sources' }
                    toggleExpandedState={(v)=> openFilter('Data Sources', v)}   
                />
                <Filter  
                    type="boolean"
                    title="Online" 
                    icon={OnlineIcon}
                    value={filters.online || []}
                    onChange={(query)=>dispatch(setFilter('online', query))}
                    onReset={()=>dispatch(removeFilter('online'))}
                    options={[{ label: 'Online', id: true }, { label: 'Offline', id: false }]} 
                    isExpanded={currentFilter === 'Online' }
                    toggleExpandedState={(v)=> openFilter('Online', v)}                  
                />
                <Filter  
                    type="dateRange"
                    title="Date" 
                    icon={TimeIcon}
                    value={filters.time || []}
                    onChange={(query)=>dispatch(setFilter('time', query))}
                    onReset={()=>dispatch(removeFilter('time'))}
                    isExpanded={currentFilter === 'Date' }
                    toggleExpandedState={(v)=> openFilter('Date', v)}  
                    minMaxDates={minMaxDates}                
                />
            </Box>
            <DownloadButtons
                sensorCount={sensorCount}
                locations={locations}
            />
        </BaseSidebar>
    );
};

export default Sidebar;
