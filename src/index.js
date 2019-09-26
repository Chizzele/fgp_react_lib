import React from "react";
import "./fgpReactJsStyles.css";

const TopNavigation = props => {
    const {isOpen, topNavTitle } = props;
    return (
        <div className={"closedheader " + (isOpen === true ? "openheader" : "")}>
            <div className="companyLogo">
                {topNavTitle ? topNavTitle : "Compass"}
            </div> 
        </div>
    )
}

 
export { 
    TopNavigation
  }