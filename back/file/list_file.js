import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'


export default function listFilePg(object) {

    var requestString = `SELECT * FROM files WHERE (doc->>'id') = '${object.id}' 
                                                AND (doc->>'object') = '${object.object}'`

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

