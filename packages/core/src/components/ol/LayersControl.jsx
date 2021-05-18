// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { makeStyles } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';
import ChevronDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ChevronRightIcon from '@material-ui/icons/KeyboardArrowRight';
import CloseIcon from '@material-ui/icons/Close';

import type { Layer as LayerType } from 'ol/layer';

import { entries } from '../../utils/array';

const useStyle = makeStyles((theme) => ({
    button: {
        width: '10em !important',
        height: '2em !important'
    },
    card: {
        width: 320
    },
    cardContent: {
        padding: 6,
        height: 'calc(100vh - 12em)',
        overflowY: 'auto'
    },
    cardHeader: {
        background: '#467a9e',
        color: '#fff',
        padding: 6
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(0.5),
        top: theme.spacing(1),
        background: 'none !important'
    },
    checkbox: {
        minWidth: 0
    },
    legendLabelRoot: {
        minHeight: 0,
        flexDirection: 'row-reverse'
    },
    legendLabelContent: {
        margin: 0,
        padding: 0
    },
    legendImage: {
        width: '90%'
    },
    opacitySlider: {
        width: '80%',
        margin: 'auto'
    },
    divider: {
        'width': '80%',
        'margin': 'auto',
        '&:last-child': {
            display: 'none'
        }
    }
}));

type Props = {
    el: HTMLElement;
    layers: { [layerName: string]: LayerType };
    exclude: string[];
}

const LayersControl = ({ el, layers, exclude }: Props) => {
    const classes = useStyle();

    const [showLayers, updateShowLayers] = React.useState(false);

    const [openGroups, updateOpenGroups] = React.useState<{ [groupName: string]: boolean; }>({});

    const [layersVisibility, updateLayersVisibility] = React.useState<{
        [layerName: string]: { isVisible: boolean; opacity: number; }
    }>({});

    const renderLayer = (layer: LayerType) => {
        const title = layer.get('title');
        const { isVisible, opacity } = layersVisibility[title] || {
            isVisible: layer.getVisible(),
            opacity: layer.getOpacity()
        };

        const legend = layer.get('legend');

        return (
            <React.Fragment key={title}>
                <ListItem dense>
                    <ListItemIcon className={classes.checkbox}>
                        <Checkbox
                            checked={isVisible}
                            disableRipple
                            onChange={() => {
                                layer.setVisible(!isVisible);
                                updateLayersVisibility({
                                    ...layersVisibility,
                                    [title]: {
                                        opacity,
                                        isVisible: !isVisible
                                    }
                                });
                            }}
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary={title}
                        primaryTypographyProps={{
                            variant: 'body2'
                        }}
                    />
                </ListItem>
                {legend ?
                    <ListItem dense>
                        <Accordion elevation={0}>
                            <AccordionSummary
                                classes={{
                                    root: classes.legendLabelRoot,
                                    content: classes.legendLabelContent,
                                    expandIcon: classes.legendLabelContent
                                }}
                                expandIcon={<ChevronDownIcon />}
                            >
                                <Typography variant="body2">Legend</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <img className={classes.legendImage} src={legend} alt={title} />
                            </AccordionDetails>
                        </Accordion>
                    </ListItem> :
                    null}
                <ListItem dense>
                    <Slider
                        className={classes.opacitySlider}
                        min={0}
                        max={1}
                        step={0.1}
                        value={opacity}
                        onChange={(e, value) => {
                            layer.setOpacity(value);
                            updateLayersVisibility({
                                ...layersVisibility,
                                [title]: {
                                    opacity: value,
                                    isVisible
                                }
                            });
                        }}
                    />
                </ListItem>
                <Divider className={classes.divider} />
            </React.Fragment>
        );
    };

    const renderLayerGroup = (layer: LayerType, groupName: string) => {
        const isOpen = openGroups[groupName];

        const groupLayers = layer.getLayersArray();
        const areLayersVisible = !groupLayers.find(
            (groupLayer) => !(
                layersVisibility[groupLayer.get('title')] || { isVisible: groupLayer.getVisible() }
            ).isVisible
        );

        return (
            <React.Fragment key={groupName}>
                <ListItem
                    button
                    onClick={() => updateOpenGroups({
                        ...openGroups,
                        [groupName]: !isOpen
                    })}
                >
                    <ListItemText primary={groupName} />
                    {isOpen ? <ChevronDownIcon /> : <ChevronRightIcon />}
                </ListItem>
                <Collapse in={isOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem>
                            <ListItemIcon className={classes.checkbox}>
                                <Checkbox
                                    checked={areLayersVisible}
                                    disableRipple
                                    onChange={() => updateLayersVisibility({
                                        ...layersVisibility,
                                        ...groupLayers.reduce((visibility, groupLayer) => {
                                            const groupLayerTitle = groupLayer.get('title');
                                            const opacity = (
                                                layersVisibility[groupLayerTitle] ||
                                                { opacity: groupLayer.getOpacity() }
                                            );
                                            groupLayer.setVisible(!areLayersVisible);
                                            visibility[groupLayerTitle] = {
                                                opacity,
                                                isVisible: !areLayersVisible
                                            };
                                            return visibility;
                                        }, {})
                                    })}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary="Select all"
                                primaryTypographyProps={{
                                    variant: 'body2'
                                }}
                            />
                        </ListItem>
                        {groupLayers.map((subLayer) => renderLayer(subLayer))}
                    </List>
                </Collapse>
            </React.Fragment>
        );
    };

    return ReactDOM.createPortal(
        <>
            <Button
                className={`${classes.button} ${showLayers ? 'hidden' : ''}`}
                onClick={() => updateShowLayers(true)}
            >
                Explore Layers
            </Button>
            <Card className={`${classes.card} ${showLayers ? '' : 'hidden'}`} square>
                <CardContent className={classes.cardHeader}>
                    <Typography gutterBottom variant="h6">
                        Explore Layers
                    </Typography>
                    <IconButton
                        className={classes.closeButton}
                        size="small"
                        onClick={() => updateShowLayers(false)}
                    >
                        <CloseIcon />
                    </IconButton>
                </CardContent>
                <CardContent className={classes.cardContent}>
                    <List>
                        {entries(layers)
                            .filter(([layerName]) => !exclude.includes(layerName))
                            .map(([layerName, layer]) => (
                                layer.getLayersArray().length > 1 ?
                                    renderLayerGroup(layer, layerName) :
                                    renderLayer(layer)
                            ))}
                    </List>
                </CardContent>
            </Card>
        </>,
        el
    );
};

export default LayersControl;
