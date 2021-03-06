import { URL } from '../../app_constants'
import fetchPost from '../../common/fetch_post'


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

export function getCalcList(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/generate_calc/`, requestObject).then((response) => {
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

export function getSampleList(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/generate_sample/`, requestObject).then((response) => {
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