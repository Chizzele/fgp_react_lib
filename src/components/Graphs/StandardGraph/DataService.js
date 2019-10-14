export default class DataService {
    constructor(deviceType, baseUrl){
        this.deviceType = deviceType;
        this.baseUrl = baseUrl;
    };
    fetchFirstNLast = (ids, interval, fields) => {
        console.log(ids);
        // console.log(interval);
       
        return new Promise((resolve, reject) => {
            axios.get(`${baseUrl}transformer/${interval}/${ids[0]}/first-last`)
            .then(res => { 
                //console.log(res.data);
                res.id = ids[0];
                resolve([res]) 
            });
        });
        // console.log(fields);
         
    };
    fetchdata = (ids, interval, range, fields) => {
        return new Promise((resolve, reject) => {
            axios.post(`${baseUrl}transformer/${interval}`,
            {
                "start" : range.start,
                "end" : range.end,
                "devices": [ids[0]]
            })
            .then(res => { 
                //console.log(res);
                res = res.data[ids[0]];
                res.id = ids[0];
                resolve([res]) 
            });
        });
    }
}
