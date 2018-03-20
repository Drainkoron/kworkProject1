import BasicRequest from '../basic_request'
import db from '../db'
import { errorRequest, errorNoneData } from '../error_request'

class GoodsSupplier extends BasicRequest {
    constructor() {
        super()
        this.name = 'goods_supplier'
    }
    add(req, res) {
        this.addPg(req.body).then((result) => { 
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
        await this.searchCount(req.body).then((result) => { 
            resultRequest.searchCount = result
        }, (error) => {
            res.status(error.status).send(error.message);
        })
        await this.page(req.body).then((result) => { 
            resultRequest.data = result
        }, (error) => {
            res.status(error.status).send(error.message);
        })
        res.send(resultRequest);
    }
    delete(req, res) {
        console.log(req.body.id, 'req.body.id')
        this.deletePg(req.body).then((result) => { 
            try {
                db.query(`DELETE FROM calculation WHERE (doc->'goods_supplier_id') = '${req.body.id}'`)
                db.query(`DELETE FROM sample WHERE (doc->'goods_supplier_id') = '${req.body.id}'`)
                res.send(result)
            } catch (err) {
                res.status(errorRequest.status).send(errorRequest.message);
            }
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
}

const goodsSupplier = new GoodsSupplier()
export default goodsSupplier