// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, FormControlLabel, makeStyles } from '@material-ui/core';

import type { Source as SourceType } from 'ol/source';

const useStyle = makeStyles({
    label: {
        marginLeft: 0,
        marginRight: 0
    }
});

type Props = {
    el: HTMLElement;
    cluster: SourceType;
    defaultDistance: number;
    toggleCallback: ?Function;
    defaultDisableCluster: boolean;
}

const ClusterControl = ({
    el,
    cluster,
    defaultDistance,
    toggleCallback,
    defaultDisableCluster
}: Props) => {
    const classes = useStyle();

    // This block helps set the clustering off during the initial render
    React.useEffect(() => {
        if (cluster && defaultDisableCluster){
            cluster.setDistance(0);
        }
    }, [cluster]);

    if (defaultDisableCluster){
        return ReactDOM.createPortal(
            <FormControlLabel
                className={classes.label}
                control={<Checkbox
                    onChange={(e, isChecked) => {
                        cluster.setDistance(isChecked ? defaultDistance : 0 );
                        if (toggleCallback) {
                            toggleCallback(!isChecked);
                        }
                    }}
                />}
                label="Enable Map Clustering"
            />,
            el
        );
    }
    
    return ReactDOM.createPortal(
        <FormControlLabel
            className={classes.label}
            control={<Checkbox
                onChange={(e, isChecked) => {
                    cluster.setDistance(isChecked ? 0 : defaultDistance);
                    if (toggleCallback) {
                        toggleCallback(!isChecked);
                    }
                }}
            />}
            label="Disable Map Clustering"
        />,
        el
    );
    
};

export default ClusterControl;
