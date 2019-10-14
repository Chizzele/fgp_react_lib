import React, { Component } from 'react'
import {ExternalLink} from './ExternalLink';
export class ExternalLinkPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            config : this.props.config,
            title : this.props.title ? this.props.title : ""
        };
        console.log('State of the external links page: ', this.state)
    }
    render() {
        return (
            <div className={ "fgReact_home "}>
                <div className={"text-left w-100 fgReact_SearchPageTitle "  +  (this.props.isFluid === true ? " container-fluid " : " container ")}>
                    <h3>{this.state.title}</h3>
                </div>
                <div className={"operations " +  (this.props.isFluid === true ? " container-fluid " : " container ")}>
                    <div className={"col-12 row"}>
                    {   // for each group, show the categories, for each category, show links
                        this.props.config.map( group => {
                            return(
                                <div key={`k_g_${group.position}`} className={"col-4 text-left"}>
                                {
                                    group.category.map( category => {
                                        return(
                                            <div key={`k_c_${category.label}`} className={"fgReact_componentContainer d-block"}>
                                                <h4> {category.label} </h4>
                                                <ul style={{"padding-left" : "0"}}>
                                                    {
                                                        category.links.map( link =>{
                                                            return(
                                                                <ExternalLink 
                                                                    itemName={link.name}
                                                                    itemLink={link.link}
                                                                    itemDesc={link.desc}
                                                                />           
                                                            )
                                                        })    
                                                    }
                                                </ul>
                                            </div>
                                        )
                                    })
                                }
                                </div>
                            )
                        })
                        
                    }
                    </div>
                
                
                </div>
                {this.props.children}
            </div>
        )
    }
}

export default ExternalLinkPage
