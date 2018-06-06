import BasicRequest from '../basic_request'

import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'

class Goods extends BasicRequest {
    constructor() {
        super()
        this.name = 'goods'
    }
    add(req, res) {
        this.addPg(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    getId(req, res) {
        console.log(req.body, 'req.body')
        this.getIdPg(req.body.id).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    edit(req, res) {
        this.editPg(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    searchCountGoods(object) {
        var requestString = `SELECT count(*) FROM ${this.name} WHERE LOWER((doc->>'name')) ILIKE to_ascii(%${object.fullSearch.toLowerCase()}%)`; 
        for(var name in object.filterField) {
            if(object.filterField[name] != '' && object.filterField[name] != 'all') {
                requestString += `AND (doc->>'${name}') ILIKE '${object.filterField[name]}'`
            }
        }
        if(object.tags.length) {
            var tags = JSON.stringify(object.tags).replace(/"/g, "'")
            requestString += ` AND (doc->'category') ?& array${tags}`
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
    categoryGoods(req, res) {
        this.categoryGoodsReq(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    categoryGoodsReq(object) {
        var tags = JSON.stringify(object.tags).replace(/"/g, "'")
        var requestString = `SELECT * FROM ${this.name} WHERE (doc->'category') ?& array${tags}`
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
    pageGoods(object) {
        var requestString = `SELECT * FROM ${this.name} WHERE LOWER((doc->>'name')) ILIKE '%${object.fullSearch.toLowerCase()}%'`; 
        for(var name in object.filterField) {
            if(object.filterField[name] != '' && object.filterField[name] != 'all') {
                requestString += `AND (doc->>'${name}') ILIKE '${object.filterField[name]}'`
            }
        }
        if(object.tags.length) {
            var tags = JSON.stringify(object.tags).replace(/"/g, "'")
            requestString += ` AND (doc->'category') ?& array${tags}`
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
    async list(req, res) {
        var resultRequest = {
            count: 0,
            searchCount: 0,
            data: []
        }
        await this.count().then((result) => { 
            resultRequest.count = result
        }, (error) => {
            res.status(error.status).send(error.message);
        })
        await this.searchCountGoods(req.body).then((result) => { 
            resultRequest.searchCount = result
        }, (error) => {
            res.status(error.status).send(error.message);
        })
        await this.pageGoods(req.body).then((result) => { 
            resultRequest.data = result
        }, (error) => {
            res.status(error.status).send(error.message);
        })
        res.send(resultRequest);
    }
    async delete(req, res) {
        try {
            const resultG = await db.query(`DELETE FROM goods WHERE id = ${req.body.id} RETURNING id`)
            const resultGS = await db.query(`DELETE FROM goods_supplier WHERE (doc->'goods_id') = '${resultG.rows[0].id}' RETURNING id`)
            resultGS.rows.forEach(elem => {
                console.log(elem.id)
                db.query(`DELETE FROM calculation WHERE (doc->'goods_supplier_id') = '${elem.id}' RETURNING id`)
                db.query(`DELETE FROM sample WHERE (doc->'goods_supplier_id') = '${elem.id}' RETURNING id`)
            })
            res.send(true)
        } catch (err) {
            res.status(errorRequest.status).send(errorRequest.message);
        }
    }
    getIds(req, res) {
        this.getIdsReq(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    getIdsReq(object) {
        var requestString = `SELECT * FROM ${this.name} WHERE id in (${object.keys})`; 
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
    async transferCategory(req, res) {

        var resultGoods = []
        await this.getCategoryIdReq(req.body).then((result) => { 
            resultGoods = result
        }, (error) => {
            res.status(error.status).send(error.message);
        })

        var spliceTag = req.body.oldPath[req.body.oldPath.length - 1]
        resultGoods.forEach(elem => {
            var newCategory = elem.doc.category.splice(elem.doc.category.indexOf(spliceTag))
            elem.doc.category = req.body.newPath.concat(newCategory)
            elem.doc.id = elem.id
            this.editPg(elem.doc).then((result) => { 
                console.log('ok')
            }, (error) => {
                
            })
            
        })
        res.send('true');
    }
    getCategoryIdReq(object) {
        // oldPath: this.transferNode.pathKeys,
        // newPath: pathKeys
        var oldPath = JSON.stringify(object.oldPath).replace(/"/g, "'")

        var requestString = `SELECT * FROM ${this.name} WHERE (doc->'category') ?& array${oldPath}`
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
    changeGategoryReq() {

    }
}

const goods = new Goods()
export default goods