import fs from 'fs'
import multer from 'multer' //https://github.com/expressjs/multer

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
        callback(null, __dirname + '/../../static/files')
	},
	filename: function (req, file, callback) {
        callback(null, file.originalname)
	}
})

const upload = multer({ storage: storage }).single('file')

function uploadPromise(req, res) {
    return new Promise(function(resolve, reject) {
        upload(req, res, function (err) {
            if (err) {
                reject()
            } else {
                req.body.name = req.file.originalname
                req.body.path = `files/${req.file.originalname}`
                resolve(req.body)
            }
        })
    })
}

function deletePromise(name) {
    return new Promise(function(resolve, reject) {
        fs.unlink(__dirname + `/../../static/files/${name}`, function (err) {
            if(err) {
                reject(err)
            } else {
                resolve()
            }        
        })
    })
}


//!!!! token!!!! ????

import addFilePg from './add_file'
import listFilePg from './list_file'
import deleteFilePg from './delete_file'

export async function uploadFile(req, res) {
    var data = ''
	await uploadPromise(req, res).then((result) => { 
        data = result
    }, (error) => {
        res.status(500).send('File upload error');
    })

    await addFilePg(data).then((result) => { 
        res.send(result)
    }, (error) => {
        res.status(error.status).send(error.message)
    })
}

export function listFile(req, res) {
	listFilePg(req.body).then((result) => { 
        res.send(result);
    }, (error) => {
        res.status(error.status).send(error.message);
    })
}

export async function deleteFile(req, res) {
    var filesName = ''
    await deleteFilePg(req.body).then((result) => { 
        filesName = result.doc.name
    }, (error) => {
        res.status(error.status).send(error.message);
    })

    await deletePromise(filesName).then((result) => { 
        res.send(result);
    }, (error) => {
        res.status(500).send('File delete error');
    })	
}