import BasicRequest from '../basic_request'

import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'

class Generate {
    constructor() {

    }
    getCalc(req, res) {
        this.getCalcReq(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    
    getCalcReq(object) {
        var requestString = `SELECT * FROM calculation WHERE (doc->>'goods_supplier_id')::int IN 
                             (SELECT id FROM goods_supplier WHERE (doc->>'goods_id')::int = ${object.id})`; 

        return new Promise(function(resolve, reject) {
            db.query(requestString, (err, res) => {
                if (err) {
                    console.log(err, 'err')
                    reject(errorRequest)
                } else {
                    resolve(res.rows)
                }
            })
        })
    }

    getSample(req, res) {
        this.getSampleReq(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    
    getSampleReq(object) {
        var requestString = `SELECT * FROM sample WHERE (doc->>'goods_supplier_id')::int IN 
                             (SELECT id FROM goods_supplier WHERE (doc->>'goods_id')::int = ${object.id})`; 

        return new Promise(function(resolve, reject) {
            db.query(requestString, (err, res) => {
                if (err) {
                    console.log(err, 'err')
                    reject(errorRequest)
                } else {
                    resolve(res.rows)
                }
            })
        })
    }
}

const generate = new Generate()
export default generate