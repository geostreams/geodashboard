/*
 * @flow
 */

import type {PropertiesType} from './flowtype';

export function getSourceName(source: PropertiesType): string {
    const sourceName = window.configruntime.gd3.sourcename;
    return sourceName[source.id] !== undefined ? sourceName[source.id] : source.title;
}

export function getSourceOrder() {
    return window.configruntime.gd3.source_order;
}

export function getSourceInfo(id: string) {
    const sourceInfo = window.configruntime.gd3.source_information;
    return sourceInfo[id];
}

export function getShowSourceInfoBoxes() {
    return window.configruntime.gd3.show_source_info_boxes;
}

export function getMobileSourceNames() {
    return window.configruntime.gd3.mobile_sourcename;
}

export function getMobileSizeMax() {
    return window.configruntime.gd3.mobile_size_max;
}

export function getMobileDetailPath() {
    return window.configruntime.gd3.mobile_detail_path;
}

export function getMobileExplorePath() {
    return window.configruntime.gd3.mobile_explore_path;
}

export function getCustomLocation(location: string): Object {
    const additional_location = window.configruntime.gd3.additional_locations;

    return additional_location.find(
        function (custom_location) {
            return custom_location.properties.id === location;
        });
}

export function getAreaLocations(location: string): Object {
    const sensors_regions = window.configruntime.gd3.sensors_regions;

    return sensors_regions.find(
        function (custom_location) {
            return custom_location.properties.id === location;
        });
}

export function getLakesOrdering(key: string) {
    const additional_locations = window.configruntime.gd3.additional_locations;
    let order = {};
    additional_locations.map(location => {
        order[location.properties[key].toUpperCase()] = location.properties.sortOrder;
    });

    return order;
}

export function getRegionToTitleMap() {
    const additional_locations = window.configruntime.gd3.additional_locations;
    let map = {};
    additional_locations.map(location => {
        if (Object.keys(map).indexOf(location.properties.region.toUpperCase()) < 0)
            map[location.properties.region.toUpperCase()] = location.properties.title;
    });

    return map;
}

export function getLocationName(location: string): string {
    // old code, keep this for other geodashboard
    //const named_locations = window.configruntime.gd3.named_locations;
    //if( named_locations[location] !== undefined)
    //    return named_locations[location]
    const custom_location = getCustomLocation(location);

    if (custom_location)
        return custom_location.properties.title;
    return location;
}

export function getTrendSettings() {
    return window.configruntime.gd3.trend_settings;
}

export function getTrendsPageSettings() {
    return window.configruntime.gd3.trends_page_settings;
}

export function getTrendsPageLakeRegions() {
    return window.configruntime.gd3.trends_page_lake_regions;
}

export function getTrendsRegionsSettings() {
    return window.configruntime.gd3.draw_and_all_regions
        .concat(window.configruntime.gd3.additional_locations);
}

export function getTrendsPageSeasons() {
    return window.configruntime.gd3.trends_page_seasons;
}

export function getTrendsPageTimeframes() {
    return window.configruntime.gd3.trends_page_timeframes;
}

export function getCustomTrendsRegion(region: string): string {
    let custom_trends_region = '';
    let trendsPageRegions = getTrendsRegionsSettings();

    if (trendsPageRegions) {
        trendsPageRegions.map(r => {
            if (r.properties.id.toUpperCase() === region.toUpperCase()) {
                custom_trends_region = r.properties.title;
                return custom_trends_region;
            }
        })
    }

    return custom_trends_region;
}

export function getTrendsDefaultValues() {
    return window.configruntime.gd3.trends_page_defaults;
}

export function getTrendsAnalysisDefaultValues() {
    return window.configruntime.gd3.trends_analysis_defaults;
}

export function getTrendRegions() {
    return window.configruntime.gd3.draw_and_all_regions
        .concat(window.configruntime.gd3.additional_locations);
}

export function getCustomTrendRegion(region: string): Object {
    const trendsPageRegions = getTrendRegions();

    return trendsPageRegions.find(
        function (custom_trends_region) {
            return custom_trends_region.properties.id === region;
        });
}

export function getTrendsSources() {
    return window.configruntime.gd3.trends_sources;
}

