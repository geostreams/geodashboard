// @flow
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';
import CircleIcon from '@material-ui/icons/RadioButtonUnchecked';
import SquareIcon from '@material-ui/icons/CropSquare';
import CancelIcon from '@material-ui/icons/Cancel';
import StarIcon from '@material-ui/icons/StarOutline';
import { Vector as VectorSource } from 'ol/source';
import VectorLayer from 'ol/layer/Vector';
import Draw, { createBox } from 'ol/interaction/Draw';
import { fromCircle } from 'ol/geom/Polygon';
import { METERS_PER_UNIT } from 'ol/proj/Units';
import Control from './Control';

import { MapContext } from './Map';

const useStyle = makeStyles({
    button: {
        cursor: 'pointer'
    },
    drawControl: props => ({
        top: '5em',
        left: '0.5em',
        ...props.drawControl
    })
});

type Props = {
    enabled?: boolean,
    onStoreShape: ()=> void,
    toggleDrawMode: ()=> void,
    classNames?: Object
}

const DrawControl = ({ enabled, toggleDrawMode, onStoreShape, classNames }: Props) => {
    const classes = useStyle(classNames);
    const { map } = React.useContext(MapContext);
    // contains the draw Object created for deleting interaction at end
    const [draw, setDraw] = useState(null);

    // Caches the control
    const cacheRef = React.useRef<{
        drawControl: Control
    }>({ 
        vectorSource: new VectorSource(),
        drawControl: new Control({
            className: classes.drawControl
        }) 
    });


    // Updates controls based on whether currently in draw mode
    React.useEffect(() => {
        if(map){
            if(enabled){
                map.addControl(cacheRef.current.drawControl);
                // Create VectorSource and Layer when enabled
                // which contain the drawing features
                const vector = cacheRef.current.vectorSource;
                // zooms to the selected shape
                vector.on('addfeature', () => {
                    map.getView().fit(vector.getExtent(), { duration: 500 });
                });
                const customLocationLayer = new VectorLayer({
                    source: vector,
                    name: 'drawlayer',
                    zIndex: Infinity
                });
                map.addLayer(customLocationLayer);
            } else{
                map.removeControl(cacheRef.current.drawControl);
            }
        }
    }, [enabled]);

    // Removes existing drawn shapes
    const clearDrawing = () => {
        if(draw){
            cacheRef.current.vectorSource.clear();
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
            source: cacheRef.current.vectorSource,
            stopClick: true,
            ...options[type]
        });

        setDraw(drawEl);

        map.addInteraction(drawEl);
        
        // Extract coordinates and info of shape when drawing is completed
        drawEl.on('drawend', (event) => {
            const { feature } = event;
            let drawCoordinates;
            if(type === 'Circle'){
                const drawExtent = feature.getGeometry();
                // (1) Get the Units for the Map Projection
                const units = map.getView().getProjection().getUnits();
                // (2) Get the Center Point of the Circle
                const center = drawExtent.getCenter();
                // (3) Get the Radius of the Circle in Meters
                const radius = (drawExtent.getRadius() * METERS_PER_UNIT[units]) / 1000;

                // Convert the circle to a polygon to get the coordinates
                // Openlayers provides only the center and radius for circles, not coordinates
                const coord = fromCircle(drawExtent).getCoordinates();
                
                onStoreShape(coord, 'Circle', { center, radius });
            } else{
                drawCoordinates = feature.getGeometry().getCoordinates();
                onStoreShape(drawCoordinates);
            }
        });
    };
    if(!enabled)
        return null;

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
        cacheRef.current.drawControl.element
    );
};

DrawControl.defaultProps = {
    classNames: {},
    enabled: true
};

export default DrawControl;
