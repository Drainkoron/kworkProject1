import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'


export default function deleteFilePg(object) {

    var requestString = `DELETE FROM files WHERE id = '${object.id}' RETURNING id, doc`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorNoneData);
            } else {
                resolve(res.rows[0])
            }
        })
    })
}

