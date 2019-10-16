import React, { Component } from 'react'
import FgpGraph from '@future-grid/fgp-graph';
import DataService from './DataService';
import { Formatters } from '@future-grid/fgp-graph/lib/extras/formatters';

export class StandardGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataService : new DataService(this.props.deviceType, this.props.baseUrl),
            formatters : this.props.timeZone ? new Formatters(this.props.timeZone) : new Formatters(Intl.DateTimeFormat().resolvedOptions().timeZone),
            id : `sg_${Math.random().toString(36).substr(2, 11)}`
        }

    }

    buildConfig(){
        let rangeCollection = this.props.rangeCollection;
        let collections = this.props.collections;
        let ranges = this.props.ranges;
        let initRange = this.props.initRange ? this.props.initRange : {
            start: moment().tz('Australia/Adelaide').subtract(2, 'days').startOf('day').valueOf(),
            end: moment().tz('Australia/Adelaide').add(1, 'days').startOf('day').valueOf()
        };
        let vfConfig = {
            name: 'device view',
            graphConfig: {
                features: {
                    zoom: this.props.zoom ? this.props.zoom : true,
                    scroll: this.props.scroll ? this.props.scroll : true,
                    rangeBar: this.props.rangeBar ? this.props.rangeBar : true,
                    legend: this.state.formatters.legendForAllSeries
                },
                entities: [
                    {
                        id: this.props.deviceName,
                        type: this.props.deviceType,
                        name: this.props.deviceName
                    }
                ],
                rangeEntity: {
                    id: this.props.deviceName,
                    type: this.props.deviceType,
                    name: this.props.deviceName
                },
                rangeCollection: rangeCollection,
                collections: collections
            },
            dataService: this.state.dataService,
            show: true,
            ranges: ranges,
            initRange: initRange,
            interaction: {
                callback: {
                    highlighCallback: (datetime, series, points) => {
                        // console.debug("selected series: ", series);
                        return [];
                    },
                    selectCallback: series => {
                        // console.debug("choosed series: ", series);
                    }
                }
            },
            timezone: this.props.timeZone
        }
    }


    render() {
        return (
            <div id={this.state.id}>
                
            </div>
        )
    }
}



export default StandardGraph
