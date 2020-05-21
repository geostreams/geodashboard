// @flow
import React from 'react';
import { Container, makeStyles, Modal, Typography } from '@material-ui/core';
import CloseIcon from '@material-ui/core/SvgIcon/SvgIcon';

const useStyle = makeStyles({
    header: {
        verticalAlign: 'text-top',
        marginTop: 20
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    modalContent: {
        width: '90%',
        height: '90%',
        background: '#fff',
        paddingTop: 20
    },
    iframe: {
        width: '100%',
        height: '90%'
    }
});

type Props = {
    title: string,
    source: ?string,
    handleClose: Function
}

const Details = ({
    title,
    source,
    handleClose
}: Props) => {
    const classes = useStyle();
    return (
        <Modal
            className={classes.modal}
            open={!!title}
            onClose={handleClose}
        >
            <Container className={classes.modalContent}>
                <Typography
                    className={classes.header}
                    align="center"
                    variant="h5"
                    noWrap
                    gutterBottom
                >
                    {title}
                    <CloseIcon
                        className="right actionIcon"
                        onClick={handleClose}
                    />
                </Typography>
                <iframe
                    src={source}
                    title={title}
                    className={classes.iframe}
                />
            </Container>
        </Modal>
    );
};

Details.defaultProps = {
    title: '',
    source: null
};

export default Details;
