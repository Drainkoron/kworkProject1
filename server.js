
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
	  app.use(express.static(PUBLIC_PATH));
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


/* User */
import { addUser, addDemoUser, viewUser, authUser, logout, userList } from './back/user/request'
import checkToken from './back/cookie_middleware'

app.get("/init_admin", addUser)
app.get("/init_demo", addDemoUser)

app.get("/view_user", viewUser)
app.post("/auth_user", authUser)
app.use(checkToken)
app.get("/logout", logout)
app.get("/user_list", userList)


/* Table */
import { getTable, createTable, dropTable } from './back/admin/request'

app.get("/get_table", getTable)
app.post("/create_table", createTable)
app.post("/drop_table", dropTable)

/* Dictionary */
import { getList, addElem } from './back/dictionary/request'

app.post("/get_dictionary", getList)
app.post("/add_dictionary_elem", addElem)

/* File */
import { uploadFile, listFile, deleteFile, uploadAvatar } from './back/file/request'

app.post('/upload_file', uploadFile)
app.post('/upload_avatar', uploadAvatar)
app.post('/list_file', listFile)
app.post('/delete_file', deleteFile)

/* Custom */

import tree from './back/block_request/tree'
app.get("/tree_add", (req, res) => tree.add(req, res))
app.post("/tree_get", (req, res) => tree.getId(req, res))
app.post("/tree_edit", (req, res) => tree.edit(req, res))




import staff from './back/block_request/staff'

app.post("/staff_add", (req, res) => staff.add(req, res))
app.post("/staff_edit", (req, res) => staff.edit(req, res))
app.post("/staff_list", (req, res) => staff.list(req, res))


import customer from './back/block_request/customer'

app.post("/customer_add", (req, res) => customer.add(req, res))
app.post("/customer_edit", (req, res) => customer.edit(req, res))
app.post("/customer_list", (req, res) => customer.list(req, res))


import order from './back/block_request/order'

app.post("/order_add", (req, res) => order.add(req, res))
app.post("/order_edit", (req, res) => order.edit(req, res))
app.post("/order_list", (req, res) => order.list(req, res))






//https://github.com/auth0/node-jsonwebtoken


  
//   var upload = multer({ storage: storage })

