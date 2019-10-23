import React, { Component } from 'react';
import './DeviceWidget.css';
import axios from "axios";
import WidgetDataProcessor from './WidgetDataProcessor';
import {DeviceDataRow} from './DeviceDataRow';
import {BasicMapFGP} from '../Map/BasicMapFGP/BasicMapFGP';
import {Breadcrumbs} from '../Breadcrumbs/Breadcrumbs';

export class DeviceWidget extends Component {
  constructor(props){
    super(props);
    this.state = {
        widgetDataProcessor : new WidgetDataProcessor(this.props.processorConfig)
    };
    this.caseString = this.caseString.bind(this);
    this.renderData = this.renderData.bind(this)
    console.log("props", props)
  } 
  
  componentDidMount() {
    this.renderData();
  }

  caseString(string, caseType) {
    console.log("STRING LOG FOR NAVEEN >>> ", string)
    let newString = new String();
    string.split("_").forEach( (word, index) =>{
        if(caseType === "camel"){
            newString += word.charAt(0).toUpperCase() + word.substring(1)
        }else if( caseType === "upper"){
            newString += word.toUpperCase();
        }else if(caseType ===  "lower"){
            newString += word.toLowerCase();
        }else if(caseType === "none"){
            newString += word
        }
        index === string.split("_").length -1 ? null : newString += " "
    });
    let temp = newString.split("%");
    newString = new String();
    temp.forEach( (word) => {
        newString += word + " "
    })
    return newString;
  }

  renderData () {
    let rawData = [];
    this.props.extensions ? (
    Object.keys(this.props.extensions).forEach(key => {
        rawData.push(
            {
            data: this.props.extensions[key],
            relationship: key
            }
        )
    })
    ) : "";
    console.log("Hey Dev, here is the device extensions tweak your processorConfig <3 ^_^ <3 ", this.props.extensions);
    console.log("Hey Dev, here is the pre-cleaned rows so you can tweak your processorConfig <3 ^_^ <3 ", rawData);
    let cleanedData = this.state.widgetDataProcessor.cleanData(rawData); // clean up the data configured by the JSON
    this.setState({
      data : cleanedData
    });
  }

  render() {
    return (
        <div style={{"marginTop" : "30px"}}>
            {
                // If the props for breadcrumbs == true, then we display the crumbs at the top
                // passed in the following props
                this.props.hasBreadCrumbs === true ? (
                    <Breadcrumbs
                        isFluid={this.props.isFluid}
                        deviceName={this.props.deviceName}
                        deviceType={this.props.deviceType}
                        breadCrumbPath={this.props.breadCrumbPath}
                        breadCrumbDeviceTypes={this.props.breadCrumbDeviceTypes}
                        breadCrumbDeviceImages={this.props.breadCrumbDeviceImages}
                        breadCrumbDeviceUrlPaths={this.props.breadCrumbDeviceUrlPaths}
                        baseUrl={this.props.baseUrl}
                    />
                ) : (
                    ""
                )
            }
        <div className={" fgReact_componentContainer fgReact_startTop " + (this.props.hasBreadCrumbs === true ? 'mt-0 ' : ' ') + (this.props.isFluid === true ? " container-fluid " : " container ")} >
            <div className="row col-12 fgReact_assetName alignLeft">
                <div className={"col-12"} style={{"textAlign" : "left"}}>
                {   
                    // Formatting the Device type string for a title
                    this.caseString(this.props.deviceType, this.props.deviceTypeTitleCasing)
                }   
                :&nbsp;
                <label className="fgReact_assetLabel">{this.props.deviceName}</label>
                </div>
            {
                this.props.mapType !== 'none' ? (
                    <div className="col-12 row">
                        <div className="col-5">
                            <div className="row info_r">
                                <ul className="col-12 alignLeft info_r_list">
                                {
                                    // Iterates over the data set and renders each as a title and label
                                    // Will not work for things that pass in objects/lists/null.
                                    this.state.data ? 
                                    this.state.data.map((row, i) => {
                                    if(typeof row.data !== 'object') {
                                        if(row.redirect) {
                                        return ( // if there is a redirect, render the row with the redirect
                                            <li key={row.key}>
                                                <a className="fgReact_assetRedirect" href={row.redirect}> <DeviceDataRow key={row.key} title={row.title} data={row.data} style={row.style} /> </a>
                                            </li>
                                        )
                                        } else {
                                        return ( // if there is no redirect, render the row on its own
                                            <li key={row.key}>
                                            <DeviceDataRow key={row.key} title={row.title} data={row.data} style={row.style} />
                                            </li>
                                        )
                                        }
                                    }
                                    }) : ""
                                }
                                </ul>
                            </div>
                        </div> 
                        
                        {   //rendering the basic map
                            this.props.mapType === "basic" || this.props.mapType === "" ? (
                            <div className={"col-7"}>
                                <BasicMapFGP 
                                    mapInteractions={this.props.mapInteractions}
                                    isBefore1910={this.props.isBefore1910}
                                    mapProjection={this.props.mapProjection}
                                    featuresParent={{
                                        deviceName: this.props.deviceName,
                                        lat: this.props.extensions["location"] ? this.props.extensions.location.lat : null ,
                                        lng: this.props.extensions["location"] ? this.props.extensions.location.lng : null
                                    }}
                                    featuresParentStyles={{
                                        label : this.caseString(this.props.deviceType, this.props.deviceTypeTitleCasing),
                                        borderColor : this.props.mapParentColors.borderColor,
                                        borderWidth : "1",
                                        fillColor : this.props.mapParentColors.fillColor,
                                    }}
                                    featuresChildren={this.props.childrenWithLocationAndStyles}
                                    
                                />
                            </div> 
                            ) : (
                            ""
                            )
                        } 
                    </div>

                ) : (
                    <div className="col-12">
                        <div className="row info_r">
                            <ul className="col-12 alignLeft info_r_list">
                            {
                                // Iterates over the data set and renders each as a title and label
                                // Will not work for things that pass in objects/lists/null.
                                this.state.data ? 
                                this.state.data.map((row, i) => {
                                if(typeof row.data !== 'object') {
                                    if(row.redirect) {
                                    return ( // if there is a redirect, render the row with the redirect
                                        <li key={row.key}>
                                            <a className="fgReact_assetRedirect" href={row.redirect}> <DeviceDataRow key={row.key} title={row.title} data={row.data} style={row.style} /> </a>
                                        </li>
                                    )
                                    } else {
                                    return ( // if there is no redirect, render the row on its own
                                        <li key={row.key}>
                                        <DeviceDataRow key={row.key} title={row.title} data={row.data} style={row.style} />
                                        </li>
                                    )
                                    }
                                }
                                }) : ""
                            }
                            </ul>
                        </div>
                    </div>  
                )

            }
            </div>
        </div>
        </div>
    )
  }
}

export default DeviceWidget
