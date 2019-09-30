import React, { Component } from 'react';
import './fgpReact-Page.css';
import { Navigation } from '../Navigation/Navigation';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom' ;
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';

export class Page extends Component {
  
  render() {
    return (
      <div className="fgReact_home">
        <Navigation
          history={this.props.history}
          currentPage={this.props.pageName}
          topNavTitle={this.props.topNavTitle}
          sideNavLogoPath={this.props.sideNavLogoPath}
        />
      
        {this.props.children}
      </div>
    )
  }
}

export default Page
