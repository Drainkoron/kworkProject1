import db from '../db'
import jwt from 'jsonwebtoken'
import { errorRequest, errorNoneData } from '../error_request'


export default function viewUserPg(token) {
    var user = jwt.verify(token, 'reactor');
    var requestString = `SELECT (doc) FROM users WHERE (doc->>'login') LIKE '${user.login}' 
                                                AND (doc->>'password') LIKE '${user.password}'`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                console.log(err, 'sql_error')
                reject(errorNoneData);
            } else {
                resolve(res.rows[0].doc)
            }
        })
    })
}

