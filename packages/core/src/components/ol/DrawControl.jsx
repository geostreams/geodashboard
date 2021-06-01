// @flow
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import SquareIcon from '@material-ui/icons/CropSquare';
import CancelIcon from '@material-ui/icons/Cancel';
import StarIcon from '@material-ui/icons/StarOutline';
import { Vector as VectorSource } from 'ol/source';
import Draw, { createBox } from 'ol/interaction/Draw';
import VectorLayer from 'ol/layer/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { METERS_PER_UNIT } from 'ol/proj/Units';

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

const DrawControl = ({ el, toggleDrawMode, onStoreShape }: Props) => {
    const classes = useStyle();
    const { map } = React.useContext(MapContext);
    const [vectorSource, setVectorSource] = useState(null);
    const [draw, setDraw] = useState(null);

    useEffect(()=> {
        if(vectorSource === null){
            const vector = new VectorSource({
                format: (new GeoJSON({
                    dataProjection: 'EPSG:4326',
                    featureProjection: 'EPSG:3857'
                }))
            });
            vector.on('addfeature', () => {
                map.getView().fit(vector.getExtent(), { duration: 500 });
            });
            const customLocationLayer = new VectorLayer({
                source: vector,
                name: 'drawlayer',
                zIndex: Infinity
            });
            map.addLayer(customLocationLayer);
            setVectorSource(vector);
        }
    }, []);

    const clearDrawing = () => {
        if(draw){
            vectorSource.clear();
            map.removeInteraction(draw);
        }
    };

    const clearDrawMode = () => {
        clearDrawing();
        toggleDrawMode(false);
    };


    const addInteraction = (type) => {
        clearDrawing();

        const options = {
            Box: { type: 'Circle', geometryFunction: createBox() },
            Polygon: { type: 'Polygon' },
            Circle: { type: 'Circle' }
        };

        const drawEl = new Draw({
            source: vectorSource,
            stopClick: true,
            ...options[type]
        });
        drawEl.on('drawend', (event) => {
            const { feature } = event;
            let drawCoordinates;
            if(type === 'Circle'){
                const drawExtent = feature.getGeometry();
                // (1) Get the Units for the Map Projection
                const units = map.getView().getProjection().getUnits();
                // (2) Get the Center Point of the Circle
                const drawCenter = drawExtent.getCenter();
                // (3) Get the Radius of the Circle in Meters
                const drawRadius = (drawExtent.getRadius() * METERS_PER_UNIT[units]) / 1000;
                // Assemble the Coordinates for the API call
                drawCoordinates = [drawCenter.concat(drawRadius)];
            } else{
                drawCoordinates = feature.getGeometry().getCoordinates();
            }
            onStoreShape(drawCoordinates);
        });
        map.addInteraction(drawEl);
        setDraw(drawEl);
    };

    return ReactDOM.createPortal(
        <div>
            <button
                className={classes.button}
                type="button"
                onClick={() => addInteraction('Circle')}
            >
                <CircleIcon />
            </button>
            <button
                className={classes.button}
                type="button"
                onClick={() => addInteraction('Box')}
            >
                <SquareIcon />
            </button>
            <button
                className={classes.button}
                type="button"
                onClick={() => addInteraction('Polygon')}
            >
                <StarIcon />
            </button>
            <button
                className={classes.button}
                type="button"
                onClick={clearDrawMode}
            >
                <CancelIcon />
            </button>

        </div>,
        el
    );
};

export default DrawControl;
