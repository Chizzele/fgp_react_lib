import React, { Component } from 'react'
import './Breadcrumbs'
import { NavLink} from 'react-router-dom' ;
export class Breadcrumb extends Component {
    constructor(props){
        super(props);
        this.state= {   

        }
    }
    render() {
        return (
            <li key={this.props.key} className={"breadcrumb"}>
                <NavLink to={`../${this.props.redirect}/${this.props.deviceName}`}>
                    <img src={this.props.img} className={'bcImg'}>
                    </img>
                    &nbsp;
                    {this.props.deviceType}: 
                    {this.props.deviceName}
                </NavLink>
            </li>
        )
    }
}

export default Breadcrumb
