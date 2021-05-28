// @flow
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import { Vector as VectorSource } from 'ol/source';
import Draw from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';

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

const DrawControl = ({ el }: Props) => {
    const classes = useStyle();
    const { map } = React.useContext(MapContext);
    const [vectorSource, setVectorSource] = useState(null);
    const [drawing, toggleDrawing] = useState(false);

    useEffect(()=> {
        if(!vectorSource){
            const vector = new VectorSource({
                format: (new GeoJSON({
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                }))
            });
            setVectorSource(vector);
        } else {
            const customLocationLayer = new VectorLayer({
                source: vectorSource,
                name: 'drawlayer',
                zIndex: Infinity
            });
            map.addLayer(customLocationLayer);
        }
    }, [vectorSource]);

    useEffect(()=> {
        if(!drawing && vectorSource){
            map.getView().fit(vectorSource.getExtent(), { duration: 500 });
        }
    },[drawing]);
    let draw;
    


    const addInteraction = (type) => {
        draw = new Draw({
            source: vectorSource,
            type,
            stopClick: true
        });
        toggleDrawing(true);
        draw.on('drawend', (e) => {
            toggleDrawing(false);
        });
        map.addInteraction(draw);
    };

    return ReactDOM.createPortal(
        <button
            className={classes.button}
            type="button"
            onClick={() => addInteraction('Circle')}
        >
            <CreateIcon />
        </button>,
        el
    );
};

export default DrawControl;
