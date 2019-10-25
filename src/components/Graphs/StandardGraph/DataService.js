import axios from "axios"
export default class DataService {
    constructor(deviceType, baseUrl, backUpInterval, backupFields, version){
        this.deviceType = deviceType;
        this.baseUrl = baseUrl;
        this.backUpInterval = backUpInterval ? backUpInterval : null;
        this.backupFields = backupFields ? backupFields : null;
        this.version = version ? version : null ;
    };

    fetchFirstNLast(ids, interval, fields) {
        if(interval){
            this.backUpInterval = interval
        }else{
            this.backUpInterval = interval
        }
        if(fields[0]){
            this.backupFields = fields
        }else{
            fields = this.backupFields
        }
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
        if(interval){
            this.backUpInterval = interval
        }else{
            this.backUpInterval = interval
        }
        if(fields[0]){
            this.backupFields = fields
        }else{
            fields = this.backupFields
        }
        if(this.version === "wel"){
            return new Promise((resolve, reject) => {
                axios.post(`${this.baseUrl}${this.deviceType}/${interval}`,
                {
                    "start" : parseInt(range.start),
                    "end" : parseInt(range.end),
                    "devices": [ids[0]],
                    "fields": fields
                })
                .then(res => { 
                    //console.log(res);
                    res = res.data[ids[0]];
                    res.id = ids[0];
                    resolve([res]) 
                });
            });
        }else{
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
}
