import React, { Component } from 'react';
import './FilterSearchRow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {DatePickerWrapper} from '../DatePickerWrapper/DatePickerWrapper';
export class FilterSearchRow extends Component {
  constructor(props){
    super(props);
    this.state = {
   
    };
    // this.updateKeyword = this.updateKeyword.bind(this);
    // console.log("my state:" , this.state)
  }

  render() {
    return (
      <div className="col-12 fgReact_searchrow d-inline-flex align-items-center">
        <div className={"col-md-3 col-12 fgReact_searchInputContainer d-md-inline-flex align-items-center"}>
          <select className="form-control" value={this.props.searchingColumn} onChange={this.props.updateSearchingColumn}>>
            {
              this.props.searchingTables.map((option, i) => {
                return (
                  <option key={i}  isTs={option.isTs} value={option.tableName}>{option.dropdownLabel}</option>
                )
              })
            }
          </select>
        </div>
        <div className={"col-md-3 col-12 d-md-inline-flex align-items-center fgReact_searchInputContainer"}>
          <DatePickerWrapper
            date={this.props.fromDate}
            // onChange={date => setStartDate(date)}
            // peekNextMonth
            // showMonthDropdown
            // showYearDropdown
            dropdownMode="select"
          />
        </div>
        <div className={"col-md-3 col-12 d-md-inline-flex align-items-center fgReact_searchInputContainer "}>
          <input className="form-control" placeholder="Keyword..." value={this.props.searchingKeyword} onChange={this.props.updateKeyword}>
          </input>
        </div>

         { 
           this.props.isFirst === true ? (
              <div className="d-inline-flex align-items-center col-1 "> 
                <div className="fgReact_plusButtonOuter d-md-inline-flex align-items-center" onClick={this.props.addSearchCriteria}>
                  <FontAwesomeIcon className="fgReact_plusButton" icon={["fas", "plus"]}/>
                </div> 
              </div>
            ) 
            : (
              <div className="d-inline-flex align-items-center col-1 "> 
                <div className="fgReact_minusButtonOuter d-md-inline-flex align-items-center" onClick={() => this.props.removeSearchCriteria(this.props.indexKey)}>
                  <FontAwesomeIcon className="fgReact_minusButton" icon={["fas", "minus"]}/>
                </div>
              </div> 
            )
          }
         { 
           this.props.isFirst === true ? (
              <div className="d-inline-flex align-items-center col-1 "> 
                <div className="fgReact_searchButtonOuter d-md-inline-flex align-items-center" onClick={this.props.makeSearch}>
                 <FontAwesomeIcon className="fgReact_searchButton" icon={["fas", "search"]}/>
                </div>
              </div> 
            ) 
            : (
              ""
            )
          }

      </div>
    )
  }
}

export default FilterSearchRow