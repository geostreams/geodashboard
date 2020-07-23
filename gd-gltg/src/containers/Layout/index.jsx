// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Box, CircularProgress, makeStyles } from '@material-ui/core';

import Footer from './Footer';
import Header, { HEADERS_HEIGHT } from './Header';

const useStyles = makeStyles({
    scrim: {
        position: 'absolute',
        background: 'rgba(0, 0, 0, 0.5)',
        zIndex: 2000
    },
    main: {
        position: 'absolute',
        top: HEADERS_HEIGHT,
        width: '100%',
        height: `calc(100% - ${HEADERS_HEIGHT}px)`
    }
});

type Props = {
    isLoading: boolean;
    extraMainClasses: string;
    children: React.Node;
    hasFooter: boolean;
}

const Layout = ({ isLoading, children, extraMainClasses, hasFooter }: Props) => {
    const classes = useStyles();
    return (
        <>
            {isLoading ?
                <Box
                    className={`fillContainer ${classes.scrim}`}
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                >
                    <CircularProgress />
                </Box> :
                null}
            <Header />
            <main className={`${classes.main} ${extraMainClasses}`}>
                {children}
                {hasFooter ? <Footer /> : null}
            </main>
        </>
    );
};

Layout.defaultProps = {
    extraMainClasses: '',
    children: null,
    hasFooter: false
};

const mapStateToProps = (state) => ({
    isLoading: state.page.isLoading
});

export default connect(mapStateToProps)(Layout);
