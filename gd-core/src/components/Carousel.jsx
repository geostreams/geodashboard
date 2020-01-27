// @flow
import * as React from 'react'
import {
    Container,
    Fab,
    Grid,
    makeStyles
} from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import PauseIcon from '@material-ui/icons/Pause'
import PlayIcon from '@material-ui/icons/PlayArrow'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked'

import hooks from '../utils/hooks'

const useStyle = makeStyles({
    container: {
        position: 'relative',
        padding: 0
    },
    slides: {
        border: '1px #666 solid',
        minHeight: 150
    },
    controlContainer: {
        position: 'absolute',
        top: '10%',
        alignItems: 'flex-end'
    },
    button: {
        zIndex: 1000
    },
    navButton: {
        height: '85%'
    }
})

type Props = {
    children: React.Node,
    slidesInterval: number,
    startIndex: number,
    startInPause: boolean,
    showPauseControl: boolean,
    showNavigationControls: boolean,
    showIndicators: boolean,
    buttonsSize: 'small' | 'medium' | 'large',
    indicatorsLocation: 'outside' | 'overlay',
    indicatorsColor: string
}

const Carousel = ({
    children,
    slidesInterval,
    startIndex,
    startInPause,
    showPauseControl,
    showNavigationControls,
    showIndicators,
    buttonsSize,
    indicatorsLocation,
    indicatorsColor,
    ...rest
}: Props) => {
    const classes = useStyle()
    const [activeIndex, updateActiveIndex] = React.useState(startIndex)
    const [delay, updateDelay] = React.useState(slidesInterval)
    const [isPaused, togglePause] = React.useState(startInPause)
    const childrenCount = React.Children.count(children)

    hooks.useInterval(
        () => {
            if (activeIndex === childrenCount - 1) {
                updateActiveIndex(0)
            } else {
                updateActiveIndex(activeIndex + 1)
            }
        },
        isPaused ? null : delay
    )

    const handleNavigation = (nextSlide) => {
        if (slidesInterval) {
            updateDelay(null)
        }
        if (nextSlide === childrenCount) {
            updateActiveIndex(0)
        } else if (nextSlide === -1) {
            updateActiveIndex(childrenCount - 1)
        } else {
            updateActiveIndex(nextSlide)
        }
        if (slidesInterval) {
            // This delay is needed to allow `updateDelay(null` takes effect.
            // Otherwise the two state changes might happen too fast to reset
            // the interval
            setTimeout(() => updateDelay(slidesInterval), 100)
        }
    }

    const renderIndicators = (size) => (
        <Grid item xs={size}>
            {showIndicators ?
                <Grid item xs={12}>
                    {Array(childrenCount).fill().map((_, idx) => (
                        // eslint-disable-next-line react/no-array-index-key
                        <React.Fragment key={idx}>
                            {idx === activeIndex ?
                                <RadioButtonCheckedIcon
                                    htmlColor={indicatorsColor}
                                    className={`actionIcon ${classes.button}`}
                                /> :
                                <RadioButtonUncheckedIcon
                                    className={`actionIcon ${classes.button}`}
                                    htmlColor={indicatorsColor}
                                    onClick={() => handleNavigation(idx)}
                                />}
                        </React.Fragment>
                    ))}
                </Grid> :
                null}
            {showPauseControl ?
                <Grid item xs={12}>
                    <Fab
                        className={classes.button}
                        size={buttonsSize}
                        color="primary"
                        onClick={() => togglePause(!isPaused)}
                    >
                        {isPaused ? <PauseIcon/> : <PlayIcon/>}
                    </Fab>
                </Grid> :
                null}
        </Grid>
    )

    return (
        <Container className={classes.container}>
            {showNavigationControls ?
                <Grid
                    className={classes.controlContainer}
                    container
                    alignContent="space-between"
                    align="center"
                >
                    <Grid
                        item
                        xs={2}
                        className={classes.navButton}
                    >
                        <Fab
                            className={classes.button}
                            color="primary"
                            size={buttonsSize}
                            onClick={() => handleNavigation(activeIndex - 1)}
                        >
                            <ChevronLeftIcon />
                        </Fab>
                    </Grid>
                    {indicatorsLocation === 'overlay' ?
                        renderIndicators(8) :
                        <Grid item xs={8} />}
                    <Grid
                        item
                        xs={2}
                        className={classes.navButton}
                    >
                        <Fab
                            className={classes.button}
                            color="primary"
                            size={buttonsSize}
                            onClick={() => handleNavigation(activeIndex + 1)}
                        >
                            <ChevronRightIcon />
                        </Fab>
                    </Grid>
                </Grid> :
                null}
            <Grid
                className={classes.slides}
                container
                align="center"
                {...(rest: any)}
            >
                {React.Children.map(children, (child, idx) => (
                    idx === activeIndex ? child : null
                ))}
            </Grid>
            {indicatorsLocation === 'outside' ?
                <Grid align="center">
                    {renderIndicators(12)}
                </Grid> :
                null}
        </Container>
    )
}

Carousel.defaultProps = {
    slidesInterval: null,
    startIndex: 0,
    startInPause: false,
    showPauseControl: true,
    showNavigationControls: true,
    showIndicators: true,
    buttonsSize: 'medium',
    indicatorsLocation: 'outside',
    indicatorsColor: 'black'
}

export default Carousel