export function getColor(source: string): string {
    let sourcecolor = window.configruntime.gd3.sourcecolor;
    return sourcecolor[source] !== undefined ? sourcecolor[source] : '#17495B';
}

export function getTrendColor(source: string): string {
    let trend_colors = window.configruntime.gd3.trend_colors;
    return trend_colors[source] !== undefined ? trend_colors[source] : '#7F7F7F';
}

export function getApplicationOptions() {
    return window.configruntime.gd3.application_options;
}

export function getApplicationBackends() {
    return window.configruntime.gd3.geostreaming_endpoints;
}

export function getApplicationWebsite() {
    return window.configruntime.gd3.application_website;
}

export function getErrorText() {
    return window.configruntime.gd3.error_text;
}

export function getLayersDetails() {
    let layersDetails = [];
    if (window.configruntime.gd3.exploreLayers) {
        layersDetails = window.configruntime.gd3.exploreLayers;
    }
    return layersDetails;
}

export function getAvailableLayers() {
    let available_layers = [];

    getLayersDetails().map(function (p) {
        // Check if blank for HTML
        if (p.legendImage.length === 0) {
            p.legendImage = "";
        }

        available_layers.push({
            'title': p.title,
            'opacity': p.opacity,
            'visibility': p.visibility,
            'layerGroup': p.layerGroup,
            'legendShow': p.legendShow,
            'legendStartOpen': p.legendStartOpen,
            'legendTitle': p.legendTitle,
            'legendText': p.legendText,
            'legendImage': p.legendImage
        })
    });

    return available_layers;
}

export function getAnalysisLayersDetails() {
    let layersDetails = [];
    if (window.configruntime.gd3.analysisLayers) {
        layersDetails = window.configruntime.gd3.analysisLayers;
    }
    return layersDetails;
}

export function getAnalysisAvailableLayers() {
    let available_layers = [];

    getAnalysisLayersDetails().map(function (p) {
        available_layers.push({
            'title': p.title,
            'opacity': p.opacity,
            'visibility': p.visibility,
        })
    });

    return available_layers;
}

export function getMapTileURLSetting() {
    let mapTileURLSetting = '';
    if (window.configruntime.gd3.mapTileURL) {
        mapTileURLSetting = window.configruntime.gd3.mapTileURL;
    }
    return mapTileURLSetting;
}

export function getMapAttributionsSetting() {
    let mapAttributionsSetting = '';
    if (window.configruntime.gd3.mapAttributions) {
        mapAttributionsSetting = window.configruntime.gd3.mapAttributions;
    }
    return mapAttributionsSetting;
}

export function getMapAttributionsCollapsibleSetting() {
    let CollapsibleSetting = '';
    if (window.configruntime.gd3.mapAttributionsCollapsible) {
        CollapsibleSetting = window.configruntime.gd3.mapAttributionsCollapsible;
    }
    return CollapsibleSetting;
}

export function getMapMiniAttributionsCollapsibleSetting() {
    let miniCollapsibleSetting = '';
    if (window.configruntime.gd3.mapMiniAttributionsCollapsible) {
        miniCollapsibleSetting = window.configruntime.gd3.mapMiniAttributionsCollapsible;
    }
    return miniCollapsibleSetting;
}

export function getIEAlertBoxTitle() {
    let getValue = '';
    if (window.configruntime.gd3.ie_message_title) {
        getValue = window.configruntime.gd3.ie_message_title;
    }
    return getValue;
}

export function getIEAlertBoxBody() {
    let getValue = '';
    if (window.configruntime.gd3.ie_message_text) {
        getValue = window.configruntime.gd3.ie_message_text;
    }
    return getValue;
}

export function getIEAlertHeader() {
    let getValue = '';
    if (window.configruntime.gd3.ie_menu_bar_message_text) {
        getValue = window.configruntime.gd3.ie_menu_bar_message_text;
    }
    return getValue;
}

export function getIEVersionsBeforeEleven() {
    let getValue = '';
    if (window.configruntime.gd3.ie_versions_before_eleven) {
        getValue = window.configruntime.gd3.ie_versions_before_eleven;
    }
    return getValue;
}

