import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'


export default function addFilePg(object) {
    var doc = JSON.stringify(object)
    var requestString = `INSERT INTO files (doc) VALUES ('${doc}') RETURNING id, doc`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest);
            } else {
                resolve(res.rows[0])
            }
        })
    })
}