import BasicRequest from '../basic_request'

class Staff extends BasicRequest {
    constructor() {
        super()
        this.name = 'staff'
    }
    add(req, res) {
        this.addPg(req.body).then((result) => { 
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }
}

const staff = new Staff()
export default staff