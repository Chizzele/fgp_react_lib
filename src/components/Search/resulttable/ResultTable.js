import React, { Component } from 'react';
import './ResultTable.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { NavLink} from 'react-router-dom' ;
import Moment from 'react-moment';
// import axios from "axios";

export class ResultTable extends Component {
  constructor(props){
    super(props);
    this.state = {

    };  
    // console.log(this.props)
    this.buildData = this.buildData.bind(this);
    this.buildColumns = this.buildColumns.bind(this);
  }

  buildData(data){
    data.forEach(element => {
      // element["Cell"] = "hello world"
    });
    return data;
  }




  buildColumns(data){
    // console.log(data)
    if(this.props.ignoreBuildCols){

    }else{
      data.forEach(element => {
        if(element["fgpRedirect"]){
          if(element["fgpMutateRedirect"]){
            element["Cell"] = row => (
              this.props.openInNewPage === true ? (
                <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${row.value.split(element.fgpMutateRedirect)[0]}`}>
                  { element["fgpValueMutate"] ? row.value.split(element.fgpValueMutate)[0] : row.value}
                </a>
              ) : (
                <NavLink to={`${element.fgpRedirect}${row.value.split(element.fgpMutateRedirect)[0]}`}>
                   { element["fgpValueMutate"] ? row.value.split(element.fgpValueMutate)[0] : row.value}
                </NavLink>
              )
          )
          }else{
            element["Cell"] = row => (
                this.props.openInNewPage === true ? (
                  <a target={"_blank"} href={`${window.location.origin}${element.fgpRedirect}${row.value}`}>
                    { element["fgpValueMutate"] ? row.value.split(element.fgpValueMutate)[0] : row.value}
                  </a>
                ) : (
                  <NavLink to={element.fgpRedirect + row.value}>
                     { element["fgpValueMutate"] ? row.value.split(element.fgpValueMutate)[0] : row.value}
                  </NavLink>
                )
            )
          }
        }else if(element["fgpMutate"]){
          if(element.fgpMutate === "date"){
            if(element["fgpMutateConfig"]){
              element["Cell"] = row => (
                <Moment date={row.value} format={element.fgpMutateConfig}>
                </Moment>
              )
            }else{
              element["Cell"] = row => (
                <Moment date={row.value} format={"lll"}>
                </Moment>
              )
            }
          }else if(element.fgpMutate === "round"){
            if(element["fgpMutateConfig"]){
              element["Cell"] = row => (
                <span>
                  {Math.round((row.value * Math.pow(10, element.fgpMutateConfig))) / Math.pow(10, element.fgpMutateConfig)}
                </span>
              )
            }else{
              element["Cell"] = row => (
                <span>
                  {Math.round(row.value)}
                </span>
              )
            }
          }
        }else{
          element["Cell"] = row => (
            <span>
              { element["fgpValueMutate"] ? row.value.split(element.fgpValueMutate)[0] : row.value}
            </span>
          )
        }
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