export function getIEVersionEleven() {
    let getValue = '';
    if (window.configruntime.gd3.ie_version_eleven) {
        getValue = window.configruntime.gd3.ie_version_eleven;
    }
    return getValue;
}

export function getIEVersionEdge() {
    let getValue = '';
    if (window.configruntime.gd3.ie_version_edge) {
        getValue = window.configruntime.gd3.ie_version_edge;
    }
    return getValue;
}

export function getIEAlertButtonText() {
    let getValue = '';
    if (window.configruntime.gd3.ie_button_text) {
        getValue = window.configruntime.gd3.ie_button_text;
    }
    return getValue;
}

export function getIEAlertShow() {
    let getValue = '';
    if (window.configruntime.gd3.ie_show_alert_popup) {
        getValue = window.configruntime.gd3.ie_show_alert_popup;
    }
    return getValue;
}

export function getIEAlertMenuBarShow() {
    let getValue = '';
    if (window.configruntime.gd3.ie_show_alert_popup) {
        getValue = window.configruntime.gd3.ie_show_menu_bar_alert;
    }
    return getValue;
}

export function getShowDetailTabs() {
    let getValue = '';
    if (window.configruntime.gd3.show_detail_tabs) {
        getValue = window.configruntime.gd3.show_detail_tabs;
    }
    return getValue;
}

export function getDetailPageSeparateInfoText() {
    let getValue = '';
    if (window.configruntime.gd3.detail_page_separate) {
        getValue = window.configruntime.gd3.detail_page_separate;
    }
    return getValue;
}

export function getDetailPageCombinedInfoText() {
    let getValue = '';
    if (window.configruntime.gd3.detail_page_combined) {
        getValue = window.configruntime.gd3.detail_page_combined;
    }
    return getValue;
}

export function getDetailPageBAWInfoText() {
    let getValue = '';
    if (window.configruntime.gd3.detail_page_box_and_whisker) {
        getValue = window.configruntime.gd3.detail_page_box_and_whisker;
    }
    return getValue;
}

export function getRawProcessedInfoText() {
    let getValue = [];
    if (window.configruntime.gd3.detail_page_raw_processed) {
        let listValues = window.configruntime.gd3.detail_page_raw_processed;
        listValues.map(function (value) {
            getValue.push({
                'listText': value.listText,
            })
        });
    }
    return getValue;
}

export function getShowRawProcessed() {
    return window.configruntime.gd3.show_raw_processed;
}

export function getProcessedProperty() {
    return window.configruntime.gd3.raw_processed_property;
}

export function getChromeDisabled() {
    let getValue = false;
    if (window.configruntime.gd3.chrome_detail_mobile_disabled) {
        getValue = window.configruntime.gd3.chrome_detail_mobile_disabled;
    }
    return getValue;
}

export function getMobileFilterSensors() {
    let getValue = false;
    if (window.configruntime.gd3.filter_unavailable_sensors) {
        getValue = window.configruntime.gd3.filter_unavailable_sensors;
    }
    return getValue;
}

export function getClustersDistance() {
    let cluster_distance = 1;
    if (window.configruntime.gd3.mapClustersDistance) {
        cluster_distance = window.configruntime.gd3.mapClustersDistance;
    }
    return cluster_distance;
}

export function clustersChoiceOption() {
    let cluster_choice = false;
    if (window.configruntime.gd3.clustersChoiceOption) {
        cluster_choice = window.configruntime.gd3.clustersChoiceOption;
    }
    return cluster_choice;
}

export function getTimeSeriesSensorExtent() {
    let time_series_sensor_extent = false;
    if (window.configruntime.gd3.time_series_sensor_extent) {
        time_series_sensor_extent = true;
    }
    return time_series_sensor_extent;
}

export function getChartLineDefault() {
    let getValue = false;
    if (window.configruntime.gd3.lines_default) {
        getValue = window.configruntime.gd3.lines_default;
    }
    return getValue;
}

export function getChartLineChoice() {
    let getValue = false;
    if (window.configruntime.gd3.lines_choice) {
        getValue = window.configruntime.gd3.lines_choice;
    }
    return getValue;
}

