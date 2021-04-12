import React from 'react';
import sinon from 'sinon';
import {expect} from 'chai';
import {shallow} from 'enzyme';
import {mount} from 'enzyme';
import Search from "./Search";
import FilterSelection from "../containers/FilterSelection";
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {fetchSensors, addEndpoints, addFilter} from '../actions/index';

describe('<Search />', () => {
    const middlewares = [thunk];
    const mockStore = configureStore(middlewares);
    let store, wrapper;
    const initialStore = {
        backends: {
            endpoints: [],
            selected: "",
            error: false
        },
        searchFilters: {
            filters: [{'id': 'locations'}, {'id': 'data_sources'}, {'id': 'parameters'}, {'id': 'time'},
                {'id': 'span'}, {'id': 'online'}],
            selected: []
        }, sensors: {
            data: [],
            parameters: [],
            sources: [],
            locations: [],
            available_sensors: [],
            draw_available_sensors: [],
            shape_coordinates: []
        }, selectedSearch: {
            data_sources: {selected: [], available: []},
            parameters: {selected: [], available: []},
            locations: {selected: null, available: []},
            dates: {selected: {start: null, end: null}, available: {start: new Date("1951-04-10"), end: new Date()}}
        }, chosenTrends: {
            parameter: '',
            season: 'spring',
            region: 'all',
            all_regions: [],
            threshold_choice: false,
            threshold: '',
            sensors: [],
            trends_sensors: [],
            trends_regions: [],
            baseline_total_year: '',
            rolling_interval: '',
            view_type: '',
            number_to_filter: 0,
            draw_available_sensors: []
        }, sensorDetail: {
            id: null, datapoints: []
        }
    };

    beforeEach(() => {
        store = mockStore(initialStore);
        store.dispatch(addEndpoints());
        store.dispatch(fetchSensors("https://seagrant-dev.ncsa.illinois.edu/geostreams"));
        store.dispatch(addFilter("locations"));
        wrapper = mount(<Provider store={store}><Search/></Provider>);
    });

    it('renders without exploding', () => {
        expect(wrapper.length).to.equal(1);
        // expect(wrapper.find(FilterSelection)).to.have.length(1);
        // expect(wrapper.find('Map').length).to.equal(1);

    })

});
