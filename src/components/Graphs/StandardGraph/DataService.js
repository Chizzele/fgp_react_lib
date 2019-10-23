import axios from "axios"
export default class DataService {
    constructor(deviceType, baseUrl, backUpInterval){
        this.deviceType = deviceType;
        this.baseUrl = baseUrl;
        if(backUpInterval){
            this.backUpInterval = backUpInterval
        }
        
        console.log("base url=> ",  this.baseUrl)
    };
    fetchFirstNLast(ids, interval, fields) {
        console.log("hit first and last")
        return new Promise((resolve, reject) => {
            axios.get(`${this.baseUrl}${this.deviceType}/${interval}/${ids[0]}/first-last`)
            .then(res => { 
                //console.log(res.data);
                res.id = ids[0];
                resolve([res]) 
            });
        });
        // console.log(fields);
         
    };
    fetchdata (ids, interval, range, fields) {
        if( interval ){
            this.backUpInterval = interval
        }else{
            interval = this.backUpInterval
        }
        console.log("hit the fetchdata", ids, interval, parseInt(range.start),parseInt(range.end) )

        return new Promise((resolve, reject) => {
            axios.post(`${this.baseUrl}${this.deviceType}/${interval}`,
            {
                "start" : parseInt(range.start),
                "end" : parseInt(range.end),
                "devices": [ids[0]]
            })
            .then(res => { 
                //console.log(res);
                res = res.data[ids[0]];
                res.id = ids[0];
                resolve([res]) 
            }). catch( res => {

            });
        });
    }
}
