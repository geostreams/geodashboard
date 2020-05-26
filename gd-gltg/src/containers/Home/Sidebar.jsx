// @flow
import * as React from 'react';
import { select } from 'd3';
import {
    Box,
    Container,
    Dialog,
    DialogContent,
    DialogTitle,
    Divider,
    FormControl,
    FormLabel,
    Grid,
    IconButton,
    InputBase,
    NativeSelect,
    Typography,
    makeStyles
} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import InfoIcon from '@material-ui/icons/Info';
import { Link } from 'react-router-dom';
import { BarChart, LegendHorizontalDiscrete } from 'gd-core/src/components/d3';
import Carousel from 'gd-core/src/components/Carousel';

import { entries } from 'gd-core/src/utils/array';
import dataStories from '../DataStories/pages';
import DataStoriesModal from '../DataStories/Details';
import data from '../../data/data.json';
import {
    getNutrientValueCategoryIndex,
    FEATURE_STYLE_INFO,
    BOUNDARIES,
    YEARS,
    VARIABLES_INFO
} from './config';

type Props = {
    regionLabel: string | null;
    featureId: string | null;
    selectedBoundary: string;
    selectedNutrient: string;
    selectedYear: number;
    handleBoundaryChange: Function;
    handleVariableChange: Function;
}

const useStyle = makeStyles((theme) =>({
    header: {
        margin: '30px auto'
    },
    featureProp: {
        color: '#E05769'
    },
    formControl: {
        margin: theme.spacing(1)
    },
    formLabel: {
        padding: theme.spacing(1)
    },
    selectButton: {
        'background': theme.palette.primary.main,
        'borderRadius': 4,
        'color': theme.palette.primary.contrastText,
        'position': 'relative',
        'height': 42,
        'padding': theme.spacing(2),
        '&:focus': {
            borderRadius: 4
        },
        '& option': {
            color: 'initial'
        }
    },
    carousel: {
        width: '100%',
        marginBottom: 20
    },
    carouselSlideContainer: {
        width: '100%'
    },
    carouselSlide: {
        width: '100%'
    }
}));

