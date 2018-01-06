import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'


export default function createTablePg(name) {
    var requestString = `CREATE TABLE ${name} (id SERIAL PRIMARY KEY, doc jsonb)`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest);
            } else {
                resolve(true)
            }
        })
    })
}


