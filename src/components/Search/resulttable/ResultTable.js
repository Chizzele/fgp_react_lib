import React, { Component } from 'react';
import './ResultTable.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { NavLink} from 'react-router-dom' ;
import Moment from 'react-moment';
import moment from 'moment';
import { BasicMapFGP } from '../../Map/BasicMapFGP/BasicMapFGP'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import axios from "axios";

export class ResultTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      mapVisible : false
    };  
    // console.log(this.props)
    this.buildData = this.buildData.bind(this);
    this.buildColumns = this.buildColumns.bind(this);

    this.mutationHandler = this.mutationHandler.bind(this);
    this.toggleMap = this.toggleMap.bind(this);
  }

  buildData(data){
    data.forEach(element => {
      // element["Cell"] = "hello world"
    });
    return data;
  }

  // mutates each row of data to present how we want it, returns a row after processing
  mutationHandler(element, row){
    let processedRow = {...row};
    // mutating the value
    // ensuring we have a split-able value 
    // !null === true
    // !"" === true
    // !undefined === true
    if(!row.value === false){
      // value mutation
      if(element["fgpValueMutate"]){
        if(element["fgpValueMutateIndex"]){
          processedRow.value = row.value.split(element.fgpValueMutate)[element.fgpValueMutateIndex];
        }else{
          processedRow.value = row.value.split(element.fgpValueMutate)[0];
        }
      }
      
      // formatting mutations
      if(element["fgpMutate"]){
        if(element.fgpMutate === "date"){
          if(element["fgpMutateConfig"]){
            processedRow.value = moment(row.value).format(element.fgpMutateConfig)
          
          }else{
            processedRow.value = moment(row.value).format("lll")
          }
        }else if(element.fgpMutate === "round"){  
          if(element["fgpMutateConfig"]){
            processedRow.value = Math.round((row.value * Math.pow(10, element.fgpMutateConfig))) / Math.pow(10, element.fgpMutateConfig);
            if(element["fgpAdditionalSymbol"]){
              processedRow.value = `${processedRow.value * 100}${element.fgpAdditionalSymbol}`
            }
          }else{
            processedRow.value = Math.round(row.value);
            if(element["fgpAdditionalSymbol"]){
              processedRow.value = `${(processedRow.value * 100)}${element.fgpAdditionalSymbol}`
            }
          }
        }
      }


      // final step is redirection
      if(element["fgpRedirect"]){
        // check if the row itself is allowed to redirect based on rules
        if(element["fgpLimitRedirectAccessor"]){
          // checks if the column specified is not empty, if it is, do not render a link redirect.
          if(element.fgpLimitRedirectCriteria === "notEmpty"){
            if(row.original[element.fgpLimitRedirectAccessor]){
              var link = row.value;
              // if we want to mutate the redirect link (don't want to mutate the data that gets displayed)
              if(element["fgpRedirectMutate"]){
                if(element["fgpRedirectMutateIndex"]){
                  if(this.props.openInNewPage === true){
                    return(
                    <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[element.fgpRedirectMutateIndex]}`}>
                       {String(processedRow.value)}
                    </a>  
                    )
                  }else{
                    return(
                    <NavLink to={`${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[element.fgpRedirectMutateIndex]}`}>
                       {String(processedRow.value)}
                    </NavLink>
                    )
                  }
                }else{
                  if(this.props.openInNewPage === true){
                    return(
                    <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[0]}`}>
                       {String(processedRow.value)}
                    </a>                
                    )
                  }else{
                    return(
                    <NavLink to={`${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[0]}`}>
                       {String(processedRow.value)}
                    </NavLink>
                    )
                  }
                }
              }else{
                // if the prop is set, open in new tab
                if(this.props.openInNewPage === true){
                  return (
                    <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${link}`}>
                       {String(processedRow.value)}
                    </a>  
                  )
                }else{
                  return (
                    <NavLink to={`${element.fgpRedirect}${link}`}>
                       {String(processedRow.value)}
                    </NavLink>
                  )  
                }
              }
            }else{
              return (<div>  {String(processedRow.value)} </div>)  
            }
          }
        }else{
          var link = row.value;
          // if we want to mutate the redirect link (don't want to mutate the data that gets displayed)
          if(element["fgpRedirectMutate"]){
            if(element["fgpRedirectMutateIndex"]){
              if(this.props.openInNewPage === true){
                return(
                <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[element.fgpRedirectMutateIndex]}`}>
                  {String(processedRow.value)}
                </a>  
                )
              }else{
                return(
                <NavLink to={`${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[element.fgpRedirectMutateIndex]}`}>
                  {String(processedRow.value)}
                </NavLink>
                )
              }
            }else{
              if(this.props.openInNewPage === true){
                return(
                <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[0]}`}>
                  {String(processedRow.value)}
                </a>                
                )
              }else{
                return(
                <NavLink to={`${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[0]}`}>
                  {String(processedRow.value)}
                </NavLink>
                )
              }
            }
          }else{
            // if the prop is set, open in new tab
            if(this.props.openInNewPage === true){
              return (
                <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${link}`}>
                  {String(processedRow.value)}
                </a>  
              )
            }else{
              return (
                <NavLink to={`${element.fgpRedirect}${link}`}>
                  {String(processedRow.value)}
                </NavLink>
              )  
            }
          }
        }
      // redirect the whole row (the fgpRedirectRow variable will consist of a string like this, you should know the properties from your config of the search)
      // example of a fgpRedirectRow config is 
      // fgpRedirectRow : "/icp/"
      // fgpRedirectRowPath : "accessor1->accessor2->accessor3"
      }else if(element["fgpRedirectRow"]){
        let path = new String;
        let accessorArr = element.fgpRedirectRowPath.split("->");
        accessorArr.forEach( accessor => {
          path += "/" +  row.original[accessor]
        });
        if(this.props.openInNewPage === true){
          return (
            <a target={"_blank"} href={`${window.location.origin}/${element.fgpRedirectRow}${path}`}>
              {String(processedRow.value)}
            </a>  
          )
        }else{
          return (
            <NavLink to={`${element.fgpRedirectRow}${path}`}>
              {String(processedRow.value)}
            </NavLink>
          )  
        }
      }else{
        return(<div> {String(processedRow.value)} </div>)  
      }
    }else{
      return(<div> {String("")} </div>)
    }
  }


  buildColumns(data){
    // console.log(data)
    if(this.props.ignoreBuildCols){
    }else{
      data.forEach(element => {
        element["Cell"] = row => (
          this.mutationHandler(element, row)
        )
      });  
    }
    return data;
  }

  HandlePagination(){
      
  }
  
  toggleMap(){
    this.setState({
      mapVisible : !this.state.mapVisible
    })
    console.log('toggled', this.state.mapVisible)
  }
  
  render() {
    const filterCaseInsensitive = ({ id, value }, row) => 
      row[id] ? row[id].toLowerCase() .includes(value.toLowerCase()) : true

    return (
      <div className="ResultTable">
        {/* <span className="ResultTable-title">{this.props.title}</span> */}
        {this.props.hasResultMap === true ? (
          <div style={{"width": "100%"}}> 
            <button className="btn btn-secondary" style={{"margin":"0 auto", "position" : "relative", "bottom" : "17.5px", "width" : "fit-content"}} onClick={this.toggleMap}>
              <FontAwesomeIcon className="" icon={["fas", "map"]}/>
            </button>
          </div> 
        ) : (
          ""
        )
        }
        {
          this.state.mapVisible === true ? (
            <div className={"fgpPopoverGraph"}>
              <BasicMapFGP 

              />
            </div>
          ) : ""
        }
        <ReactTable 
            showPagination={this.props.showPagination}
            showPageSizeOptions={this.props.showPageSizeOptions}
            showPageJump={this.props.showPageJump}
            filterable={this.props.filterable}
            data={this.buildData(this.props.data)}
            columns={this.buildColumns(this.props.columns)}
            minRows={this.props.defaultRowSize}
            defaultPageSize={this.props.defaultPageSize ? this.props.defaultPageSize : 25}
            pageSizeOptions={this.props.defaultRowSizeArray}
            defaultFilterMethod={filterCaseInsensitive}
            onPageChange={(pageSize,pageIndex) => {
              console.log("pagesize = ", pageIndex, "pageindex = ", pageSize)
              this.props.dynamicResultFunctionPage(pageIndex)
            }}
            onPageSizeChange={(pageSize,pageIndex) => {
              console.log("pagesize = ", pageIndex, "pageindex = ", pageSize)
              this.props.dynamicResultFunction(pageSize,pageIndex)
            }}
        />
      </div>
  )}
}

export default ResultTable
