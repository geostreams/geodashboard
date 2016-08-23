import { connect } from 'react-redux'
import { addSearchParameter, addSearchDataSource } from '../actions'
import filterOption from '../components/FilterOption' 

const mapStateToProps = (state, ownProps) => {
	return {
		selectedParameters: state.selectedParameters.parameters,
  		selectedDataSources: state.selectedDataSources.data_sources,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onOptionChange: (event, selectedParameters, selectedDataSources) => {
			
			var value = event.target.value;
			if(event.target.checked){
		    	if(event.target.name=="parameters") {
			    	selectedParameters.push(value);
			    	dispatch(addSearchParameter(selectedParameters));
			    		
		    	} else if( event.target.name == "data_source") { 	
			    	selectedDataSources.push(value);
			    	dispatch(addSearchDataSource(selectedDataSources));
		    	}

		    } else {
		    	if(event.target.name=="parameters") {
					var idx = selectedParameters.indexOf(value);
					if(idx > -1) {
						selectedParameters.splice(idx, 1);
						
			    		dispatch(addSearchParameter(selectedParameters));
			    		
					}
		    	} else if(event.target.name=="data_source") {
					var idx = selectedDataSources.indexOf(value);
					if(idx > -1) {
						selectedDataSources.splice(idx, 1);
						dispatch(addSearchDataSource(selectedDataSources));
			    		
					}
		    	}
		    }
		}
	}
}

const UpdateFilters = connect(mapStateToProps, mapDispatchToProps)(filterOption)

export default UpdateFilters