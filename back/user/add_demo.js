import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'

export default function addDemoUserPg() {

    var object = {
        type: 'admin',
        login: 'demo',
        password: '12345'
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