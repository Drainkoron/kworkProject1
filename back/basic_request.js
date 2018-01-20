import db from './db'
import { errorRequest, errorNoneData } from './error_request'


class BasicRequest {
    addPg(object) {
        var doc = JSON.stringify(object)
        var requestString = `INSERT INTO ${this.name} (doc) VALUES ('${doc}') RETURNING id, doc`

        return new Promise(function(resolve, reject) {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest);
                } else {
                    resolve(res.rows[0])
                }
            })
        })
    }
    count() {
        var requestString = `SELECT count(*) FROM ${this.name}`
        return new Promise(function(resolve, reject) {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest)
                } else {
                    resolve(res.rows[0].count)
                }
            })
        })
    }
    searchCount(object) {
        var requestString = `SELECT count(*) FROM ${this.name} WHERE (doc::text) ILIKE '%${object.fullSearch}%'`; 
        for(var name in object.filterField) {
            if(object.filterField[name] != '' && object.filterField[name] != 'all') {
                requestString += `AND (doc->>'${name}') ILIKE '${object.filterField[name]}'`
            }
        }
        return new Promise(function(resolve, reject) {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest)
                } else {
                    resolve(res.rows[0].count)
                }
            })
        })
    }
    page(object) {
        var requestString = `SELECT * FROM ${this.name} WHERE (doc::text) ILIKE '%${object.fullSearch}%'`; 
        for(var name in object.filterField) {
            if(object.filterField[name] != '' && object.filterField[name] != 'all') {
                requestString += `AND (doc->>'${name}') ILIKE '${object.filterField[name]}'`
            }
        }
        requestString += `LIMIT ${object.limit} OFFSET ${(object.page - 1) * object.limit}` 
        return new Promise(function(resolve, reject) {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest)
                } else {
                    resolve(res.rows)
                }
            })
        })
    }
}

export default BasicRequest



// var countString = `SELECT count(*) FROM orders`

// var requestString = `SELECT * FROM orders WHERE (doc::text) ILIKE '%${object.text}%' AND
//                                                     (doc->'header'->>'status') LIKE '${object.status}'
//                                                     LIMIT ${object.step} OFFSET ${(object.page - 1) * object.step}`;