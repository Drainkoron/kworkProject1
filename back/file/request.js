import multer from 'multer' //https://github.com/expressjs/multer

const storage = multer.diskStorage({
	destination: function (req, file, callback) {
        callback(null, __dirname + '/../../static/files')
	},
	filename: function (req, file, callback) {
        console.log(file, 'file')
        callback(null, file.originalname)
	}
})

const upload = multer({ storage: storage }).single('file')



import addFilePg from './add_file'

export async function uploadFile(req, res) {
    await upload(req, res, function (err) {
        if (err) {
            console.log(err, 'error')
            // An error occurred when uploading
            return
        } 

        console.log(req.file, 'file')
        console.log(req.body, 'body')
        
    
        // Everything went fine
    })
	// getTablePg().then((result) => { 
    //     res.send(result);
    // }, (error) => {
    //     res.status(error.status).send(error.message);
    // })
}




//https://github.com/expressjs/multer


