import BasicRequest from '../basic_request'

class Courses extends BasicRequest {
    constructor() {
        super()
        this.name = 'courses'
    }
    get(req, res) {
        fetch(`https://api.ratesapi.io/api/latest?base=${base}`, {
            method: 'GET',
            credentials: 'include',
        }).then((data) => {
            resolve(data.RUB)
        }).catch((error) => {
            reject(error)
        });
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
            console.log(req, res)
            res.send(result);
        }, (error) => {
            res.status(error.status).send(error.message);
        })
    }

}

const options = new Options()
export default options