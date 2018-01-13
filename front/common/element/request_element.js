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
    console.log(requestObject)
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/add_dictionary_elem/`, requestObject).then((response) => {
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


// export function getFileList(requestObject) {
//     return new Promise(function(resolve, reject) {
//         fetchPost(`${API}/file/list/`, requestObject).then((response) => {
//             if(response.status == 200) {
//                 response.json().then((data) => {
//                     resolve(data)
//                 });
//             } else {
//                 reject(error);
//             }
//         }).catch((error) => {
//             reject(error);
//         });
//     })
// }


// export function deleteFile(id) {
//     return new Promise(function(resolve, reject) {
//         fetchDelete(`${API}/file/delete/${id}/`).then((response) => {
//             if(response.status == 200) {
//                 response.json().then((data) => {
//                     resolve(data)
//                 });
//             } else {
//                 reject(error);
//             }
//         }).catch((error) => {
//             reject(error);
//         });
//     })
// }





