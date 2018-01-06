import { URL } from '../../app_constants'
import fetchPost from '../../common/fetch_post'
import fetchPut from '../../common/fetch_put'
import fetchGet from '../../common/fetch_get'
import fetchDelete from '../../common/fetch_delete'

export function getTableReq() {
    return new Promise(function(resolve, reject) {
        fetchGet(`${URL}/get_table`).then((response) => {
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


export function createTableReq(name) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/create_table`, name).then((response) => {
            if(response.status == 200) {
                response.text().then((data) => {
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

export function dropTableReq(name) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/drop_table`, name).then((response) => {
            if(response.status == 200) {
                response.text().then((data) => {
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




