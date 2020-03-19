// @flow
import * as React from 'react'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles, Paper } from '@material-ui/core'

const useStyle = makeStyles((theme) => ({
    popup: {
        padding: theme.spacing(1)
    },
    popupClose: {
        position: 'absolute',
        top: 5,
        right: 5,
        zIndex: 1000,
        cursor: 'pointer',
        color: 'red'
    }
}))

type Props = {
    content: Function | React.Node;
    setRef: Function;
    handleClose: ?Function;
}

const Popup = ({ content, setRef, handleClose }: Props) => {
    const classes = useStyle()
    return (
        <Paper
            ref={setRef}
            className={classes.popup}
            square
        >
            {handleClose ?
                <CloseIcon
                    className={classes.popupClose}
                    fontSize="small"
                    onClick={handleClose}
                /> :
                null}
            {content}
        </Paper>
    )
}

export default Popup
