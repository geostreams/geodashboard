// @flow
import { Control as _Control } from 'ol/control'

class Control extends _Control {
    constructor(opts: { className: ?string; }) {
        const element = document.createElement('div')
        const className = opts.className || ''
        element.className = `ol-control ${className}`

        super({ ...opts, element })
    }
}

export default Control
