import BasicRequest from '../basic_request'

class Options extends BasicRequest {
    constructor() {
        super()
        this.name = 'options'
    }
    add(req, res) {
        var options = {}
        this.addPg(options).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    getId(req, res) {
        this.getIdPg(req.body.id).then((result) => { 
            console.log(req, res)
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    edit(req, res) {
        this.editPg(req.body).then((result) => { 
            console.log(req, res)
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }

}

const options = new Options()
export default options