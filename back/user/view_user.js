import db from '../db'
import jwt from 'jsonwebtoken'
import { errorRequest, errorNoneData } from '../error_request'


export default function viewUserPg(req) {
    var user = jwt.verify(req.cookies.token, req.get('User-Agent'))
    var requestString = `SELECT (doc) FROM users WHERE (doc->>'login') LIKE '${user.login}' 
                                                AND (doc->>'password') LIKE '${user.password}'`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorNoneData);
            } else {
                resolve(res.rows[0].doc)
            }
        })
    })
}

