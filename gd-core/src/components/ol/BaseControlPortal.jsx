// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

type Props = {
    el: HTMLElement;
    children: React.Node | Function | string
}

const BoundaryInfo = ({ el, children }: Props) => ReactDOM.createPortal(
    children,
    el
);

export default BoundaryInfo;
