import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'


export default function addElemPg(object) {
    var doc = JSON.stringify({value: object.value})
    
    var requestString = `INSERT INTO ${object.name} (doc) VALUES ('${doc}')`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest);
            } else {
                resolve(object)
            }
        })
    })
}