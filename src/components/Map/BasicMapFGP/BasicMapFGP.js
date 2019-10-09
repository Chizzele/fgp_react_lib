import React, { Component } from 'react'
import { MapPopup } from '../MapPopUp/MapPopUp'
import './BasicMapFGP.css';
import Map from 'ol/Map.js';
import View from 'ol/View.js';
import 'ol/ol.css';
import GeoJSON from 'ol/format/GeoJSON.js';
import {defaults as defaultControls, OverviewMap} from 'ol/control.js';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer.js';
import {OSM, Vector as VectorSource} from 'ol/source.js';
import {Circle as CircleStyle, Fill, Stroke, Style} from 'ol/style.js';


/* 
Basic Map - The basic map functionality is present here, that includes a popover on hover and support for 
            a children device set and a single parent device

Properties to pass through to this Component (it will handle everything else)
- featuresChildrenStyles =  an object specifies the styling of the children dots, an example of this is ...
  featuresChildrenStyles : {
                            label : "ICP",
                            borderColor : "red",
                            borderWidth: "1",
                            fillColor : "pink"
                          }

- featuresChildren: should be an array of objects of the child devices, an example of this is ...
  featuresChildren[0]:  {
                          deviceName: "0012650932WE139",
                          lat: -37.801555,
                          lng: 174.883438,
                        }

- featuresParentStyles: an object specifies the styling of the parent dot, an example of this is ...
  featuresParentStyles :  {
                            label : "Transformer",
                            borderColor : "blue",
                            borderWidth : "1",
                            fillColor : "lightblue"
                          }

 - featuresParent: this is an object, singular, an example of this object is the following
   -featuresParent: {
                      deviceName: "E00025675COMP",
                      lat: -37.8028377815772,
                      lng: 174.880836345938,
                    }
*/

export class BasicMapFGP extends Component {
    constructor(props){
        super(props);
        this.state = {
            popupVisible:false,
            focusedFeature: null,
            focusedGroup: null,
            hasChildren : this.props.featuresChildren ? true : false,
            id: Math.random().toString(36).substr(2, 11)
        };
        // this.buildMap = this.buildMap.bind(this)
    }
    
