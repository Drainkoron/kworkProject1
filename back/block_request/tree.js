import BasicRequest from '../basic_request'

class Tree extends BasicRequest {
    constructor() {
        super()
        this.name = 'tree'
    }
    add(req, res) {
        var tree = {}
        this.addPg(tree).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
    getId(req, res) {
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

}

const tree = new Tree()
export default tree