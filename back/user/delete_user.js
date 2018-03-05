import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'

export default function deleteUserPg(object) {
    var requestString = `DELETE FROM users WHERE id = ${object.id} RETURNING id, doc`;

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest)
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