import React, { Component } from 'react';
import './SearchRow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class SearchRow extends Component {
  constructor(props){
    super(props);
    this.state = {
   
    };
    // this.updateKeyword = this.updateKeyword.bind(this);
    // console.log("my state:" , this.state)
  }

  render() {
    return (
      <div className="col-12 row fgReact_searchrow d-inline-flex align-items-center">
        <div className={"col-md-3 col-12 fgReact_searchInputContainer d-md-inline-flex align-items-center"}>
          <select className="form-control" value={this.props.searchingColumn} onChange={this.props.updateSearchingColumn}>>
            {
              this.props.searchingColumns.map((option, i) => {
                return (
                  <option key={i} value={option.column}>{option.label}</option>
                )
              })
            }
          </select>
        </div>
        <div className={"col-md-3 col-12 d-md-inline-flex align-items-center fgReact_searchInputContainer"}>
          <select className="form-control " value={this.props.searchingType} onChange={this.props.updateSearchingType}>
            {
              this.props.searchingTypes.map((option, i) => {
                return (
                  <option key={i} value={option.key}>{option.label}</option>
                )
              })
            }
          </select>
        </div>
        <div className={"col-md-4 col-12 d-md-inline-flex align-items-center fgReact_searchInputContainer "}>
          <input className="form-control" placeholder="Keyword..." value={this.props.searchingKeyword} onChange={this.props.updateKeyword}>
          </input>
        </div>
          <div className="d-inline-flex align-items-center col-12 col-md-2 "> 
          { 
            this.props.isFirst === true ? (
                
                  <button className="btn btn-secondary" style={{"marginRight":"20px"}} onClick={this.props.addSearchCriteria}>
                    <FontAwesomeIcon className="" icon={["fas", "plus"]}/>
                  </button> 
              ) 
              : (
                  <button className="btn btn-secondary" onClick={() => this.props.removeSearchCriteria(this.props.indexKey)}>
                    <FontAwesomeIcon className="" icon={["fas", "minus"]}/>
                  </button>
              )
            }
          { 
            this.props.isFirst === true ? (
                  <button className="btn btn-primary" onClick={this.props.makeSearch}>
                  <FontAwesomeIcon className="" icon={["fas", "search"]}/>
                  </button>
              ) 
              : (
                ""
              )
            }
          </div>

      </div>
    )
  }
}

export default SearchRow