const Sidebar = ({
    regionLabel,
    featureId,
    selectedBoundary,
    selectedNutrient,
    selectedYear,
    handleBoundaryChange,
    handleVariableChange
}: Props) => {
    const classes = useStyle();

    const featureValue = data[selectedNutrient][featureId] ? data[selectedNutrient][featureId][selectedYear] : -1;  // -1 means no data

    const [iframeProps, updateIframeProps] = React.useState({});

    const handleDataStoriesModalClose = () => updateIframeProps({});

    const [dialogContent, updateDialogContent] = React.useState<null | {
        title: string;
        description: string | React.Node;
    }>(null);

    return (
        <>
            <Container>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                >
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormLabel
                            component="legend"
                            className={classes.formLabel}
                        >
                            <Box display="flex" alignItems="center">
                                Boundary Type
                                &nbsp;
                                <InfoIcon
                                    className="actionIcon"
                                    fontSize="small"
                                    onClick={(() => updateDialogContent(VARIABLES_INFO.boundary))}
                                />
                            </Box>
                        </FormLabel>
                        <NativeSelect
                            className={classes.selectButton}
                            value={selectedBoundary}
                            onChange={({ target: { value } }) => {
                                handleBoundaryChange(value);
                            }}
                            input={<InputBase />}
                        >
                            {entries(BOUNDARIES).map(([name, { label }]) => (
                                <option
                                    key={name}
                                    value={name}
                                >
                                    {label}
                                </option>
                            ))}
                        </NativeSelect>
                    </FormControl>
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormLabel
                            component="legend"
                            className={classes.formLabel}
                        >
                            <Box display="flex" alignItems="center">
                                Nutrient
                                &nbsp;
                                <InfoIcon
                                    className="actionIcon"
                                    fontSize="small"
                                    onClick={(() => updateDialogContent(VARIABLES_INFO.nutrient))}
                                />
                            </Box>
                        </FormLabel>
                        <NativeSelect
                            className={classes.selectButton}
                            value={selectedNutrient}
                            onChange={({ target: { value } }) => {
                                handleVariableChange(value, 'nutrient');
                            }}
                            input={<InputBase />}
                        >
                            <option value="Phosphorus">Phosphorus</option>
                            <option value="Nitrogen">Nitrogen</option>
                        </NativeSelect>
                    </FormControl>
                    <FormControl
                        component="fieldset"
                        className={classes.formControl}
                    >
                        <FormLabel
                            component="legend"
                            className={classes.formLabel}
                        >
                            Year
                        </FormLabel>
                        <NativeSelect
                            className={classes.selectButton}
                            value={selectedYear}
                            onChange={({ target: { value } }) => {
                                handleVariableChange(value, 'year');
                            }}
                            input={<InputBase />}
                        >
                            {YEARS.map(
                                (y) => (
                                    <option key={y} value={y}>
                                        {y}
                                    </option>
                                )
                            )}
                        </NativeSelect>
                    </FormControl>
                </Box>

                <Typography
                    className={classes.header}
                    variant="h6"
                >
                    {regionLabel} - <span className={classes.featureProp}>{featureId}</span>
                </Typography>

                <Typography
                    className={classes.header}
                    variant="subtitle2"
                    gutterBottom
                >
                    AVERAGE YIELD - {selectedYear}:
                    &nbsp;
                    <span className={classes.featureProp}>
                        {featureValue >= 0 ?
                            `${featureValue} lb/acre` :
                            'No data is available'}
                    </span>
                </Typography>
                <Divider />
                <Container>
                    <LegendHorizontalDiscrete
                        boxCount={7}
                        getBoxInfo={(idx) => FEATURE_STYLE_INFO[getNutrientValueCategoryIndex(
                            idx === 0 ? undefined : (idx * 5) - 0.1
                        )]}
                        activeBox={getNutrientValueCategoryIndex(featureValue)}
                        activeBoxLabel={featureValue >= 0 ? featureValue : ' '}
                        activeBoxLabelHeight={15}
                        activeBoxBorderColor="red"
                    />
                </Container>

                <Typography
                    className={classes.header}
                    variant="subtitle2"
                    gutterBottom
                >
                    ANNUAL {selectedNutrient.toUpperCase()} YIELD 1980-2017
                </Typography>
                <Divider />
                {data[selectedNutrient][featureId] ?
                    <BarChart
                        data={
                            Object
                                .entries(data[selectedNutrient][featureId])
                                .map(
                                    ([year, value]) => ({
                                        year,
                                        value,
                                        selected: +year === +selectedYear
                                    })
                                )
                        }
                        xAxisProps={{
                            key: 'year',
                            title: 'Year',
                            titlePadding: 50,
                            stroke: '#4682b4',
                            strokeWidth: 2
                        }}
                        yAxisProps={{
                            key: 'value',
                            title: 'lb/acre',
                            titlePadding: 40,
                            stroke: '#4682b4',
                            strokeWidth: 2
                        }}
                        barStroke={(d) => d.selected ? 'red' : '#4682b4'}
                        barStrokeWidth={2}
                        barStrokeOpacity={(d) => d.selected ? 1 : 0}
                        barFill={({ value }) => {
                            const styleInfo = FEATURE_STYLE_INFO[getNutrientValueCategoryIndex(value)];
                            return styleInfo.color ? styleInfo.color : '#000';
                        }}
                        barFillOpacity="1"
                        mouseOver={(d, idx, rects) => {
                            select(rects[idx]).attr('fill', 'brown');
                        }}
                        mouseOut={(d, idx, rects) => {
                            select(rects[idx]).attr('fill', '#4682b4');
                        }}
                        tooltipContent={(d) => `${d.value} lb/acre`}
                        width={(window.innerWidth / 3) - 50}
                        height={235}
                        marginTop={50}
                        marginBottom={60}
                        marginLeft={60}
                        marginRight={20}
                    /> :
                    null}
            </Container>
            <DataStoriesModal
                {...iframeProps}
                handleClose={handleDataStoriesModalClose}
            />
            <Container className={classes.carousel}>
                <Typography variant="subtitle2" gutterBottom>
                    Learn More About GLTG
                    <Link to="/data-stories" className="right">
                        View All Data Stories
                    </Link>
                </Typography>
                <Carousel
                    slidesInterval={3000}
                    buttonsSize="small"
                    showPauseControl={false}
                >
                    {dataStories.map(({ title, thumbnail, slides }) => (
                        <Grid
                            key={title}
                            className={`actionIcon ${classes.carouselSlideContainer}`}
                            onClick={() => updateIframeProps({
                                source: slides,
                                title
                            })}
                        >
                            <Grid
                                item
                                xs={12}
                                component="img"
                                src={thumbnail}
                                title={title}
                                className={classes.carouselSlide}
                            />
                            <Grid item xs={12}>
                                <Typography
                                    gutterBottom
                                    variant="subtitle2"
                                    component="h2"
                                >
                                    {title}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
                </Carousel>
            </Container>
            {dialogContent ?
                <Dialog open onClose={() => updateDialogContent(null)}>
                    <DialogTitle disableTypography>
                        <Typography variant="h6" align="center">
                            {dialogContent.title}
                            <IconButton
                                className="right noPadding actionIcon"
                                onClick={() => updateDialogContent(null)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </Typography>
                    </DialogTitle>
                    <DialogContent dividers>
                        {dialogContent.description}
                    </DialogContent>
                </Dialog> :
                null}
        </>
    );
};

export default Sidebar;
