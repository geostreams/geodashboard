// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';

import { MapContext } from './Map';

const useStyle = makeStyles({
    button: {
        cursor: 'pointer'
    }
});

type Props = {
    el: HTMLElement;
    center: [number, number];
    zoom: number;
}

const FitViewControl = ({ el, center, zoom }: Props) => {
    const classes = useStyle();

    const { map } = React.useContext(MapContext);

    return ReactDOM.createPortal(
        <button
            className={classes.button}
            type="button"
            onClick={() => {
                const view = map.getView();
                view.setZoom(zoom);
                view.setCenter(center);
            }}
        >
            <ZoomOutMapIcon />
        </button>,
        el
    );
};

export default FitViewControl;
