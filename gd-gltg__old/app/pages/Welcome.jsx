/*
 * @flow
 */

import React, {Component} from 'react';
import PolygonsYearsMapViz from '../components/PolygonsYearsMapViz';
import Footer from '../components/Footer';


class Welcome extends Component {

    constructor(props: Object) {
        super(props);
    }

    render() {
        let page_content = (
            <div>
                <PolygonsYearsMapViz/>
                <Footer/>
            </div>
        );

        return (page_content)
    }

}

export default Welcome;
