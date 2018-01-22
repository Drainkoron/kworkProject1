import { Pool } from 'pg';
// https://node-postgres.com/

if(process.env.NODE_ENV == 'development') {
    var conString = "postgres://postgres:root@localhost/postgres";
} else {
    //var conString = "postgres://admin:712283@localhost/orange";
    var conString = "postgres://postgres:root@localhost/postgres";
}

const pool = new Pool({
    connectionString: conString,
})

const db = {
    query: (text, params) => pool.query(text, params)
} 

export default db
