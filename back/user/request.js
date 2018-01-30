import jwt from 'jsonwebtoken'
import addUserPg from './add_user'
import viewUserPg from './view_user'
import authUserPg from './auth_user'
import addDemoUserPg from './add_demo'

export function addUser(req, res) {
	addUserPg().then((result) => { 
        res.send(result);
    }, (error) => {
        res.status(error.status).send(error.message);
    })
}

export function addDemoUser(req, res) {
	addDemoUserPg().then((result) => { 
        res.send(result);
    }, (error) => {
        res.status(error.status).send(error.message);
    })
}

export function viewUser(req, res) {
    if('token' in req.cookies) {
        if(req.cookies.token) {
            viewUserPg(req).then((result) => {
                res.send(result);
            }, (error) => {
                res.status(error.status).send(error.message);
            })
        } else {
            res.send(false);
        }
    } else {
        res.send(false);
    }
}

export function authUser(req, res) {
	authUserPg(req.body).then((result) => { 
        const token = jwt.sign({ login: result.doc.login, 
                                    password: result.doc.password }, req.get('User-Agent'))
        
        res.cookie('token', token, {maxAge: req.body.remember ? 1209600000 : 21600000})
        res.send(result.doc)
    }, (error) => {
        res.status(error.status).send(error.message)
    })
}

export function logout(req, res) {
    res.clearCookie('token')
    res.send(true)
}


