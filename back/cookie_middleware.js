import db from './db'
import jwt from 'jsonwebtoken'

export default function checkToken(req, res, next) {
    if('token' in req.cookies) {
        if(req.cookies.token) {
            var user = jwt.verify(req.cookies.token, req.get('User-Agent'))
            var requestString = `SELECT (doc) FROM users WHERE (doc->>'login') LIKE '${user.login}' 
                                                        AND (doc->>'password') LIKE '${user.password}'`
            db.query(requestString, (err, resPg) => {
                if (err) {
                    responseError(res)
                } else {
                    if(resPg.rows.length) {
                        next()
                    } else {
                        responseError(res)
                    }
                }
            })
        }
    } else {
        responseError(res)
    }
}

function responseError(res) {
    res.status(401).send('Unauthorized');
}