export function getStartAtZeroChoice() {
    let getValue = false;
    if (window.configruntime.gd3.zero_start_choice) {
        getValue = window.configruntime.gd3.zero_start_choice;
    }
    return getValue;
}

export function getUseSameTimescaleChoice() {
    let getValue = false;
    if (window.configruntime.gd3.same_timescale_choice) {
        getValue = window.configruntime.gd3.same_timescale_choice;
    }
    return getValue;
}

export function getDownloadButtonPath() {
    let getValue = '/geostreams/datapoints/download?';
    if (window.configruntime.gd3.download_button_path) {
        getValue = window.configruntime.gd3.download_button_path;
    }
    return getValue;
}

export function getDownloadButtonPathCount() {
    let getValue = '/geostreams/api/datapoints?';
    if (window.configruntime.gd3.download_button_path_count) {
        getValue = window.configruntime.gd3.download_button_path_count;
    }
    return getValue;
}

export function getDownloadMaxDatapointsAllowed() {
    let getValue = 500;
    if (window.configruntime.gd3.download_count_max_datapoints) {
        getValue = window.configruntime.gd3.download_count_max_datapoints;
    }
    return getValue;
}

export function getGeneralDownloadErrorText() {
    let getValue = 'An ERROR occurred with Download - Please try again!';
    if (window.configruntime.gd3.general_error) {
        getValue = window.configruntime.gd3.general_error;
    }
    return getValue;
}

export function getDatapointsDownloadErrorText() {
    let getValue = 'Too Many Datapoints to Download - Please try again!';
    if (window.configruntime.gd3.max_datapoints_error) {
        getValue = window.configruntime.gd3.max_datapoints_error;
    }
    return getValue;
}

export function getTimeSeriesZeroStart() {
    return window.configruntime.gd3.time_series_zero_start;
}

export function getExploreSections() {
    let exploreSections = [];
    if (window.configruntime.gd3.additional_explore_accordion_sections) {
        exploreSections = window.configruntime.gd3.additional_explore_accordion_sections;
    }
    return exploreSections;
}

export function getExploreSourcesOpen() {
    let exploreSourcesOpen = false;
    if (window.configruntime.gd3.sources_explore_accordion_open) {
        exploreSourcesOpen = window.configruntime.gd3.sources_explore_accordion_open;
    }
    return exploreSourcesOpen;
}

export function getExploreCategoriesOpen() {
    let exploreCategoriesOpen = false;
    if (window.configruntime.gd3.categories_accordion_section_display) {
        exploreCategoriesOpen = window.configruntime.gd3.categories_accordion_section_display;
    }
    return exploreCategoriesOpen;
}

export function detailSeasonBins() {
    let useSeasonBins = false;
    if (window.configruntime.gd3.detail_season_bins) {
        useSeasonBins = window.configruntime.gd3.detail_season_bins;
    }
    return useSeasonBins;
}

export function detailSeasonBinsSources() {
    let seasonBinsSources = [];
    if (window.configruntime.gd3.detail_season_bins_sources) {
        seasonBinsSources = window.configruntime.gd3.detail_season_bins_sources;
        seasonBinsSources = seasonBinsSources.map(lowercase_val => {
            return lowercase_val.toLowerCase();
        })
    }
    return seasonBinsSources;
}

export function displayOnlineStatus() {
    let getValue = false;
    if (window.configruntime.gd3.display_online_status) {
        getValue = window.configruntime.gd3.display_online_status;
    }
    return getValue;
}

export function maxDisplayParams() {
    let maxValue = 10;
    if (window.configruntime.gd3.max_display_params) {
        maxValue = window.configruntime.gd3.max_display_params;
    }
    return maxValue;
}

export function maxZoom() {
    let maxValue = 12;
    if (window.configruntime.gd3.mapMaxZoom) {
        maxValue = window.configruntime.gd3.mapMaxZoom;
    }
    return maxValue;
}

export function minZoom() {
    let minValue = 5.5;
    if (window.configruntime.gd3.mapMinZoom) {
        minValue = window.configruntime.gd3.mapMinZoom;
    }
    return minValue;
}

export function mapMiniMinZoom() {
    let mapMiniMinZoom = 3;
    if (window.configruntime.gd3.mapMiniMinZoom) {
        mapMiniMinZoom = window.configruntime.gd3.mapMiniMinZoom;
    }
    return mapMiniMinZoom;
}

