import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'


export default function dropTablePg(name) {
    var requestString = `DROP TABLE ${name}`

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


