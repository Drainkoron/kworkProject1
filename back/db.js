import { Pool } from 'pg';
// https://node-postgres.com/

if(process.env.NODE_ENV == 'development') {
    var conString = "postgres://postgres:root@localhost/ipapai";
} else {
    var conString = "postgres://base:U82SDFsdfkl3Smcnd@localhost/base";
}

const pool = new Pool({
    connectionString: conString,
})

const db = {
    query: (text, params) => pool.query(text, params)
} 

export default db
