import { db } from '../connect'
import { errorRequest, errorNoneData } from './error_request'


db.query('SELECT * FROM users WHERE id = $1', [id], (err, res) => {
    if (err) {
      return next(err)
    }
    res.send(res.rows[0])
})


const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id])
res.send(rows[0])

export default function getListTablePg() {
    var requestString = `SELECT * FROM orders WHERE id = ${id}`;

    //const { id } = req.params

    const { rows } = await db.query(requestString)
    
    
    res.send(rows[0])

}