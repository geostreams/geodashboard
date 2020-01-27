// @flow
import CONFIG from '../config'
import type { PropertiesType } from './flowtype'

export const getSensorName = ({ location, name, popupContent }: PropertiesType): string => (
    popupContent && (popupContent !== name) ? popupContent : location || name
)

export const getSourceName = (source: { id: string, title: string }): string => {
    const sourceId = source.id.toLowerCase()
    if (CONFIG.source[sourceId]) {
        return CONFIG.source[sourceId].label || source.title
    }
    return source.title
}

export const getSourceColor = (id: string) => {
    const sourceId = id.toLowerCase()
    return CONFIG.source[sourceId] ? CONFIG.source[sourceId].color : '#17495B'
}
