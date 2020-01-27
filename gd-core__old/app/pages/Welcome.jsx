/*
 * @flow
 */

import React, {Component} from 'react';
import Menu from '../containers/MenuBar';
import PolygonsYearsMapViz from '../components/PolygonsYearsMapViz';


class Welcome extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let page_content = (
            <div>
                <PolygonsYearsMapViz center={(80,80)}/>
            </div>
        );
        return (page_content)
    }

}

export default Welcome;
