import db from './db'
import jwt from 'jsonwebtoken'

export default function checkToken(req, res, next) {
    if('token' in req.cookies) {
        var user = jwt.verify(req.cookies.token, 'reactor');
        var requestString = `SELECT (doc) FROM users WHERE (doc->>'login') LIKE '${user.login}' 
                                                    AND (doc->>'password') LIKE '${user.password}'`
        db.query(requestString, (err, res) => {
            if (err) {
                responseError(res)
            } else {
                if(res.rows.length) {
                    next()
                } else {
                    responseError(res)
                }
            }
        })
    } else {
        responseError(res)
    }
}

function responseError(res) {
    res.status(401).send('Unauthorized');
}