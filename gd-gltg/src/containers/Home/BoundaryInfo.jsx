// @flow
import * as React from 'react';
import ReactDOM from 'react-dom';

type Props = {
    el: HTMLElement;
    content: ?React.Node
}

const BoundaryInfo = ({ el, content }: Props) => ReactDOM.createPortal(
    <>{content}</>,
    el
);

export default BoundaryInfo;