export function mapCenter() {
    let mapCenterValue = [-84.44799549, 38.9203417];
    if (window.configruntime.gd3.mapCenterValue) {
        mapCenterValue = window.configruntime.gd3.mapCenterValue;
    }
    return mapCenterValue;
}

export function startExploreSourcesOpened() {
    let getValue = false;
    if (window.configruntime.gd3.start_explore_each_source_open) {
        getValue = window.configruntime.gd3.start_explore_each_source_open;
    }
    return getValue;
}

export function getCarouselImageNames() {
    let nameList = '';
    if (window.configruntime.gd3.home_page_carousel_images) {
        nameList = window.configruntime.gd3.home_page_carousel_images;
    }
    return nameList;
}

export function getCarouselImageCaptions() {
    let captionList = '';
    if (window.configruntime.gd3.home_page_carousel_captions) {
        captionList = window.configruntime.gd3.home_page_carousel_captions;
    }
    return captionList;
}

export function getMapPopupZoom() {
    let getValue = 10;
    if (window.configruntime.gd3.mapPopupZoomMax) {
        getValue = window.configruntime.gd3.mapPopupZoomMax;
    }
    return getValue;
}

export function getLoadingTimeLimit() {
    let getValue = 100000;
    if (window.configruntime.gd3.load_time_limit) {
        getValue = window.configruntime.gd3.load_time_limit;
    }
    return getValue;
}

export function getIntervalTime() {
    let getValue = 3000;
    if (window.configruntime.gd3.set_interval_time) {
        getValue = window.configruntime.gd3.set_interval_time;
    }
    return getValue;
}

export function clustersExpandMaxNumberFeatures() {
    let getValue = 20;
    if (window.configruntime.gd3.clustersExpandMaxNumberFeatures) {
        getValue = window.configruntime.gd3.clustersExpandMaxNumberFeatures;
    }
    return getValue;
}

export function getAnalysisSearchInfoDetails() {
    let analysisSearchDetails = [];
    if (window.configruntime.gd3.analysis_search_info) {
        analysisSearchDetails = window.configruntime.gd3.analysis_search_info;
    }
    return analysisSearchDetails;
}

export function getAnalysisSearchInfo() {
    let analysis_search = [];

    getAnalysisSearchInfoDetails().map(function (p) {
        analysis_search.push({
            "id": p.id,
            "title": p.title,
            "parameter": p.parameter,
            "baseline": p.baseline,
            "rolling": p.rolling,
            "threshold": p.threshold,
            "region": p.region,
        })
    });

    return analysis_search;
}

export function useAnalysisSearches() {
    let getValue = false;
    if (window.configruntime.gd3.use_analysis_searches) {
        getValue = window.configruntime.gd3.use_analysis_searches;
    }
    return getValue;
}

export function getAnalysisSearchHeading() {
    let getValue = 'Saved Searches: ';
    if (window.configruntime.gd3.analysis_search_heading) {
        getValue = window.configruntime.gd3.analysis_search_heading;
    }
    return getValue;
}

export function getBoundaryTitle(){
    let getValue = 'Boundary Type Title';
    if (window.configruntime.gd3.boundary_title) {
        getValue = window.configruntime.gd3.boundary_title;
    }
    return getValue;
}

export function getBoundaryDescription(){
    let getValue = {
        'description': 'Boundary Type Description'
    };
    if (window.configruntime.gd3.boundary_description) {
        getValue = window.configruntime.gd3.boundary_description;
    }
    return getValue;
}

export function getNutrientTitle(){
    let getValue = 'Nutrient Title';
    if (window.configruntime.gd3.nutrient_title) {
        getValue = window.configruntime.gd3.nutrient_title;
    }
    return getValue;
}

export function getNutrientDescription(){
    let getValue = {
        'description': 'Nutrient Description'
    };
    if (window.configruntime.gd3.nutrient_description) {
        getValue = window.configruntime.gd3.nutrient_description;
    }
    return getValue;
}

export function getContextualLayers() {
    return window.configruntime.gd3.contextual_layers || [];
}