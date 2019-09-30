import React, { Component } from 'react';
import './fgpReact-SideNavigation.css';
import {SideNavigationItem} from './SideNavigationItem/SideNavigationItem'

export class SideNavigation extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentPage : props.currentPage,
      isOpen : props.isOpen,
      items : props.items ? props.items : null
    };
  }

  render() {
    return (
      <div className={"fgReact-SideNavigation " + (this.props.isOpen === true ? "fgReact-SideNavigation-open " : "")}>
        <div className={"fgReact_compass2 "+ (this.props.isOpen === true ? "fgReact_compass-active2 " : "")} onClick={this.props.handler}>
          <div className="fgReact_logo-thingsat" style={this.props.sideNavLogoPath ? ({backgroundImage :'url('+this.props.sideNavLogoPath+')'}) : {backgroundImage :'url(./fgp-logo.png)'}}>
          </div>
        </div>
        {
          this.state.items ? 
            this.state.items.map((item) => {
              <SideNavigationItem
                extensionShown={this.props.isOpen}
                currentPage={this.props.currentPage}
                linkTo={item.linkTo}
                fontAwesomeIcon={item.fontAwesomeIcon}
                fontAwesomeLib={item.fontAwesomeLib}
                description={item.description}

              />
            })
            :
              null
        }
        {/* Always have sign out */}
        <SideNavigationItem
          history={this.props.history}
          extensionShown={this.props.isOpen}
          currentPage={this.props.currentPage}
          linkTo={"/Signout"}
          fontAwesomeIcon="sign-out-alt"
          fontAwesomeLib="fa"
          description="Sign Out"
          isSignOut={true}
        />
        
      </div>
    )
  }
}

export default SideNavigation
