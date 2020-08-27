// @flow
import type { Config } from '../utils/flowtype';

const UPDATE_GEOSTREAMING_CONFIG = 'UPDATE_GEOSTREAMING_CONFIG';
type UpdateGeostreamingConfigAction = {
    type: 'UPDATE_GEOSTREAMING_CONFIG',
    config: Config
}
export const updateGeoStreamingConfig = (config: { [k: string]: any }): UpdateGeostreamingConfigAction => ({
    type: UPDATE_GEOSTREAMING_CONFIG,
    config
});

export type Action =
    | UpdateGeostreamingConfigAction


export const ACTIONS = {
    UPDATE_GEOSTREAMING_CONFIG
};
