import getListPg from './get_list'
import addElemPg from './add_elem'

export function getList(req, res) {
	getListPg(req.body).then((result) => { 
        res.send(result);
    }, (error) => {
        res.status(error.status).send(error.message);
    })
}

export function addElem(req, res) {
	addElemPg(req.body).then((result) => { 
        res.send(result);
    }, (error) => {
        res.status(error.status).send(error.message);
    })
}

