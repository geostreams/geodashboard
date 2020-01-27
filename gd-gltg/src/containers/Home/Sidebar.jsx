// @flow
import React from 'react'
import { select } from 'd3'
import {
    Container,
    Divider,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { BarChart, Legend } from 'gd-core/src/components/d3'
import Carousel from 'gd-core/src/components/Carousel'

import dataStories from '../DataStories/pages'
import DataStoriesModal from '../DataStories/Details'

import data from '../../data/data.json'
import { LEGEND_DOMAIN } from './config'

type Props = {
    featureId: string,
    nutrient: string,
    selectedYear: number
}

const useStyle = makeStyles({
    header: {
        margin: '30px auto'
    },
    caption: {
        fontSize: 12,
        textAlign: 'center',
        width: '100%'
    },
    featureProp: {
        color: '#E05769'
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
})

const Sidebar = ({ featureId, nutrient, selectedYear }: Props) => {
    const classes = useStyle()
    const featureValue = data[nutrient][featureId][selectedYear]

    const [iframeProps, updateIframeProps] = React.useState({})
    const handleDataStoriesModalClose = () => updateIframeProps({})

    return (
        <>
            <Container>
                <Typography
                    className={classes.header}
                    variant="h6"
                >
                    ILLINOIS &gt; <span className={classes.featureProp}>{featureId}</span>
                </Typography>

                <Typography
                    className={classes.header}
                    variant="subtitle2"
                    gutterBottom
                >
                    YEARLY AVERAGE - {selectedYear}:
                    &nbsp;
                    <span className={classes.featureProp}>
                        {featureValue ?
                            `${featureValue} lb/acre` :
                            'No data is available'}
                    </span>
                </Typography>
                <Divider />
                <Container>
                    <Legend
                        domain={LEGEND_DOMAIN}
                        clamp
                        ticks={5}
                        tickFormat={(d) => {
                            if (d === 25) {
                                return '> 25'
                            }
                            if (d > 25) {
                                return ''
                            }
                            return d
                        }}
                        indicator={featureValue ?
                            {
                                value: data[nutrient][featureId][selectedYear],
                                stroke: '#E05769',
                                width: 2
                            } :
                            null}
                    />
                    <div className={classes.caption}>
                        Avg. of Surrounding Watersheds (lb/acre)
                    </div>
                </Container>

                <Typography
                    className={classes.header}
                    variant="subtitle2"
                    gutterBottom
                >
                    ANNUAL NITROGEN YIELD 1980-2017
                </Typography>
                <Divider />
                <BarChart
                    data={
                        Object
                            .entries(data[nutrient][featureId])
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
                    mouseOver={(d, idx, rects) => {
                        select(rects[idx]).attr('fill', 'brown')
                    }}
                    mouseOut={(d, idx, rects) => {
                        select(rects[idx]).attr('fill', '#4682b4')
                    }}
                    tooltipContent={(d) => `${d.value} lb/acre`}
                    width={450}
                    height={235}
                    marginTop={50}
                    marginBottom={60}
                    marginLeft={60}
                    marginRight={20}
                />
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
        </>
    )
}

export default Sidebar
