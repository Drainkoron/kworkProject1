import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'


export default function addUserPg() {

    var object = {
        type: 'admin2',
        login: 'admin2',
        password: '7122832'
    }

    var doc = JSON.stringify(object);
    var requestString = `INSERT INTO users (doc) VALUES ('${doc}')`;

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                reject(errorRequest);
            } else {
                resolve(object)
            }
        })
    })
}