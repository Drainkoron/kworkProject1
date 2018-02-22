
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


import supplier from './back/block_request/supplier'
app.post("/supplier_add", (req, res) => supplier.add(req, res))
app.post("/supplier_edit", (req, res) => supplier.edit(req, res))
app.post("/supplier_delete", (req, res) => supplier.delete(req, res))
app.post("/supplier_list", (req, res) => supplier.list(req, res))
app.post("/supplier_select", (req, res) => supplier.select(req, res))
app.post("/supplier_get_params", (req, res) => supplier.getParams(req, res))


import goods from './back/block_request/goods'
app.post("/goods_add", (req, res) => goods.add(req, res))
app.post("/goods_edit", (req, res) => goods.edit(req, res))
app.post("/goods_list", (req, res) => goods.list(req, res))


import options from './back/block_request/options'
app.get("/options_add", (req, res) => options.add(req, res))
app.post("/options_get", (req, res) => options.getId(req, res))
app.post("/options_edit", (req, res) => options.edit(req, res))


import goodsSupplier from './back/block_request/goods_supplier'
app.post("/goods_supplier_add", (req, res) => goodsSupplier.add(req, res))
app.post("/goods_supplier_get", (req, res) => goodsSupplier.getId(req, res))
app.post("/goods_supplier_edit", (req, res) => goodsSupplier.edit(req, res))
app.post("/goods_supplier_list", (req, res) => goodsSupplier.list(req, res))






//https://github.com/auth0/node-jsonwebtoken


  
//   var upload = multer({ storage: storage })

