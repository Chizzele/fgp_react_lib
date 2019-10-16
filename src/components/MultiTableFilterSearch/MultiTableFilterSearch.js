import React, { Component } from 'react';
import './MultiTableFilterSearch.css';
import axios from "axios";
import ResultTable from '../Search/resulttable/ResultTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {FilterSearchRow } from './FilterSearchRow/FilterSearchRow';
import moment from 'moment';

export class MultiTableFilterSearch extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasLoaded : false,
      data : [],
      fromDate: moment().subtract(7, 'd').valueOf(),
      toDate: moment().valueOf(),
    };
    // console.log(this.props)
    this.makeSearch = this.makeSearch.bind(this);
  }

  componentDidMount(){

  }

  makeSearch(isFirstTime) {
    // if(isFirstTime === true){
    //   axios.get(this.props.baseApiUrl + this.props.searchConfig.reference + '/data/' +
    //   this.props.searchConfig.defaultQtyRecordsToRetrieve + "/" + 
    //   this.props.searchConfig.startFrom + "/" +
    //   this.props.searchConfig.customer +
    //   this.props.searchConfig.searchDirection
    //                   )
    //                     .then(res => {
    //                       // console.log(res)
    //                       this.setState({
    //                         data: res.data
    //                       })
    //                       this.setState({
    //                         hasLoaded: true
    //                       })
    //                     }).catch(function (error) {
    //                       console.log(error);
    //                     })
    // }else{

    //   this.setState({
    //     hasLoaded: false
    //   })
    //   let query_rsql = [];
  
    //   this.state.searchRows.forEach(_c => {
    //       if (_c.searchingColumn !== "all") {                
    //         // check
    //         if (_c.searchingKeyword.indexOf("'") !== -1 || _c.searchingKeyword.indexOf("\"") !== -1) {
    //           //escape single and double quotes
    //           var _tempSearch = _c.searchingKeyword.replace("\"", "\\\"");
    //           _tempSearch = "\"" + _tempSearch + "\"";
    //           query_rsql.push(_c.searchingColumn + _c.searchingType.replace("?", _tempSearch) + "");
    //         }else{
    //           query_rsql.push(_c.searchingColumn + _c.searchingType.replace("?", _c.searchingKeyword) + "");
    //         }
    //       } else if(_c.searchingColumn === "all"){
    //         // put all column names here
    //         _tempRSQL = "(";
    //         this.props.SearchConfig.searchingColumns.forEach(function(_column, _index){
    //           if(_column.column !== "all"){
    //             if(_index <  this.props.SearchConfig.searchingColumns.length - 1){
    //               _tempRSQL += _column.column + "" + _c.searchingType.replace("?", newSearch) + ",";
    //             }else{
    //               _tempRSQL += _column.column + "" + _c.searchingType.replace("?", newSearch);
    //             }
    //           }
    //         });
    //         _tempRSQL += ")";
    //         query_rsql.push(_tempRSQL);   
    //       }    
    //   });
     
    //   let url =  this.props.baseApiUrl + this.props.searchConfig.reference + '/data/' +
    //   this.props.searchConfig.defaultQtyRecordsToRetrieve + "/" + 
    //   this.props.searchConfig.startFrom + "/" +
    //   this.props.searchConfig.customer +
    //   this.props.searchConfig.searchDirection
  
    //   if (query_rsql && query_rsql.length > 0) {
    //     url = url + "?" + query_rsql.join(";");
    //   }
    //   // console.log(url)
    //   axios.get(url)
    //     .then(res => {
    //       this.setState({
    //         data: res.data
    //       })
    //       this.setState({
    //         hasLoaded: true
    //       })
    //     }).catch(function (error) {
    //       console.error(error)
    //     });     
    // }
  }

  updateSearchingTable(key, rowKey, value) {
    // let resultRow = this.state.searchRows.findIndex(p => p.indexKey === rowKey);
    // let temp = [...this.state.searchRows];
    // temp[resultRow][key] = value.target.value
    // this.setState({searchRows: temp})
  }

  updateStartDate(key, rowKey, value) {
    // let resultRow = this.state.searchRows.findIndex(p => p.indexKey === rowKey);
    // let temp = [...this.state.searchRows];
    // temp[resultRow][key] = value.target.value
    // this.setState({searchRows: temp})
  }

  updateEndDate(key, rowKey, value) {
    // let resultRow = this.state.searchRows.findIndex(p => p.indexKey === rowKey);
    // let temp = [...this.state.searchRows];
    // temp[resultRow][key] = value.target.value
    // this.setState({searchRows: temp})
  }


  render() {
    return (
      <div className="fgReact_workingArea">
        <div className={"fgReact_SearchPageTitle " + (this.props.isFluid === true ? " container-fluid " : " container ")}>{this.props.title}</div>
          {
            this.props.hideFilter === true ?            
            "" :
            <div className={"fgReact_componentContainer " + (this.props.isFluid === true ? " container-fluid " : " container ")}>
            <div className="col-12">
              <div>
                {   
                  //  this.state.searchRows.map((row, i) => {
                    // return (     
                      <FilterSearchRow 
                        isFluid={this.props.isFluid}
                        searchingTables={this.props.searchingTables}
                        fromDate={this.state.fromDate}
                        toDate={this.state.toDate}
                        // key={row.indexKey} 
                        // indexKey={row.indexKey} 
                        // addSearchCriteria={this.addSearchCriteria}
                        // removeSearchCriteria={this.removeSearchCriteria}           
                        searchingKeyword = {"blah"}      
                        searchingType = {"blah"}      
                        searchingColumn = {"blah"}      
                        // updateKeyword={this.updateKeyword.bind(this , 'searchingKeyword', row.indexKey )}                  
                        // updateSearchingType={this.updateSearchingType.bind(this , 'searchingType', row.indexKey )}                  
                        // updateSearchingColumn={this.updateSearchingColumn.bind(this , 'searchingColumn', row.indexKey )}                  
                        makeSearch={this.makeSearch}
                        // searchingTypes={this.props.searchConfig.searchingTypes} 
                        // searchingColumns={this.props.searchConfig.searchingColumns} 
                        isFirst={true}
                      />
                  // })
                }
              </div>
            </div>
          </div>
          }

        <div className={"fgReact_componentContainer " + (this.props.isFluid === true ? " container-fluid " : " container ")}>
          { 
            this.state.hasLoaded ? (
            <ResultTable
              data={this.state.data}
              columns={this.props.searchConfig.columns}
              filterable={this.props.filterableResults}
              redirectTo={this.props.redirectTo}
              openInNewPage={this.props.openInNewPage}
            />
            ) : 
            <FontAwesomeIcon className="centerSpinner fa-spin" icon={["fas", "spinner"]}/>
          }
        </div>
      </div>
    )
  }
}

export default MultiTableFilterSearch
