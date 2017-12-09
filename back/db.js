import { Pool } from 'pg';
// https://node-postgres.com/

if(process.env.NODE_ENV == 'development') {
    var conString = "postgres://postgres:root@localhost/postgres";
} else {
    var conString = "postgres://admin:712283@localhost/orange";
}

const pool = new Pool({
    connectionString: conString,
})

const db = {
    query: (text, params) => pool.query(text, params)
} 


export default db
// export function connectBase() {
//     return new Promise(function(resolve, reject) {
//         var client = new Client(conString);
//         client.connect(function (err) {
//             if(err) {
//                 reject({status: 503, 
//                          message: 'Connect SQL error'})
//             } else {
//                 resolve(client)
//             }
//         });
//     });
// }