import { URL } from '../../app_constants'
import fetchPost from '../../common/fetch_post'
import fetchPut from '../../common/fetch_put'
import fetchGet from '../../common/fetch_get'
import fetchDelete from '../../common/fetch_delete'

export function authUserReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/auth_user`, requestObject).then((response) => {
            if(response.status == 200) {
                response.json().then((data) => {
                    resolve(data)
                })
            } else {
                response.text().then((data) => {
                    reject(data)
                })
            }
        }).catch((error) => {
            reject(error)
        });
    })
}

export function viewUserReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchGet(`${URL}/view_user`).then((response) => {
            if(response.status == 200) {
                response.json().then((data) => {
                    resolve(data)
                });
            } else {
                response.text().then((data) => {
                    reject(data)
                })
            }
        }).catch((error) => {
            reject(error)
        });
    })
}