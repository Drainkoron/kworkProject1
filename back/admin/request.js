import getTablePg from './get_table'
import createTablePg from './create_table'
import dropTablePg from './drop_table'

export function getTable(req, res) {
	getTablePg().then((result) => { 
        res.send(result);
    }, (error) => {
        res.status(error.status).send(error.message);
    })
}

export function createTable(req, res) {
	createTablePg(req.body.name).then((result) => { 
        res.send(result);
    }, (error) => {
        res.status(error.status).send(error.message);
    })
}

export function dropTable(req, res) {
	dropTablePg(req.body.name).then((result) => { 
        res.send(result);
    }, (error) => {
        res.status(error.status).send(error.message);
    })
}

