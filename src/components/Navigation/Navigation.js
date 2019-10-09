import React, { Component } from 'react';
import './fgpReact-Navigation.css';
import { TopNavigation } from './TopNavigation/TopNavigation';
import { SideNavigation } from './SideNavigation/SideNavigation';
import fgLogo from './fgp-logo.png';

export class Navigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      isOpen: false,
      currentPage:this.props.currentPage,
      isDashboard:this.props.isDashboard
    };
    // this.toggleNav = this.toggleNav.bind(this);
    console.log("navporops", this.props)
  }

  // toggleNav() {
  //   this.setState(props => ({
  //     isOpen: !props.isOpen
  //   }));
  // }

  render() {
    return (
      <header>
        <TopNavigation
          isOpen={this.props.isOpen}
          isDashboard={this.props.isDashboard}
          topNavAction={this.props.topNavAction}
          topNavTitle={this.props.topNavTitle}
        />

        <SideNavigation
          history={this.props.history}
          currentPage={this.props.currentPage}
          isOpen={this.props.isOpen}
          handler={this.toggleNav}
          items={this.props.items}
          sideNavLogo={this.props.sideNavLogo ? this.props.sideNavLogo : fgLogo}
        />    

      </header>
    )
  }
}

export default Navigation
