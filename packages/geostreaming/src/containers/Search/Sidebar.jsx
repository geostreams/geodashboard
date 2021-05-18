/* eslint-disable react/prop-types */
/* eslint-disable no-console */
// @flow
import React from 'react';
import {
    makeStyles
} from '@material-ui/core';
import BaseSidebar from '@geostreams/core/src/components/theme/BaseSidebar';
import ListSelect from './filters/ListSelect';
import sanitizeParameters from '../../utils/parameters';

const useStyles = makeStyles(() => ({
}));


const Sidebar = (props) => {
    console.log(props);
    const { parameters, locations, sources } = props;

    let params = parameters.filter((param)=> param.search_view);

    params = sanitizeParameters(props.sensors, props.parameters);
    const classes = useStyles();
    console.log(classes);
    const [isSidebarOpen, toggleSidebar] = React.useState(true);

    return (
        <BaseSidebar
            toggleSidebar={toggleSidebar}
            expanded={isSidebarOpen}
        >
            <ListSelect  
                defaultOpen
                title="Locations" 
                options={locations.map(({ properties: { title, id } }) => ({ label:title, id }))} 
            />
            <ListSelect  
                title="Data Sources" 
                options={params} 
            />
            <ListSelect  
                title="Sources" 
                options={sources} 
            />
        </BaseSidebar>
    );
};

export default Sidebar;
