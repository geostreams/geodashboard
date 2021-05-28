/* eslint-disable react/prop-types */
/* eslint-disable no-console */
// @flow
import React from 'react';
import {
    makeStyles
} from '@material-ui/core';
import BaseSidebar from '@geostreams/core/src/components/theme/BaseSidebar';
import { useDispatch, useSelector } from 'react-redux';
import SourcesIcon from '@material-ui/icons/GroupWork';
import LocationIcon from '@material-ui/icons/LocationOn';
import ParametersIcon from '@material-ui/icons/Description';
import Filter from './filters/Filter';
import sanitizeParameters from '../../utils/parameters';
import { setFilter, removeFilter } from '../../actions/search';

const useStyles = makeStyles(() => ({
}));


const Sidebar = (props) => {
    const { parameters, locations, sources, sensors } = props;
    const [isSidebarOpen, toggleSidebar] = React.useState(true);
    const dispatch = useDispatch();
    const filters = useSelector(state => state.__new_searchFilters.filters);
    
    const classes = useStyles();
    let params = parameters.filter((param)=> param.search_view);
    params = sanitizeParameters(props.sensors, props.parameters);

    console.log(sensors);

    const getLocationsOptions = () => {
        const loc = locations.map(({ properties: { title, id } }) => ({ label:title, id }));
        return [{ label: 'Custom Location', id: 'custom' },...loc];
    };

    return (
        <BaseSidebar
            toggleSidebar={toggleSidebar}
            expanded={isSidebarOpen}
            disableGutters
        >
            <Filter  
                defaultOpen
                type="singleSelect"
                title="Locations" 
                icon={LocationIcon}
                value={filters.locations || []}
                onChange={(query)=>dispatch(setFilter('locations', query))}
                onReset={()=>dispatch(removeFilter('locations'))}
                options={getLocationsOptions()} 
                action={{ title: 'Custom Location', action: ()=> dispatch(setFilter('locations', [{ label: 'Custom Location', id: 'custom' }])) }}
            />
            <Filter  
                type="multiSelect"
                title="Parameters" 
                icon={ParametersIcon}
                value={filters.parameters || []}
                onChange={(query)=>dispatch(setFilter('parameters', query))}
                onReset={()=>dispatch(removeFilter('parameters'))}
                options={params} 
            />
            <Filter  
                type="multiSelect"
                title="Data Sources" 
                icon={SourcesIcon}
                value={filters.sources || []}
                onChange={(query)=>dispatch(setFilter('sources', query))}
                onReset={()=>dispatch(removeFilter('sources'))}
                options={sources} 
            />
            <Filter  
                type="boolean"
                title="Online" 
                icon={SourcesIcon}
                value={filters.online || []}
                onChange={(query)=>dispatch(setFilter('online', query))}
                onReset={()=>dispatch(removeFilter('online'))}
                options={[{ label: 'Online', id: true }, { label: 'Offline', id: false }]} 
            />
            <Filter  
                type="dateRange"
                title="Date" 
                icon={SourcesIcon}
                value={filters.time || []}
                onChange={(query)=>dispatch(setFilter('time', query))}
                onReset={()=>dispatch(removeFilter('time'))}
            />
        </BaseSidebar>
    );
};

export default Sidebar;
