import BasicRequest from '../basic_request'

class Supplier extends BasicRequest {
    constructor() {
        super()
        this.name = 'supplier'
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
    select(req, res) {
        this.selectPg(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    getParams(req, res) {
        this.getParamsPg(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    } 
    delete(req, res) {
        this.deletePg(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
}

const supplier = new Supplier()
export default supplier

//_select