// @flow
import * as React from 'react';
import { event, select } from 'd3';
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
import { BarChart, LegendHorizontalDiscrete, SimpleLegend } from 'gd-core/src/components/d3';
import Carousel from 'gd-core/src/components/Carousel';
import { entries } from 'gd-core/src/utils/array';
import { useElementRect } from 'gd-core/src/utils/hooks';

import dataStories from '../DataStories/pages';
import DataStoriesModal from '../DataStories/Details';
import annualYieldData from '../../data/annual_yield.json';
import annualLoadData from '../../data/annual_load.json';
import overallData from '../../data/overall_data.json';
import {
    getNutrientValueCategoryIndex,
    FEATURE_STYLE_INFO,
    BOUNDARIES,
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
    dropdownsContainer: {
        background: '#e2ebf4'
    },
    header: {
        margin: '10px auto'
    },
    divider: {
        borderTop: '1px dashed #000',
        backgroundColor: 'unset'
    },
    infoIcon: {
        color: '#0D73C5',
        fontSize: '1rem'
    },
    featureProp: {
        color: '#E05769'
    },
    formControl: {
        margin: theme.spacing(1)
    },
    formLabel: {
        padding: theme.spacing(1),
        fontSize: '.88rem'
    },
    selectButton: {
        'background': theme.palette.primary.main,
        'borderRadius': 4,
        'color': theme.palette.primary.contrastText,
        'position': 'relative',
        'height': 42,
        'padding': theme.spacing(2),
        'fontSize': '.75rem',
        '&:focus': {
            borderRadius: 4
        },
        '& option': {
            color: 'initial'
        }
    },
    annualFlowChart: {
        marginTop: -75
    },
    annualFlowLegend: {
        '& svg': {
            fontSize: '.8rem',
            padding: 5,
            border: '1px solid #aaa'
        }
    },
    barChart: {
        '& .xAxis .tick:nth-child(2n) text': {
            visibility: 'hidden'
        }
    },
    annualYieldTooltip: {
        height: 15
    },
    chartTooltip: {
        position: 'fixed',
        background: '#fff',
        border: '1px solid #eee',
        borderRadius: 5,
        padding: 5,
        opacity: 0
    },
    carousel: {
        width: '100%',
        marginBottom: 20
    },
    carouselButton: {
        'backgroundColor': '#0D73C5',
        '&:hover': {
            backgroundColor: '#0D73C5'
        }
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

    const container = React.useRef();
    const containerRect = useElementRect(container);

    const annualStateFlowChartTooltipRef: { current: null | HTMLDivElement } = React.createRef();

    const annualYieldTooltipRef: { current: null | HTMLDivElement } = React.createRef();
    const annualYieldChartTooltipRef: { current: null | HTMLDivElement } = React.createRef();

    const annualLoadChartData = annualLoadData[featureId];

    const yearsOptions = [];
    let annualYieldChartData;
    let featureValue;
    if (annualYieldData[selectedNutrient][featureId]) {
        featureValue = annualYieldData[selectedNutrient][featureId][selectedYear];
        annualYieldChartData = Object
            .entries(annualYieldData[selectedNutrient][featureId])
            .map(
                ([year, value]) => {
                    // Data is already sorted by year in `src/data/annual_yield.json`
                    yearsOptions.push(<option key={year} value={year}>{year}</option>);
                    return {
                        x: year,
                        y: value,
                        selected: +year === +selectedYear
                    };
                }
            );
    };

    const [iframeProps, updateIframeProps] = React.useState({});

    const handleDataStoriesModalClose = () => updateIframeProps({});

    const [dialogContent, updateDialogContent] = React.useState<null | {
        title: string;
        description: string | React.Node;
    }>(null);

    return (
        <>
            <Box
                className={classes.dropdownsContainer}
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
                                className={`actionIcon ${classes.infoIcon}`}
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
                                className={`actionIcon ${classes.infoIcon}`}
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
                    disabled={!yearsOptions.length}
                >
                    <FormLabel
                        component="legend"
                        className={classes.formLabel}
                    >
                        Year {!yearsOptions.length ? '(N/A)' : ''}
                    </FormLabel>
                    <NativeSelect
                        className={classes.selectButton}
                        value={selectedYear}
                        onChange={({ target: { value } }) => {
                            handleVariableChange(value, 'year');
                        }}
                        input={<InputBase />}
                    >
                        {yearsOptions}
                    </NativeSelect>
                </FormControl>
            </Box>
            <Container ref={container}>
                <Typography
                    className={classes.header}
                    variant="h5"
                >
                    {regionLabel} - <span className={classes.featureProp}>{featureId}</span>
                </Typography>

                {selectedBoundary === 'drainage' && featureId === 'Statewide Summary' ?
                    <>
                        <Divider className={classes.divider} />
                        <Typography variant="subtitle1">
                            TOTAL {selectedNutrient.toUpperCase()} LOAD LEAVING THE STATE OF ILLINOIS
                        </Typography>
                        <Typography variant="caption">
                            The total {selectedNutrient} load leaving the state of Illinois is estimated to be&nbsp;
                            {overallData.drainage.annual_load[selectedNutrient][selectedYear]}&nbsp;
                            million lb in {selectedYear}.
                        </Typography>
                        <BarChart
                            className={classes.barChart}
                            barsData={
                                Object.entries(overallData.drainage.annual_load[selectedNutrient]).map(
                                    ([year, value]) => ({
                                        x: +year,
                                        y: +value,
                                        selected: +year === +selectedYear
                                    })
                                )
                            }
                            xAxisProps={{
                                title: 'Year',
                                titlePadding: 55,
                                stroke: '#4682b4',
                                strokeWidth: 2
                            }}
                            yAxisProps={{
                                title: 'M. lb',
                                titlePadding: 10,
                                stroke: '#4682b4',
                                strokeWidth: 2
                            }}
                            mouseOver={(d) => {
                                select(annualStateFlowChartTooltipRef.current)
                                    .html(`${d.y} Million lb`)
                                    .transition()
                                    .duration(200)
                                    .style('opacity', .9)
                                    .style('left', `${event.clientX}px`)
                                    .style('top', `${event.clientY - 50}px`);
                            }}
                            mouseOut={() => {
                                select(annualStateFlowChartTooltipRef.current)
                                    .transition()
                                    .duration(500)
                                    .style('opacity', 0);
                            }}
                            barStroke={(d) => yearsOptions.length && d.selected ? 'red' : '#117fc9'}
                            barStrokeWidth={2}
                            barStrokeOpacity={(d) => d.selected ? 1 : 0}
                            barFill="#117fc9"
                            barFillOpacity="1"
                            lineStroke="#f63700"
                            lineStrokeWidth={2}
                            intervalFill="#fdb47f"
                            width={(containerRect.width || 0) * 0.9}
                            height={300}
                            marginTop={50}
                            marginBottom={60}
                            marginLeft={60}
                            marginRight={20}
                        />
                        <div ref={annualStateFlowChartTooltipRef} className={classes.chartTooltip} />
                    </> :
                    null}

                {selectedBoundary === 'watershed' && annualLoadChartData ?
                    <>
                        <Divider className={classes.divider} />
                        <Box className={classes.annualFlowLegend} display="flex" justifyContent="space-between">
                            <Typography variant="subtitle1">
                                ANNUAL NITRATE LOAD
                            </Typography>
                            <SimpleLegend
                                width={230}
                                itemHeight={25}
                                marginBottom={4}
                                data={[
                                    { label: 'Annual Load', type: 'polygon', color: '#117fc9', width: 2, opacity: 1 },
                                    { label: 'Flow Normalized Load', type: 'line', color: '#f63700', width: 2, opacity: 1 },
                                    { label: '95% Confidence Interval', type: 'polygon', color: '#fdb47f', width: 2, opacity: 1 }
                                ]}
                            />
                        </Box>
                        <BarChart
                            className={classes.barChart}
                            barsData={
                                annualLoadChartData.annual_load.map(
                                    ({ x, y }) => ({
                                        x,
                                        y,
                                        selected: x === +selectedYear
                                    })
                                )
                            }
                            lineData={annualLoadChartData.normalized_flow}
                            intervalData={annualLoadChartData.confidence_interval}
                            xAxisProps={{
                                title: 'Year',
                                titlePadding: 50,
                                stroke: '#4682b4',
                                strokeWidth: 2
                            }}
                            yAxisProps={{
                                title: 'Tons',
                                titlePadding: 10,
                                stroke: '#4682b4',
                                strokeWidth: 2
                            }}
                            barStroke={(d) => yearsOptions.length && d.selected ? 'red' : '#117fc9'}
                            barStrokeWidth={2}
                            barStrokeOpacity={(d) => d.selected ? 1 : 0}
                            barFill="#117fc9"
                            barFillOpacity="1"
                            lineStroke="#f63700"
                            lineStrokeWidth={2}
                            intervalFill="#fdb47f"
                            width={(window.innerWidth / 3) - 50}
                            height={300}
                            marginTop={50}
                            marginBottom={60}
                            marginLeft={60}
                            marginRight={20}
                        />
                    </> :
                    null}
                {featureValue !== undefined ?
                    <>
                        <Divider className={classes.divider} />
                        <Typography
                            className={classes.header}
                            variant="subtitle1"
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
                        <Container>
                            <LegendHorizontalDiscrete
                                boxCount={7}
                                boxWidth={((window.innerWidth / 3) - 150) / 7}
                                getBoxInfo={(idx) => FEATURE_STYLE_INFO[getNutrientValueCategoryIndex(
                                    idx === 0 ? undefined : (idx * 5) - 0.1
                                )]}
                                activeBox={getNutrientValueCategoryIndex(featureValue)}
                                activeBoxLabel={featureValue >= 0 ? featureValue.toString() : ' '}
                                activeBoxLabelHeight={15}
                                activeBoxBorderColor="red"
                            />
                        </Container>
                    </> :
                    null}

                {annualYieldChartData ?
                    <>
                        <Divider className={classes.divider} />
                        <Typography
                            className={classes.header}
                            variant="subtitle1"
                            gutterBottom
                        >
                            <Box display="flex" alignItems="center">
                                ANNUAL {selectedNutrient.toUpperCase()} YIELD&nbsp;
                                {annualYieldChartData[0].x}-{annualYieldChartData[annualYieldChartData.length - 1].x}
                                &nbsp;
                                <InfoIcon
                                    className={`actionIcon ${classes.infoIcon}`}
                                    onClick={(() => updateDialogContent(VARIABLES_INFO.yield))}
                                />
                            </Box>
                        </Typography>
                        <Typography
                            ref={annualYieldTooltipRef}
                            className={`${classes.header} ${classes.annualYieldTooltip}`}
                            variant="subtitle1"
                            gutterBottom
                        />
                        <BarChart
                            className={classes.barChart}
                            barsData={annualYieldChartData}
                            xAxisProps={{
                                title: 'Year',
                                titlePadding: 50,
                                stroke: '#4682b4',
                                strokeWidth: 2
                            }}
                            yAxisProps={{
                                title: 'lb/acre',
                                titlePadding: 10,
                                stroke: '#4682b4',
                                strokeWidth: 2
                            }}
                            barStroke={(d) => d.selected ? 'red' : '#4682b4'}
                            barStrokeWidth={2}
                            barStrokeOpacity={(d) => d.selected ? 1 : 0}
                            barFill={({ y }) => {
                                const styleInfo = FEATURE_STYLE_INFO[getNutrientValueCategoryIndex(y)];
                                return styleInfo.color ? styleInfo.color : '#000';
                            }}
                            barFillOpacity="1"
                            mouseOver={(d, idx, rects) => {
                                select(rects[idx]).attr('fill', 'brown');
                                select(annualYieldTooltipRef.current)
                                    .html(`${d.x}: <span class=${classes.featureProp}>${d.y} lb/acre</span>`);
                                select(annualYieldChartTooltipRef.current)
                                    .html(`${d.y} lb/acre`)
                                    .transition()
                                    .duration(200)
                                    .style('opacity', .9)
                                    .style('left', `${event.clientX}px`)
                                    .style('top', `${event.clientY - 50}px`);
                            }}
                            mouseOut={(d, idx, rects) => {
                                const styleInfo = FEATURE_STYLE_INFO[getNutrientValueCategoryIndex(d.y)];
                                select(rects[idx])
                                    .attr('fill', styleInfo.color ? styleInfo.color : '#000');
                                select(annualYieldTooltipRef.current)
                                    .html('');
                                select(annualYieldChartTooltipRef.current)
                                    .transition()
                                    .duration(500)
                                    .style('opacity', 0);
                            }}
                            width={(window.innerWidth / 3) - 50}
                            height={300}
                            marginTop={50}
                            marginBottom={60}
                            marginLeft={60}
                            marginRight={20}
                        />
                        <div ref={annualYieldChartTooltipRef} className={classes.chartTooltip} />
                    </> :
                    null}
                {selectedBoundary === 'drainage' || selectedBoundary === 'huc8' ?
                    <Typography variant="subtitle2" align="center" gutterBottom>
                        <a
                            target="_blank"
                            rel="noopener noreferrer"
                            href="https://www2.illinois.gov/epa/topics/water-quality/watershed-management/excess-nutrients/Documents/NLRS_SCIENCE_ASSESSMENT_UPDATE_2019%20v7_FINAL%20VERSION_web.pdf"
                        >
                            Illinois Nutrient Reduction Strategy Science Assessment Update 2019
                        </a>
                    </Typography> : null}
            </Container>
            <DataStoriesModal
                {...iframeProps}
                handleClose={handleDataStoriesModalClose}
            />
            <Container className={classes.carousel}>
                <Divider />
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h5" gutterBottom>
                        Learn More About GLTG
                    </Typography>
                    <Link to="/data-stories" className="right">
                        View All Data Stories
                    </Link>
                </Box>
                <Carousel
                    slidesInterval={3000}
                    buttonsSize="small"
                    showPauseControl={false}
                    buttonClasses={classes.carouselButton}
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
