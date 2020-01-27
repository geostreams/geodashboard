// @flow
import React from 'react'
import {
    Card,
    CardActionArea,
    CardContent,
    Container,
    InputBase,
    NativeSelect,
    Typography,
    makeStyles
} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'

import filters from './filters'

const useStyle = makeStyles({
    header: {
        margin: '30px auto'
    },
    filterSelect: {
        fontStyle: 'italic',
        background: '#eee',
        margin: 20
    },
    filterCard: {
        margin: 20
    },
    popupClose: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 1000,
        cursor: 'pointer'
    }
})

const Sidebar = () => {
    const classes = useStyle()

    const [selectedFilters, updateSelectedFilters] = React.useState(new Set())

    const addFilter = ({ target: { value: filterLabel } }) => {
        const updatedFilters = new Set(selectedFilters)
        updatedFilters.add(filterLabel)
        updateSelectedFilters(updatedFilters)
    }

    const removeFilter = (filterLabel) => {
        const updatedFilters = new Set(selectedFilters)
        updatedFilters.delete(filterLabel)
        updateSelectedFilters(updatedFilters)
    }

    return (
        <Container>
            <Typography
                className={classes.header}
                variant="h6"
            >
                Download
            </Typography>

            <NativeSelect
                className={classes.filterSelect}
                onChange={addFilter}
                input={<InputBase />}
                fullWidth
            >
                <option className="hidden">
                    {selectedFilters.size === Object.keys(filters).length ?
                        'No filter is available' :
                        'Add a Filter'}
                </option>
                {Object.keys(filters).map(label => (
                    selectedFilters.has(label) ?
                        null :
                        <option key={label} value={label}>{label}</option>
                ))}
            </NativeSelect>

            {Array.from(selectedFilters).map(filterLabel => (
                <Card key={filterLabel} className={classes.filterCard}>
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {filterLabel}
                            </Typography>
                            <CloseIcon
                                className={classes.popupClose}
                                fontSize="small"
                                onClick={() => removeFilter(filterLabel)}
                            />
                        </CardContent>
                        <CardContent className={classes.cardProperties}>
                            {filters[filterLabel]()}
                        </CardContent>
                    </CardActionArea>
                </Card>
            ))}
        </Container>
    )
}

export default Sidebar
