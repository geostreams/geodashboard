import React, {Component, useState} from 'react';
import {Icon} from 'react-mdc-web/lib';
import styles from '../styles/map.css';
import {maxDisplayParams, displayOnlineStatus, getMobileDetailPath, getMobileSizeMax} from '../utils/getConfig'
import {Link} from 'react-router';
import {removePopup} from '../utils/mapPopup';

class ExplorePopup extends Component{

    constructor(props){
        super(props);
        this.attributes = null;
    }

    componentWillUpdate(nextProps, nextState){
        let props = nextProps;
        console.log(props)

        if(props.map && props.showPopup){
            let feature = props.features.find((feature)=>{
                return feature.attributes.name == props.popupSensorname
            });
            this.attributes= feature.attributes;
            this.attributes.maxEndTime= new Date(this.attributes.maxEndTime).toLocaleDateString();
            this.attributes.minStartTime= new Date(this.attributes.minStartTime).toLocaleDateString();
            this.attributes.id=feature.getId().toUpperCase();
        }
    }
    
    /* Renders each parameter row */
    displayParameter=(value, id)=>{
        let [param, unit ]= value.split('(',2);
        if(unit===undefined)
            unit="";
        else
            unit = '('+ unit;
        console.log(param)
        return(
                <tr>
                    <td key ={id} style={{ width:"100%", borderSpacing:"0.4em"}}>
                        {param}
                        <span className={styles.params_unit}>
                            {unit}
                        </span>
                    </td>
                </tr>

        )
    }

    renderParams=()=>{
        let params = this.attributes.parameters;
        let showError = params.length>maxDisplayParams();
        return(
            <table className={styles.params_table}>
                <tbody>
                    <tr>
                        <td style={{width: "30%", textAlign:"right", verticalAlign: "text-top"}}>
                            <strong> 
                                Parameters ({params.length})
                            </strong>
                            { showError?
                                <div style={{textAlign:"center",lineHeight:"4em"}}>
                                <i className="material-icons" style={{color:"#FF0000", height: "100%"}}>warning</i>
                                </div>
                             :
                                null
                            }
                            
                        </td>
                        <div>
                            { showError?
                                <div> 
                                    <p>There are too many parameters to display here.</p>
                                    <Link to={"/detail/location/"+this.attributes.name+"/seperate"}>View Data</Link> to
                                            see a full list of parameters for this site.
                                </div>
                                :
                                params.map((param, id)=>this.displayParameter(param, id))
                            }
                        </div>
                    </tr>
                </tbody>
            </table>
        )
    }
    // Converts latitutde longitude decimal values to degree notation.
    formatCoordinates=(lat, long)=>{
        let latitude = Number(lat).toPrecision(5).toString();
        if (latitude.includes("-")) {
            latitude = latitude.substring(1);
            latitude = latitude.concat("\u00B0S");
        } else {
            latitude = latitude.concat("\u00B0N");
        }
        let longitude = Number(long).toPrecision(5).toString();
        if (longitude.includes("-")) {
            longitude = longitude.substring(1);
            longitude = longitude.concat("\u00B0W");
        } else {
            longitude = longitude.concat("\u00B0E");
        }
        return({latitude, longitude})
    }

    // Returns a single row of header data
    renderRows=(label, value, id)=>{
        return(
            <tr key={id}>
                <td className={styles.table_title} style={{width:"30%",  textAlign:"right"}} >
                    <strong> {label} </strong>
                </td>
                <td style={{width:"70%"}}>
                    {value}
                </td>
            </tr>
        )
    }

    closePopup=(e)=>{
        event.preventDefault();
        removePopup(this.props.map);
        this.props.resetDetailPage();
    }

    
    render(){
        // Renders an empty div if popup is to be hidden
        if(!this.attributes || !this.props.showPopup){
            return(<div id="popup"></div>)
        }
        const {id, color, dataSource, maxEndTime, minStartTime, onlineStatus} = this.attributes;
        const {latitude, longitude} = this.formatCoordinates(this.attributes.latitude,this.attributes.longitude)
        let tableValues=[
            {label: "Data Source", value: dataSource + " Monitoring Sites"} ,
            {label: "Time Period", value: minStartTime + " - " + maxEndTime},
            {label: "Lat, Long", value: latitude + " - " + longitude}
        ]
        if(onlineStatus && displayOnlineStatus()){
            let onlineStatus = sensorInfo.onlineStatus.charAt(0).toUpperCase() + sensorInfo.onlineStatus.slice(1);
            tableValues.push({label: "Online Status", value: onlineStatus})
        }
        let detailLink= "/detail/location/"

        // Gets the mobile link from config if required
        if (screen.width <= getMobileSizeMax()) {
            detailLink = getMobileDetailPath();
        }
        detailLink += this.attributes.name+"/seperate";

        return(
            <div id="popup" className={styles.olPopup}>
                <h2 className={styles.header2style} style={{backgroundColor: color}}>{id}</h2>
                <div onClick={this.closePopup} id="popupcloser" className={styles.olPopupCloser}>
                    <Icon name="close"/>
                </div>
                <div id="popup-details">
                <table className={styles.popup_table}>
                <tbody>
                    {tableValues.map(({label,value}, id)=>
                        this.renderRows(label, value, id)
                    )}
                </tbody>
                </table>
                {this.renderParams()}
                <Link className={styles.viewdetail} to={detailLink}>View Data</Link>
                </div>
            </div>
        )
    }
}

export default ExplorePopup;