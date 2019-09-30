import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom' ;
import { ProtectedRoute } from '../ProtectedRoute/ProtectedRoute';


export class RouteWrap extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <Router>
            <Switch>
               {this.props.children} 
            </Switch>
        </Router>
    )
  }
}

export default RouteWrap
