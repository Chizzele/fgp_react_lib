import React, { Component } from 'react';
import './fgpReact-Page.css';
import axios from "axios";
import {Navigation} from '../Navigation/Navigation'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// a simple container
export class DevicePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      deviceName : window.location.href.split('/')[window.location.href.split('/').length-1],
      deviceType : this.props.deviceType,
      mapType: this.props.mapType ? this.props.mapType : "none",
      hasBreadCrumbs: this.props.hasBreadCrumbs ? this.props.hasBreadCrumbs : false,
      baseUrl: this.props.baseUrl,
      deviceTypeTitleCasing : this.props.deviceTypeTitleCasing ? this.props.deviceTypeTitleCasing : "none",

      relationParentNames: this.props.relationParentNames ? this.props.relationParentNames : [],
      relationChildNames: this.props.relationChildNames ? this.props.relationChildNames : [],
      relations: {parents:[], children:[]},
      hasDeviceRelationsLoaded : false,

      extensionNames : this.props.extensionNames,
      extensions: null,
      hasDeviceExtensionLoaded : false,

      fauxNavItems : this.props.isLoadingNavItems ? 
        this.props.isLoadingNavItems :
        [
          {      
            key:"home01",
            linkTo:"/",
            fontAwesomeIcon:"home",
            fontAwesomeLib:"fa",
            description: "Home"
          }
        ] ,
      fauxNavLogo : this.props.isLoadingNavLogo,
      fauxNavTitle : this.props.isLoadingNavTitle,
      hasAllLoaded: false
    };
    this.fetchExtensions = this.fetchExtensions.bind(this);
    this.fetchRelations = this.fetchRelations.bind(this);
    this.allResolved = this.allResolved.bind(this);
  }

  componentDidMount(){
    this.fetchExtensions()
    this.fetchRelations();
  }

  componentDidUpdate(){
    // this.allResolved();  
  }

  allResolved(){
    if(this.state.hasDeviceExtensionLoaded === true){
      this.setState({
        hasAllLoaded : true
      });
    }
  }

  fetchExtensions(){
    axios.post(`${this.state.baseUrl}${this.state.deviceType}/name/${this.state.deviceName}`,{
      "extensions" : this.state.extensionNames
    }).then( response => {
      this.setState({
        extensions: response.data,
        hasDeviceExtensionLoaded: true
      })
    }).catch( err => {
      console.log("Here is your error, Dev -_-`", err)
    }) 
  }


  fetchRelations(){
    let relationObj = {...this.state.relations};
    this.state.relationParentNames.forEach( relation =>{
      axios.get(`${this.state.baseUrl}${this.state.deviceType}/${this.state.deviceName}/relation/${relation}?isParent=true`    
      ).then( response => {
        response.data["relationName"] = relation
        relationObj.parents.push(response.data);
      }).catch(err => {
        console.log("Here is your error, Dev -_-`", err)
      })
    });
    this.state.relationChildNames.forEach( relation =>{
      axios.get(`${this.state.baseUrl}${this.state.deviceType}/${this.state.deviceName}/relation/${relation}`    
      ).then( response => {
        response.data["relationName"] = relation
        relationObj.children.push(response.data);
      }).catch(err => {
        console.log("Here is your error, Dev -_-`", err)
      })
    });
    
    this.setState({
      relations : relationObj,
      hasDeviceRelationsLoaded : true
    })
  }

  render() {
    const childrenWithProps = React.Children.map(this.props.children, child =>{
      if(child.props["dataLink"] === true){
        return( React.cloneElement(child, {
          isDataLinked: true,
          deviceName: this.state.deviceName,
          deviceType:  this.state.deviceType,
          mapType:  this.state.mapType,
          deviceTypeTitleCasing : this.state.deviceTypeTitleCasing,
          hasBreadCrumbs: this.state.hasBreadCrumbs,
          baseUrl:  this.state.baseUrl,
          relationParentNames:  this.state.relationParentNames,
          relationChildNames:  this.state.relationChildNames,
          relations:  this.state.relations,
          extensionNames:  this.state.extensionNames,
          extensions:  this.state.extensions,
        }))
      }else{
        return child
      }
    })
    return (
      <div className="fgReact_home">      
        { 
          this.state.hasDeviceExtensionLoaded === true && 
          this.state.hasDeviceRelationsLoaded === true ? (
            <div className="col-12">
              {childrenWithProps}
            </div>            
          ) : 
            <div>
              <Navigation 
                topNavTitle={this.state.fauxNavTitle}
                sideNavLogo={this.state.fauxNavLogo}
                currentPage={""}
                isOpen={false}
                items={this.state.fauxNavItems}
              />
              <FontAwesomeIcon className="centerSpinner fa-spin" icon={["fas", "spinner"]}/>
            </div>
        }
      </div>
    )
  }
}

export default DevicePage
