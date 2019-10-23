import React, { Component } from 'react';
import './ResultTable.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { NavLink} from 'react-router-dom' ;
import Moment from 'react-moment';
import moment from 'moment';
// import axios from "axios";

export class ResultTable extends Component {
  constructor(props){
    super(props);
    this.state = {

    };  
    // console.log(this.props)
    this.buildData = this.buildData.bind(this);
    this.buildColumns = this.buildColumns.bind(this);

    this.mutationHandler = this.mutationHandler.bind(this);
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
          //format to lll  
          }else{
            processedRow.value = moment(row.value).format("lll")
          }
        }else if(element.fgpMutate === "round"){  
          if(element["fgpMutateConfig"]){
            processedRow.value = Math.round((row.value * Math.pow(10, element.fgpMutateConfig))) / Math.pow(10, element.fgpMutateConfig);
          }else{
            processedRow.value = Math.round(row.value);
          }
        }
      }


      // final step is redirection
      if(element["fgpRedirect"]){
        var link = row.value;
        // if we want to mutate the redirect link (don't want to mutate the data that gets displayed)
        if(element["fgpRedirectMutate"]){
          if(element["fgpRedirectMutateIndex"]){
            if(this.props.openInNewPage === true){
              return(
              <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[element.fgpRedirectMutateIndex]}`}>
                {processedRow.value}
              </a>  
              )
            }else{
              return(
              <NavLink to={`${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[element.fgpRedirectMutateIndex]}`}>
                {processedRow.value}
              </NavLink>
              )
            }
          }else{
            if(this.props.openInNewPage === true){
              return(
              <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[0]}`}>
                {processedRow.value}
              </a>                
              )
            }else{
              return(
              <NavLink to={`${element.fgpRedirect}${link.split(element.fgpRedirectMutate)[0]}`}>
                {processedRow.value}
              </NavLink>
              )
            }
          }
        }else{
          // if the prop is set, open in new tab
          if(this.props.openInNewPage === true){
            return (
              <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${link}`}>
                {processedRow.value}
              </a>  
            )
          }else{
            return (
              <NavLink to={`${element.fgpRedirect}${link}`}>
                {processedRow.value}
              </NavLink>
            )  
          }
        }
      }else{
        return(<div> {processedRow.value} </div>)  
      }
    }else{
      return(<div> {processedRow.value} </div>)
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
  
  
  render() {
    const filterCaseInsensitive = ({ id, value }, row) => 
      row[id] ? row[id].toLowerCase().includes(value.toLowerCase()) : true
    

    console.log("default sizw", this.props.defaultPageSize)
    return (
      <div className="ResultTable">
        <span className="ResultTable-title">{this.props.title}</span>
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
            // onPageChange={(pageIndex) => {
            //   console.log("pageindex = ",pageIndex)
            // }}
            // onPageSizeChange={(pageSize,pageIndex) => {
            //   console.log("pagesize = ", pageIndex, "pageindex = ", pageSize, state)
            // }}
        />
      </div>
  )}
}

export default ResultTable
