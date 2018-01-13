import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'


export default function getListPg(object) {

    var requestString = `SELECT (doc) FROM ${object.name} WHERE (doc->>'value') ILIKE '%${object.value}%'`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorNoneData);
            } else {
                resolve(res.rows)
            }
        })
    })
}

