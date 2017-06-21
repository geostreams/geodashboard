import { connect } from 'react-redux'
import SearchComponent from '../components/Search'

const mapStateToProps = (state) => {
    return {
        availableSensors: state.sensors.available_sensors,
        selectedSearchLocation: state.selectedSearch.locations.selected
    }
};

const Search = connect(mapStateToProps)(SearchComponent);

export default Search