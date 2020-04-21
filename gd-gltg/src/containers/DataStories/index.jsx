// @flow
import React from 'react';
import {
    Avatar,
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import MenuBookIcon from '@material-ui/icons/MenuBook';

import dataStories from './pages';
import Details from './Details';

const useStyle = makeStyles({
    header: {
        verticalAlign: 'text-top',
        marginTop: 20
    },
    icon: {
        marginRight: 10
    },
    card: {
        width: '18rem',
        height: '18rem'
    }
});

const DataStories = () => {
    const classes = useStyle();
    const [iframeProps, updateIframeProps] = React.useState({});
    const handleModalClose = () => updateIframeProps({});
    return (
        <>
            <Details {...iframeProps} handleClose={handleModalClose} />
            <Container>
                <Typography
                    className={classes.header}
                    variant="h4"
                    noWrap
                    gutterBottom
                >
                    <Avatar className={`left ${classes.icon}`}>
                        <MenuBookIcon />
                    </Avatar>
                    All Data Stories
                </Typography>
                <Divider />
                <Grid container spacing={4}>
                    {dataStories.map(({ title, thumbnail, slides }) => (
                        <Grid key={title} item xs={4}>
                            <Card
                                raised
                                onClick={() => updateIframeProps({
                                    source: slides,
                                    title
                                })}
                            >
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        src={thumbnail}
                                        title={title}
                                    />
                                    <CardContent>
                                        <Typography
                                            gutterBottom
                                            variant="h5"
                                            component="h2"
                                        >
                                            {title}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default DataStories;
