import db from '../db'
import jwt from 'jsonwebtoken'
import { errorRequest, errorNoneData } from '../error_request'


export default function authUserPg(object) {

    var requestString = `SELECT * FROM users WHERE (doc->>'login') LIKE '${object.login}' 
                                                AND (doc->>'password') LIKE '${object.password}'`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest);
            } else {
                if(res.rows[0]) {
                    
                    resolve(res.rows[0])
                } else {
                    reject(errorNoneData);
                }
            }
        })
    })
}

