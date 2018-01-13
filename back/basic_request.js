import db from './db'
import { errorRequest, errorNoneData } from './error_request'


class BasicRequest {
    addPg(object) {
        var doc = JSON.stringify(object)
        var requestString = `INSERT INTO ${this.name} (doc) VALUES ('${doc}')`
    
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
}

export default BasicRequest