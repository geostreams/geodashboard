import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux'
import styles from '../styles/filterOption.css'
import * as ActionCreators from '../actions'

class FilterOption extends Component {
	constructor(props) {
	    super(props);

	    this.state = {
	      dimension: ""
	    };
	    this.handleChange = this.handleChange.bind(this)
	}

	handleChange(event) {
		const {actions} = this.props;
	    var value = event.target.value;
	    console.log(value, " option was selected");
	    if(event.target.checked){
	    	if(event.target.name=="parameters") {
		    	this.props.selectedParameters.push(value);
		    	actions.addSearchParameter(this.props.selectedParameters);
		    		
	    	} else if( event.target.name == "data_source") { 	
		    	this.props.selectedDataSources.push(value);
		    	actions.addSearchDataSource(this.props.selectedDataSources);
	    	}

	    } else {
	    	if(event.target.name=="parameters") {
				var idx = this.props.selectedParameters.indexOf(value);
				if(idx > -1) {
					this.props.selectedParameters.splice(idx);
					
		    		actions.addSearchParameter(this.props.selectedParameters);
		    		
				}
	    	} else if(event.target.name=="data_source") {
				var idx = this.props.selectedDataSources.indexOf(value);
				if(idx > -1) {
					this.props.selectedDataSources.splice(idx);
					actions.addSearchDataSource(this.props.selectedDataSources);
		    		
				}
	    	}
	    }
	    // this.setState({selectValue: event.target.value})
	    // this.props.onFiltersChange(this.props.selectedParameters, this.props.selectedDataSources);
  	}

	render() {
		return (
			<div className={styles.row}>
				<div className={styles.col1}>
					<input type="checkbox" name={this.props.name} value={this.props.id} onChange={this.handleChange}></input>
				</div>
				<div className={styles.col2}>{this.props.label}</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
  return {
  	selectedParameters: state.selectedParameters.parameters,
  	selectedDataSources: state.selectedDataSources.data_sources,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
  	 actions: bindActionCreators(ActionCreators, dispatch)
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(FilterOption)