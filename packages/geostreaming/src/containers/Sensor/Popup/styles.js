// @flow
import { makeStyles } from '@material-ui/core';

export default makeStyles((theme) => ({
    card: {
        minWidth: 300,
        maxWidth: 420
    },
    cardContent: {
        padding: 6
    },
    cardContentGrey: {
        background: '#eee'
    },
    cardHeader: {
        color: theme.palette.primary.contrastText
    },
    cardProperties: {
        padding: 0
    },
    cardActions: {
        justifyContent: 'center'
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(0.5),
        top: theme.spacing(1),
        color: '#fff'
    },
    tableText: {
        fontSize: '0.8rem',
        padding: theme.spacing(0.8),
        alignSelf: 'center'
    },
    trendChange: {
        width: 70,
        height: 40,
        marginTop: -5,
        paddingTop: 20,
        fontSize: '1rem',
        fontWeight: 'bold'
    }
}));
