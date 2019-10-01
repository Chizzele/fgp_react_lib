import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom' ;


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
