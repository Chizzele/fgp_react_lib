import React, { Component } from 'react'
import FgpGraph from '@future-grid/fgp-graph';
import DataService from './DataService';


export class StandardGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataService : new DataService(this.props.deviceType, this.props.baseUrl)
        }
    }
    render() {
        return (
            <div>
                
            </div>
        )
    }
}



export default StandardGraph
