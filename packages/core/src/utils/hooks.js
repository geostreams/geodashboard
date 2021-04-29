// @flow
import { useEffect, useRef, useState } from 'react';

import type { ElementRect } from './flowtype';

export const useInterval = (callback: Function, delay: ?number) => {
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

/**
 * A custom hook that receives an `Element` ref and returns an `ElementRect` objects.
 * The hook handles changes in the element position and size and returns those relevant attributes such
 * as top, left, width, and height in the `ElementRect` object.
 * This is handled via `handleResize` event listener. This event listener is added on component mount
 * and removed on unmount.
 * @returns {ElementRect} an `ElementRect` object
 */
export const useElementRect = (elementRef: {|current: ?React$ElementRef<string>|}): ElementRect => {
    const INITIAL_RECT: ElementRect = {
        width: null,
        height: null,
        top: null,
        right: null,
        bottom: null,
        left: null,
        marginTop: null,
        marginRight: null,
        marginBottom: null,
        marginLeft: null,
        paddingTop: null,
        paddingRight: null,
        paddingBottom: null,
        paddingLeft: null
    };

    const [rect, setRect] = useState(INITIAL_RECT);

    const handleResize = () => {
        let updatedRect = INITIAL_RECT;
        const element = elementRef.current;
        if (element) {
            const { width, height, top, bottom, right, left } = element.getBoundingClientRect();
            const refStyle = window.getComputedStyle(element);
            const paddingTop = parseFloat(refStyle.paddingTop);
            const paddingRight = parseFloat(refStyle.paddingRight);
            const paddingBottom = parseFloat(refStyle.paddingBottom);
            const paddingLeft = parseFloat(refStyle.paddingLeft);
            const marginTop = parseFloat(refStyle.marginTop);
            const marginRight = parseFloat(refStyle.marginRight);
            const marginBottom = parseFloat(refStyle.marginBottom);
            const marginLeft = parseFloat(refStyle.marginLeft);

            updatedRect = {
                width,
                height,
                top,
                right,
                bottom,
                left,
                marginTop,
                marginRight,
                marginBottom,
                marginLeft,
                paddingTop,
                paddingRight,
                paddingBottom,
                paddingLeft
            };
        }
        setRect(updatedRect);
    };

    useEffect(() => {
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return rect;
};
