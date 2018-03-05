import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'

export default function editUserPg(object) {
    var doc = JSON.stringify(object)
    var requestString = `UPDATE users SET doc = '${doc}' WHERE id = ${object.id} RETURNING id, doc`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest);
            } else {
                if(res.rows[0]) {
                    resolve(res.rows[0])
                } else {
                    reject(errorNoneData)
                }
            }
        })
    })
}