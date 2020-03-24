/*
 * @flow
 */

import React, {Component, PropTypes} from 'react';
import exploreStyles from '../styles/explore.css';
import ExploreLayersItems from '../containers/ExploreLayersItems';
import {
    Button, Drawer, DrawerContent, DrawerHeaderContent, DrawerSpacer, Icon
} from 'react-mdc-web/lib';

class ExploreLayers extends Component {
    constructor(props: Object) {
        super(props);

        (this: any).openLayersDrawer = this.openLayersDrawer.bind(this);
        (this: any).closeLayersDrawer = this.closeLayersDrawer.bind(this);
    }

    openLayersDrawer() {
        let the_layers_drawer = document.getElementById('layersDrawer');
        if (the_layers_drawer) {
            the_layers_drawer.style.visibility = "visible";
        }
    }

    closeLayersDrawer() {
        let the_layers_drawer = document.getElementById('layersDrawer');
        if (the_layers_drawer) {
            the_layers_drawer.style.visibility = "hidden";
        }
    }

    render() {

        let layersData = (
            <div>
                <div className={exploreStyles.layersButton}>
                    <Button
                        id="openButton"
                        raised
                        onClick={this.openLayersDrawer}
                    >
                        <span className={exploreStyles.layersButtonText}>Explore Layers</span>
                    </Button>
                </div>
                <div id="layersDrawer" className={exploreStyles.layersDrawerClass}>
                    <span>
                        <Drawer
                            className={exploreStyles.drawerSettings}
                            open={true}
                        >
                            <DrawerSpacer className={exploreStyles.layersHeader}>
                                <div className={exploreStyles.layersCloseButtonDiv}>
                                    <Button
                                        className={exploreStyles.layersCloseButton}
                                        id="closeButton"
                                        default
                                        onClick={this.closeLayersDrawer}
                                    >
                                        <Icon name='close'/>
                                    </Button>
                                </div>
                                <span>
                                    Explore Layers
                                </span>
                            </DrawerSpacer>
                            <DrawerContent>
                                <ExploreLayersItems/>
                            </DrawerContent>
                        </Drawer>
                    </span>
                </div>
            </div>
        );

        return (layersData);

    }

}

export default ExploreLayers;
