import db from '../db'
import jwt from 'jsonwebtoken'
import { errorRequest, errorNoneData } from '../error_request'


export default function getUserListPg(object) {

    var requestString = `SELECT * FROM users`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest);
            } else {
                if (err) {
                    reject(errorRequest)
                } else {
                    resolve(res.rows)
                }
            }
        })
    })
}