// @flow
import { useEffect, useRef } from 'react';

const useInterval = (callback: Function, delay: ?number) => {
    const savedCallback: { current: Function } = useRef();

    // Remember the latest function.
    useEffect(
        () => { savedCallback.current = callback; },
        [callback]
    );

    // Set up the interval.
    useEffect(
        // eslint-disable-next-line consistent-return
        () => {
            const tick = () => {
                savedCallback.current();
            };

            if (delay !== null) {
                const interval = setInterval(tick, delay);
                return () => clearInterval(interval);
            }
        },
        [delay]
    );
};

export default {
    useInterval
};
