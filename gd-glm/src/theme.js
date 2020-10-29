// @flow
import { createMuiTheme } from '@material-ui/core';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#283d4b',
            light: '#374a58',
            lighter: '#d4dce7',
            contrastText: '#fff'
        }
    },
    typography: {
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        h1: {
            fontFamily: 'Cabin, sans-serif',
            fontWeight: '600',
            fontSize: '38px',
            lineHeight: '40px',
            letterSpacing: '2px'
        },
        h2: {
            fontFamily: '"Open Sans", sans-serif',
            fontWeight: '300',
            fontSize: '18px',
            letterSpacing: '3px',
            color: '#65c8d0',
            textAlign: 'left',
            margin: '0 0 0 2em',
            lineHeight: '22px'
        }
    }
});

export default theme;
