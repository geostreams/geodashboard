// @flow
import LayerSwitcher from 'ol-layerswitcher';

interface Options {
    onShow?: Function;
    onHide?: Function;
}

class CustomLayerSwitcher extends LayerSwitcher {
    constructor(options: Options) {
        const { onShow, onHide, ...originalOptions } = options;
        super(originalOptions);
        this.onShow = onShow;
        this.onHide = onHide;
    }

    showPanel() {
        super.showPanel();
        if (this.onShow) {
            this.onShow();
        }
    }

    hidePanel() {
        super.hidePanel();
        if (this.onHide) {
            this.onHide();
        }
    }
}

export default CustomLayerSwitcher;
