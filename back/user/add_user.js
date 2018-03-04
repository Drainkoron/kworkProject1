import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'

export default function addUserPg(object) {

    var object = {
        type: 'admin',
        login: 'admin',
        password: '712283'
    }

    var doc = JSON.stringify(object)
    var requestString = `INSERT INTO users (doc) VALUES ('${doc}')`

    return new Promise(function(resolve, reject) {
        db.query(requestString, (err, res) => {
            if (err) {
                console.log(err)
                reject(errorRequest);
            } else {
                resolve(object)
            }
        })
    })
}