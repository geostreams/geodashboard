// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Typography from '@material-ui/core/Typography';

import type { TrendParameterType, TrendSeasonType } from '../../utils/flowtype';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        padding: theme.spacing(1)
    },
    row: {
        width: '95%',
        marginBottom: theme.spacing(1)
    }
}));

type Props = {
    seasons: TrendSeasonType[];
    parameters: TrendParameterType[];
    selectedSeason: string;
    selectedParameter: string;
    updateSelectedSeason: (season: string) => void;
    updateSelectedParameter: (parameter: string) => void;
};

const Sidebar = ({
    seasons,
    parameters,
    selectedSeason,
    selectedParameter,
    updateSelectedSeason,
    updateSelectedParameter
}: Props) => {
    const classes = useStyles();

    return (
        <Box className={classes.root} display="flex" flexDirection="column" alignItems="center">
            <Card className={`${classes.row} ${selectedParameter ? '' : 'hidden'}`}>
                <CardContent>
                    <Typography variant="body1">Trends Selections</Typography>
                    <Typography variant="body2">Season: {seasons.find(({ id }) => id === selectedSeason)?.title}</Typography>
                    <Typography
                        variant="body2"
                        dangerouslySetInnerHTML={{ __html: `Parameter: ${parameters.find(({ id }) => id === selectedParameter)?.title}` }}
                    />
                </CardContent>
            </Card>
            <Card className={classes.row}>
                <CardContent>
                    <Typography variant="h6">Select Season</Typography>
                    <RadioGroup value={selectedSeason} onChange={(e, value) => updateSelectedSeason(value)}>
                        {seasons.map(
                            ({ id, title }) => (
                                <FormControlLabel key={id} value={id} control={<Radio />} label={title} />
                            )
                        )}
                    </RadioGroup>
                </CardContent>
            </Card>
            <Card className={classes.row}>
                <CardContent>
                    <Typography variant="h6">Select Parameter</Typography>
                    <RadioGroup value={selectedParameter} onChange={(e, value) => updateSelectedParameter(value)}>
                        {parameters.map(
                            ({ id, title }) => (
                                <FormControlLabel
                                    key={id}
                                    value={id}
                                    control={<Radio />}
                                    label={
                                        /* eslint-disable-next-line react/no-danger */
                                        <div dangerouslySetInnerHTML={{ __html: title }} />
                                    }
                                />
                            )
                        )}
                    </RadioGroup>
                </CardContent>
            </Card>
        </Box>
    );
};

const mapStateToProps = (state) => ({
    geostreamingEndpoint: state.config.geostreamingEndpoint
});

export default connect(mapStateToProps)(Sidebar);
