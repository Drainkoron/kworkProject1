import { URL } from '../../../app_constants'
import fetchPost from '../../../common/fetch_post'
import fetchPut from '../../../common/fetch_put'
import fetchGet from '../../../common/fetch_get'
import fetchDelete from '../../../common/fetch_delete'

const block = 'goods_supplier'

export function addReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/${block}_add`, requestObject).then((response) => {
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
            reject(error);
        });
    })
}

export function editReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/${block}_edit`, requestObject).then((response) => {
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
            reject(error);
        });
    })
}

export function supplierGetParamsReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/supplier_get_params`, requestObject).then((response) => {
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
            reject(error);
        });
    })
}