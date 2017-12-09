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

// export default function getListTablePg() {

//     var requestString = `SELECT * FROM orders WHERE id = ${id}`;

//     return new Promise(function(resolve, reject) {
//         clientSql().then((client) => {

//             client.query(requestString).then((result) => {
//                 if(result.rowCount != 0) {
//                     resultRequest.success(result.rows[0]);
//                 } else {
//                     resultRequest.error(errorNoneData);
//                 }
                    
//             }, (error) => {
//                 resultRequest.error(errorRequest);
//             });

//             var resultRequest = {
//                 success(val) {
//                     client.end();
//                     resolve(val);
//                 },
//                 error(val) {
//                     client.end();
//                     reject(val);
//                 }
//             }
//         }, (error) => {
//             reject(error);
//         })    
//     })
// }