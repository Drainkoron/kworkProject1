import { API } from '../../app_constants'
import fetchPost from '../fetch_post'
import fetchPut from '../fetch_put'
import fetchGet from '../fetch_get'
import fetchDelete from '../fetch_delete'


export function getFileList(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${API}/file/list/`, requestObject).then((response) => {
            if(response.status == 200) {
                response.json().then((data) => {
                    resolve(data)
                });
            } else {
                reject(error);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}


export function deleteFile(id) {
    return new Promise(function(resolve, reject) {
        fetchDelete(`${API}/file/delete/${id}/`).then((response) => {
            if(response.status == 200) {
                response.json().then((data) => {
                    resolve(data)
                });
            } else {
                reject(error);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}

export function getDictionaryList(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${API}/dictionary/list/`, requestObject).then((response) => {
            if(response.status == 200) {
                response.json().then((data) => {
                    resolve(data)
                });
            } else {
                reject(error);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}

export function creatDictionaryElem(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${API}/dictionary/create/`, requestObject).then((response) => {
            if(response.status == 200) {
                response.json().then((data) => {
                    resolve(data)
                });
            } else {
                reject(error);
            }
        }).catch((error) => {
            reject(error);
        });
    })
}