    buildMap(){
      var hasChildrenIn = this.state.hasChildren
      function styleZoomer(type, radius, index){
        if(type === "parent"){
          return new CircleStyle({
            radius: radius,
            fill: new Fill({color: this.props.featuresParentStyles.fillColor}),
            stroke: new Stroke({color: this.props.featuresParentStyles.borderColor, width: 1})
          })
        }else if(type === "child"){
          return new CircleStyle({
            radius: radius,
            fill: new Fill({color: this.props.featuresChildren[index].style.fillColor}),
            stroke: new Stroke({color: this.props.featuresChildren[index].style.borderColor, width: 1})
          })
        }
      }
      styleZoomer = styleZoomer.bind(this); // binding the state

      // parent style - blue inner, dark blue outer
      var imageParent = styleZoomer("parent", 4)
      var stylesParent = {
        'Point': new Style({
          image: imageParent
        })
      };
      
      var styleFunctionParent = function(feature) {
        return stylesParent[feature.getGeometry().getType()];
      };      

      // intitializing the geojson
      let points = [];


      // setting the style, labels and location for the children which are passed through props
      if(hasChildrenIn === true){
        console.log("have children", this.props.featuresChildren)
        var vectorLayerChildrenArr=[];
        var geojsonObjectChildren = {
          'type': 'FeatureCollection',
          'features': [ ]
        };  

        //iterating through the types of children
        for(var x = 0; x < this.props.featuresChildren.length; x++ ){
          // creating styles of the children
          var image = styleZoomer("child", 4, x)
          var styles = {
            'Point': new Style({
              image: image
            })
          };
          var styleFunctionChildren = function(feature) {
            return styles[feature.getGeometry().getType()];
          };
          this.props.featuresChildren[x].children.forEach( child =>{
            // console.log(child)
            let featureObj = {
              'type' : "Feature",
              'id': '_' + Math.random().toString(36).substr(2, 11),
              'geometry': {
                'type': "Point",
                'crs': {
                  'type': 'name',
                  'properties': {
                    'name': this.props.mapProjection
                  }
                },
                'coordinates': [
                  child.lng,
                  child.lat
                ]
              },
              "geometry_name": "geom",
              "properties": {
                "lat":  child.lat,
                "lng": child.lng,
                "type": this.props.featuresChildren[x].deviceType,
                "id": '_' + Math.random().toString(36).substr(2, 11),
                "name": child.name,
              }
            }
            if(isNaN(child.lat) === false && isNaN(child.lng) === false &&
                 child.lat !== 0 && child.lng !== 0){
                  points.push([child.lng, child.lat])
                  geojsonObjectChildren.features.push(featureObj)
            }
          })
          var vectorSourceChildren = new VectorSource({
            features: (new GeoJSON()).readFeatures(geojsonObjectChildren)
          });
          var vectorLayerChildren = new VectorLayer({
            source: vectorSourceChildren,
            style: styleFunctionChildren
          });
          vectorLayerChildrenArr.push(vectorLayerChildren)
        }
      }
      
      var geojsonObjectParent = {
        'type': 'FeatureCollection',
        'features': [ ]
      };

      // setting the style, labels and location for the parent
      let featureObjParent = {
        'type' : "Feature",
        'id': '_' + Math.random().toString(36).substr(2, 11),
        'geometry': {
          'type': "Point",
          'crs': {
            'type': 'name',
            'properties': {
              'name': this.props.mapProjection
            }
          },
          'coordinates': [
            this.props.featuresParent.lng,
            this.props.featuresParent.lat
          ]
        },
        "geometry_name": "geom",
        "properties": {
          "lat":  this.props.featuresParent.lat,
          "lng": this.props.featuresParent.lng,
          "type": this.props.featuresParentStyles.label,
          "id": '_' + Math.random().toString(36).substr(2, 11),
          "name": this.props.featuresParent.deviceName,
        }
      }
      if(isNaN(this.props.featuresParent.lng) === false && isNaN(this.props.featuresParent.lat === false) &&
         this.props.featuresParent.lng !== 0 && this.props.featuresParent.lat !== 0){
           points.push([this.props.featuresParent.lng, this.props.featuresParent.lat])
           geojsonObjectParent.features.push(featureObjParent)
      }
      // creates a vector source


      var vectorSourceParent = new VectorSource({
        features: (new GeoJSON()).readFeatures(geojsonObjectParent)
      });

      var vectorLayerParent = new VectorLayer({
        source: vectorSourceParent,
        style: styleFunctionParent
      });
      
      var getCentroid = function (coord) {
        var center = coord.reduce(function (x, y) {
            return [x[0] + y[0] / coord.length, x[1] + y[1] / coord.length]
        }, [0, 0])
        return center;
      }
      // get center
      var layerCenter = getCentroid(points);
      if(hasChildrenIn === true){
        // var totalLayers = [...vectorLayerChildrenArr];
        // totalLayers.push()
        // totalLayers.push(vectorLayerParent)
          var map = new Map({
            controls: defaultControls().extend([
              new OverviewMap()
            ]),
            layers: [new TileLayer({source: new OSM()})],
            target: this.state.id,
            view: new View({
              center: layerCenter,
              zoom: 16,
              projection: this.props.mapProjection
            })
          });
      }else{
        var map = new Map({
          controls: defaultControls().extend([
            new OverviewMap()
          ]),
          layers: [
            new TileLayer({
              source: new OSM()
            }),
            vectorLayerParent
          ],
          target: this.state.id,
          view: new View({
            center: layerCenter,
            zoom: 16,
            projection: this.props.mapProjection
          })
        });
      }
      vectorLayerChildrenArr.forEach( layer => {
        map.addLayer(layer)
      })
      map.addLayer(vectorLayerParent)
      
      if(hasChildrenIn === true){
          this.setState({
            map:map,
            featuresLayerChildren:vectorLayerChildrenArr,
            featuresLayerParent:vectorLayerParent
          })
      }else{
        this.setState({
          map:map,
          featuresLayerParent:vectorLayerParent
        })
      }

      // map.add
      // binding the hover event (popup dialogue)
      map.on('pointermove', this.handleMapHover.bind(this));     
      // changing the size of the features on the map with zoom level 
      map.getView().on('change:resolution', function(evt) {
        var currZoomLevel = map.getView().getZoom();
        var radius
        if(currZoomLevel>18){
          radius = 6;
        }else if(currZoomLevel>15){
          radius = 4;
        }else if(currZoomLevel>13){
          radius = 2;
        }else if(currZoomLevel>10){
          radius = 2;
        }else{
          radius = 1;
        }
        var stylesParent = new Style({image: styleZoomer("parent", radius)});
        vectorLayerParent.setStyle(stylesParent);

        // var parentScaleStyle = imageParent

        if(hasChildrenIn === true){
          for(var x = 0; x < vectorLayerChildrenArr.length; x ++){
            var stylesChild = new Style({image: styleZoomer("child", radius, x)});
            vectorLayerChildrenArr[x].setStyle(stylesChild)
          }
        }
      });     
      map.updateSize() 
    }

    componentDidMount(){
      this.buildMap()
      
    }

    // different on click handlers
    showDeviceExtensionPopUp(deviceId, type){
      // gets an extension for the device and creates an overlay
    }

    goto(deviceId, type){
      // redirects to the asset page of device type
    }

    createGroup(){
      // creates a group of assets with a drawing shape
      
    }


    handleMapClick(event){
      this.state.map.updateSize()
      let feature = this.state.map.forEachFeatureAtPixel(event.pixel, feature => {    
        return feature
      });     
      if(feature){
        this.setState({
          focusedFeature: feature.values_,
          popupVisible: true
        })
      }else{
        this.setState({
          focusedFeature: null,
          popupVisible: false
        })
      }
    }

    handleMapHover(event){
      let featureArr = [];
      this.state.map.forEachFeatureAtPixel(event.pixel, feature => {    
        featureArr.push(feature.values_);
      });     
      if(featureArr.length > 0){
        this.setState({
          focusedFeatures: featureArr,
          popupVisible: true
        })
      }else{
        this.setState({
          focusedFeature: null,
          popupVisible: false
        })
      }
    }

    render() {
        

        return (
          <div className={"w-100 map fgpReactMap"} id={this.state.id}>
            <MapPopup
              visibility={this.state.popupVisible}
              focusedFeatures={this.state.focusedFeatures}
            />
          </div>
        )
    }
}

export default BasicMapFGP

