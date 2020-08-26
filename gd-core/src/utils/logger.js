// @flow
/* eslint-disable no-console */

const log = (type: 'debug' | 'warn' | 'info' | 'error', msg: string) => {
    if (type === 'debug') {
        if (process.env.NODE_ENV === 'development') {
            console.log(msg);
        }
    } else {
        console[type](msg);
    }
};

export default {
    debug: (msg: string) => log('debug', msg),
    warn: (msg: string) => log('warn', msg),
    info: (msg: string) => log('info', msg),
    error: (msg: string) => log('error', msg)
};
