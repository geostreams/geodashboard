// @flow
import * as React from 'react'
import { connect } from 'react-redux'
import {
    Grid,
    Tab,
    Tabs,
    Typography,
    withStyles
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import { callAPI } from '../../../utils/io'
import { getSourceColor, getSourceName } from '../../../utils/sensors'
import Filters from './Filters'
import InfoDialog from './InfoDialog'
import Parameters from './Parameters'
import { getBinType } from './utils'

import type {
    ParameterCategoryType,
    ParameterMappingsType,
    ParameterType,
    ParameterValue,
    SensorType
} from '../../../utils/flowtype'

const styles = (theme) => ({
    header: {
        color: theme.palette.primary.contrastText,
        padding: 10
    }
})

type Props = {
    classes: {
        header: string;
        filtersContainer: string;
        filterCard: string;
        dateRangeSlider: string;
        downloadButton: string;
    };
    sensor: SensorType;
    parameters: ParameterType[];
    categories: ParameterCategoryType[];
    mappings: ParameterMappingsType[];
    handleClose: ?Function;
}

type State = {
    activeCategory: string;
    showDialog: boolean;
    dialogContent: ?string;
    paramsData: { [key: string]: ParameterValue[] };
    startDate: Date;
    endDate: Date;
    showSeasonFilter: boolean;
    selectedSeason: string;
    displayLines: boolean;
    startAtZero: boolean;
    sameTimeScale: boolean;
    selectAllDates: boolean;
    binType: string;
}

class SensorDetail extends React.Component<Props, State> {
    categoriesMapping: { [key: string]: { type: string, parameters: ParameterType[] } }

    minStartTime: Date

    maxEndTime: Date

    static defaultProps = {
        handleClose: null
    }

    constructor(props) {
        super(props)

        this.categoriesMapping = this.getCategories()
        this.minStartTime = new Date(props.sensor.min_start_time)
        this.maxEndTime = new Date(props.sensor.max_end_time)

        const activeCategory = Object.keys(this.categoriesMapping)[0]

        const startDate = new Date(props.sensor.min_start_time)
        const endDate = new Date(props.sensor.max_end_time)

        this.state = {
            activeCategory,
            showDialog: false,
            dialogContent: null,
            paramsData: {},
            startDate,
            endDate,
            /* eslint-disable react/no-unused-state */
            showSeasonFilter: false,
            selectedSeason: '',
            displayLines: true,
            /* eslint-enable react/no-unused-state */
            startAtZero: false,
            sameTimeScale: true,
            selectAllDates: true,
            binType: getBinType(startDate, endDate)
        }
    }

    componentDidMount() {
        this.updateParamsData()
    }

    updateParamsData = () => {
        const { sensor } = this.props
        const { binType, startDate, endDate } = this.state
        const queryParams = []
        if (startDate) {
            queryParams.push(`since=${startDate.toISOString()}`)
            if (endDate) {
                queryParams.push(`until=${endDate.toISOString()}`)
            }
        }
        callAPI(
            `cache/${binType}/${sensor.id}?${queryParams.join('&')}`,
            (data) => {
                this.setState({ paramsData: data.properties })
            }
        )
    }

    getCategories = () => {
        const { sensor, parameters, categories, mappings } = this.props
        const categoriesMapping = {}
        sensor.parameters.forEach(parameterName => {
            const parameter = parameters.find(({ name }) => name === parameterName)
            if (parameter) {
                const mappedCategories = mappings.filter(m => m.parameter_id === parameter.id)
                mappedCategories.forEach(mapping => {
                    const category = categories.find(c => c.id === mapping.category_id)
                    if (category) {
                        if (categoriesMapping[category.name]) {
                            categoriesMapping[category.name].parameters.push(parameter)
                        } else {
                            categoriesMapping[category.name] = {
                                type: category.detail_type,
                                parameters: [parameter]
                            }
                        }
                    }
                })
            }
        })
        return categoriesMapping
    }

    handleCategoryChange = (e, category) => {
        this.setState({
            activeCategory: category
        })
    }

    handleSelectAllDatesToggle = (e, isChecked) => {
        this.setState(
            (state) => {
                state.selectAllDates = isChecked
                if (isChecked) {
                    state.startDate = this.minStartTime
                    state.endDate = this.maxEndTime
                }
                state.binType = getBinType(state.startDate, state.endDate)
                return state
            },
            this.updateParamsData
        )
    }

    handleDateRangeUpdate = (e, [start, end]) => {
        this.setState(
            (state) => {
                state.startDate = new Date(start)
                state.endDate = new Date(end)
                state.selectAllDates = (
                    state.startDate.valueOf() === this.minStartTime.valueOf() &&
                    state.endDate.valueOf() === this.maxEndTime.valueOf()
                )
                state.binType = getBinType(state.startDate, state.endDate)
                return state
            },
            this.updateParamsData
        )
    }

    handleStartDataAtZeroToggle = (e, isChecked) => {
        this.setState({ startAtZero: isChecked })
    }

    handleUseSameTimeScaleToggle = (e, isChecked) => {
        this.setState({ sameTimeScale: isChecked })
    }

    showInfoDialog = (content) => {
        this.setState({
            showDialog: true,
            dialogContent: content
        })
    }

    render() {
        const { classes, sensor, handleClose } = this.props
        const {
            activeCategory,
            selectAllDates,
            startDate,
            endDate,
            binType,
            startAtZero,
            sameTimeScale,
            paramsData,
            showDialog,
            dialogContent
        } = this.state

        const { properties } = sensor

        return (
            <>
                <Grid container>
                    <Grid
                        item
                        className={classes.header}
                        xs={12}
                        style={{ backgroundColor: getSourceColor(properties.type.id) }}
                    >
                        <Typography variant="h4">
                            {properties.name} - {getSourceName(properties.type)}
                            {handleClose ?
                                <CloseIcon
                                    className="right actionIcon"
                                    onClick={handleClose}
                                /> :
                                null}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Tabs
                            centered
                            value={activeCategory}
                            onChange={this.handleCategoryChange}
                        >
                            {Object.keys(this.categoriesMapping).map((category) => (
                                <Tab
                                    key={category}
                                    label={category}
                                    value={category}
                                />
                            ))}
                        </Tabs>
                    </Grid>

                    <Filters
                        minStartTime={this.minStartTime}
                        maxEndTime={this.maxEndTime}
                        selectAllDates={selectAllDates}
                        startDate={startDate}
                        endDate={endDate}
                        binType={binType}
                        startAtZero={startAtZero}
                        sameTimeScale={sameTimeScale}
                        handleSelectAllDatesToggle={this.handleSelectAllDatesToggle}
                        handleDateRangeUpdate={this.handleDateRangeUpdate}
                        handleStartDataAtZeroToggle={this.handleStartDataAtZeroToggle}
                        handleUseSameTimeScaleToggle={this.handleUseSameTimeScaleToggle}
                    />

                    <Parameters
                        data={paramsData}
                        dateRange={sameTimeScale ? [startDate, endDate] : [startDate, endDate]}
                        mapping={this.categoriesMapping[activeCategory]}
                        startAtZero={startAtZero}
                        showInfoDialog={this.showInfoDialog}
                    />
                </Grid>

                <InfoDialog
                    showDialog={showDialog}
                    contentType={dialogContent}
                    source={sensor.properties.type}
                    handleClose={() => this.setState({ showDialog: false })}
                />
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    parameters: state.__new_parameters.parameters,
    categories: state.__new_parameters.categories,
    mappings: state.__new_parameters.mappings
})

export default connect(mapStateToProps)(withStyles(styles)(SensorDetail))
