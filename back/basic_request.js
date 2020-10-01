import db from './db'
import { errorRequest, errorNoneData } from './error_request'
import userObject from './user_object'

class BasicRequest {
    addPg(object) {
        var doc = JSON.stringify(object)
        var requestString = `INSERT INTO ${this.name} (doc) VALUES ('${doc}') RETURNING id, doc`

        return new Promise((resolve, reject) => {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest);
                } else {
                    this.addLogPg({
                        name: this.name,
                        event: 'add',
                        log: res.rows[0]
                    })
                    resolve(res.rows[0])
                }
            })
        })
    }
    getParamsPg(object) {
        var requestString = `SELECT * FROM ${this.name} WHERE (doc->>'${object.field}') ILIKE '${object.value}'`

        return new Promise(function(resolve, reject) {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest)
                } else {
                    if(res.rows[0]) {
                        resolve(res.rows[0])
                    } else {
                        reject(errorNoneData)
                    }
                }
            })
        })
    }
    getIdPg(id) {
        var requestString = `SELECT * FROM ${this.name} WHERE id = '${id}'`
        return new Promise((resolve, reject) => {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest)
                } else {
                    if(res.rows[0]) {
                        this.addLogPg({
                            name: this.name,
                            event: 'edit',
                            log: res.rows[0]
                        })
                        resolve(res.rows[0])
                    } else {
                        reject(errorNoneData)
                    }
                }
            })
        })
    }
    editPg(object) {
        var doc = JSON.stringify(object)
        var requestString = `UPDATE ${this.name} SET doc = '${doc}' WHERE id = ${object.id} RETURNING id, doc`

        return new Promise((resolve, reject) => {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest);
                } else {
                    if(res.rows[0]) {
                        this.addLogPg({
                            name: this.name,
                            event: 'edit',
                            log: res.rows[0]
                        })
                        resolve(res.rows[0])
                    } else {
                        reject(errorNoneData)
                    }
                }
            })
        })
    }
    deletePg(object) {
        var requestString = `DELETE FROM ${this.name} WHERE id = ${object.id} RETURNING id, doc`;
        return new Promise((resolve, reject) => {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest);
                } else {
                    if(res.rows[0]) {
                        this.addLogPg({
                            name: this.name,
                            event: 'delete',
                            log: res.rows[0]
                        })
                        resolve(res.rows[0])
                    } else {
                        reject(errorNoneData)
                    }
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
                    resolve(res.rows[0].count * 1)
                }
            })
        })
    }
    searchAll(object) {
        console.log(this.name)
        var requestString = `SELECT * FROM ${this.name} WHERE`
        for(var name in object.filterField) {
            if(object.filterField[name] != '' && object.filterField[name] != 'all') {
                requestString += ` (doc->>'${name}') ILIKE '${object.filterField[name]}'`
            }
        }
        return new Promise(function(resolve, reject) {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest)
                } else {
                    console.log('SA:', res.rows)
                    resolve(res.rows)
                }
            })
        })
    }

    searchAll2(object) {
        var requestString = `SELECT * FROM ${this.name}`
        return new Promise(function(resolve, reject) {
            db.query(requestString, (err, res) => {
                if (err) {
                    reject(errorRequest)
                } else {
                    console.log(res.rows)
                    resolve(res.rows)
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
                    resolve(res.rows[0].count * 1)
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
        requestString += `ORDER BY (doc->>'${object.sortBy.field}') ${object.sortBy.reverse ? 'DESC' : 'ASC'} `
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
    selectPg(object) {
        var requestString = `SELECT * FROM ${this.name} WHERE (doc->>'${object.field}') ILIKE '%${object.value}%' 
                                ORDER BY (doc->>'${object.field}') LIMIT 15`; 
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
    addLogPg(object) {
        object.user = userObject.getUser()
        var doc = JSON.stringify(object)
        var requestString = `INSERT INTO log (doc) VALUES ('${doc}') RETURNING id, doc`

        db.query(requestString, (err, res) => {
            if (err) {
                
            } else {
                
            }
        })
    }
}

export default BasicRequest



// var countString = `SELECT count(*) FROM orders`

// var requestString = `SELECT * FROM orders WHERE (doc::text) ILIKE '%${object.text}%' AND
//                                                     (doc->'header'->>'status') LIKE '${object.status}'
//                                                     LIMIT ${object.step} OFFSET ${(object.page - 1) * object.step}`;