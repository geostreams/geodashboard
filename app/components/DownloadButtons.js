import React, {Component} from 'react'
import { connect } from 'react-redux'

class DownloadButtons extends Component {
	constructor (props) {
		super(props)
		this.state = {
			clowderUrl: "https://seagrant-dev.ncsa.illinois.edu/clowder/api/geostreams/datapoints?"
		}
		this.onPermalink = this.onPermalink.bind(this)
		this.onVisualize = this.onVisualize.bind(this)
		this.buildLink= this.buildLink.bind(this)
	}

	buildLink(type) {
		//TODO: Needs Update when setting up the date and lakes
		var link=this.state.clowderUrl;
		var isFirst = true;
		var params={};
		//Update later
		//params["geocode"]=;
		var startTime="2005-01-01+01:00:00";
		var endTime = "2005-01-31+23:59:59";
		params["since"] = startTime;
		params["until"] = endTime;
		
		//if(this.props.selectedDataSources.length > 0) {params["sources"] = this.props.selectedDataSources;}
		//if(this.props.selectedParameters.length  > 0) {params["attributes"] = this.props.selectedParameters;}

		//Add lake
		//link=link+"geocode="+blabla+"&";
		// link = link+"since="+ encodeURIComponent(startTime) + "&until=" + encodeURIComponent(endTime);
		// for(var i=0; i < this.props.selectedDataSources.length; i++){
		// 	link=link+"&sources="+encodeURIComponent(this.props.selectedDataSources[i]);
		// }
		// for(var j=0; j < this.props.selectedParameters.length; j++){
		// 	link = link + "&attributes=" + encodeURIComponent(this.props.selectedParameters[j]);
		// }

		link = link+ params.toString() + "&format="+type
		console.log(link);
		return link;
	}

	onPermalink(event) {
		console.log("Permalink Clicked");
		var link=this.buildLink("json");
	}

	onVisualize(event) {
		console.log("Visualize clicked");
	}

	render() {
		return (
			<div>
				<a class="btn btn-default" download target="_blank" href={this.buildLink("csv")}> Download as CSV </a>
				<a class="btn btn-default" download target="_blank" href={this.buildLink("json")}> Download as JSON </a>
				<a class="btn btn-default" download target="_blank" onClick={this.onPermalink}> Permalink </a>
				<a class="btn btn-default" download target="_blank" onClick={this.onVisualize}> Visualize</a>
			</div>
			);
	}
}

export default DownloadButtons;