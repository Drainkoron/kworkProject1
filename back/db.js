import { Pool } from 'pg';
// https://node-postgres.com/

if(process.env.NODE_ENV == 'development') {
    var conString = "postgres://postgres:root@localhost/postgres";
} else {
    var conString = "postgres://admin:712283@localhost/wh3";
}

const pool = new Pool({
    connectionString: conString,
})

const db = {
    query: (text, params) => pool.query(text, params)
} 

export default db
