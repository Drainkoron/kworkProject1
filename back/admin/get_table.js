import db from '../db'
import jwt from 'jsonwebtoken'
import { errorRequest, errorNoneData } from '../error_request'


export default function getTablePg() {
    var requestString = `SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public' ORDER BY table_type, table_name`

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
