
import path from 'path';
import express from 'express';
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'

const PUBLIC_PATH = __dirname + '/static';

const app = express();
const isDevelopment = process.env.NODE_ENV === 'development';

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(cookieParser())

if (isDevelopment) {
	const webpack = require('webpack');
	const webpackConfig = require('./webpack.config.babel').default;
	const compiler = webpack(webpackConfig);
	app.use(require('webpack-dev-middleware')(compiler, {
		hot: true,
		stats: {
			colors: true
		}
	}));
  	app.use(require('webpack-hot-middleware')(compiler));
} else {
  	app.use(express.static(PUBLIC_PATH));
}


const PORT = 8000;

app.listen(PORT, function() {
	console.log('Go on port ' + PORT + '...');
});

import db from './back/db'


app.all(['/', '/cabinet', '/cabinet/*'], function(req, res) {
	res.sendFile(path.resolve(PUBLIC_PATH, 'index.html'))
});

// app.get("/admin", async (req, res) => {
// 	const { rows } = await db.query("SELECT table_name FROM information_schema.tables WHERE table_type = 'BASE TABLE' AND table_schema = 'public' ORDER BY table_type, table_name")
// 	res.json(rows)
// });


/* User */
import { addUser, viewUser, authUser, logout } from './back/user/request'
import checkToken from './back/cookie_middleware'

app.get("/view_user", viewUser)
app.post("/auth_user", authUser)
app.use(checkToken)
app.get("/logout", logout)

/* Table */
import { getTable, createTable, dropTable } from './back/admin/request'

app.get("/get_table", getTable)
app.post("/create_table", createTable)
app.post("/drop_table", dropTable)

/* Dictionary */
import { getList, addElem } from './back/dictionary/request'

app.post("/get_dictionary", getList)
app.post("/add_dictionary_elem", addElem)

import staff from './back/block_request/staff'

app.get("/add_staff", staff.add)



//https://github.com/auth0/node-jsonwebtoken

