// @flow
import { useEffect, useRef, useState } from 'react';

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

type ElementRect = {
    width: number | null;
    height: number | null;
    top: number | null;
    right: number | null;
    bottom: number | null;
    left: number | null;
    marginTop: number | null;
    marginRight: number | null;
    marginBottom: number | null;
    marginLeft: number | null;
    paddingTop: number | null;
    paddingRight: number | null;
    paddingBottom: number | null;
    paddingLeft: number | null;
}

/**
 * A custom hook that returns an array of a `red` and `rect` objects.
 * `ref` can be assigned to an element via its `ref` attribute and then the hook handles changes in the element position
 * and size and returns those relevant attributes such  as top, left, width, and height in `rect`.
 * This is handles via `handleResize` event listener. This event listener is added on component mount
 * and removed on unmount.
 *
 * @returns {[{current: (HTMLElement|null)}, ElementRect]}
 */
export const useElementRect = (): [{ current: HTMLElement | null }, ElementRect] => {
    const INITIAL_RECT = {
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

    const ref: { current: HTMLElement | null } = useRef(null);
    const [rect, setRect] = useState(INITIAL_RECT);

    const handleResize = () => {
        let updatedRect = INITIAL_RECT;
        if (ref.current) {
            const {
                width,
                height,
                top,
                bottom,
                right,
                left
            } = ref.current.getBoundingClientRect();
            const refStyle = window.getComputedStyle(ref.current);
            const paddingTop = parseFloat(refStyle.paddingTop);
            const paddingRight = parseFloat(refStyle.paddingRight);
            const paddingBottom = parseFloat(refStyle.paddingBottom);
            const paddingLeft = parseFloat(refStyle.paddingLeft);
            const marginTop = parseFloat(refStyle.marginTop);
            const marginRight = parseFloat(refStyle.marginRight);
            const marginBottom = parseFloat(refStyle.marginBottom);
            const marginLeft = parseFloat(refStyle.marginLeft);

            updatedRect = {
                width: width - paddingLeft - paddingRight - marginLeft - marginRight,
                height: height - paddingTop - paddingBottom - marginTop - marginBottom,
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

    return [ref, rect];
};
