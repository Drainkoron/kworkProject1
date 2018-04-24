import { URL } from '../../app_constants'
import fetchPost from '../fetch_post'
import fetchPut from '../fetch_put'
import fetchGet from '../fetch_get'
import fetchDelete from '../fetch_delete'


export function getDictionaryList(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/get_dictionary/`, requestObject).then((response) => {
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

export function creatDictionaryElem(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/add_dictionary_elem/`, requestObject).then((response) => {
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


export function getFileList(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/list_file/`, requestObject).then((response) => {
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


export function deleteFile(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/delete_file/`, requestObject).then((response) => {
            if(response.status == 200) {
                response.text().then((data) => {
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


export function userList() {
    return new Promise(function(resolve, reject) {
        fetchGet(`${URL}/user_list`).then((response) => {
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


export function getBlockSelectList(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/${requestObject.block}_select`, requestObject).then((response) => {
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













