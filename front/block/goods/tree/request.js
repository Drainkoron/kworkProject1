import { URL } from '../../../app_constants'
import fetchPost from '../../../common/fetch_post'
import fetchPut from '../../../common/fetch_put'
import fetchGet from '../../../common/fetch_get'
import fetchDelete from '../../../common/fetch_delete'

const block = 'tree'

export function getTreeReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/${block}_get`, requestObject).then((response) => {
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

export function updateTreeReq(requestObject) {
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

export function getGoodsCategoryReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/get_goods_category`, requestObject).then((response) => {
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

export function transferCategoryReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/goods_transfer_category`, requestObject).then((response) => {
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

// export function addReq(requestObject) {
//     return new Promise(function(resolve, reject) {
//         fetchPost(`${URL}/${block}_add`, requestObject).then((response) => {
//             if(response.status == 200) {
//                 response.json().then((data) => {
//                     resolve(data)
//                 })
//             } else {
//                 response.text().then((data) => {
//                     reject(data)
//                 })
//             }
//         }).catch((error) => {
//             reject(error);
//         });
//     })
// }

// export function editReq(requestObject) {
//     return new Promise(function(resolve, reject) {
//         fetchPost(`${URL}/${block}_edit`, requestObject).then((response) => {
//             if(response.status == 200) {
//                 response.json().then((data) => {
//                     resolve(data)
//                 })
//             } else {
//                 response.text().then((data) => {
//                     reject(data)
//                 })
//             }
//         }).catch((error) => {
//             reject(error);
//         });
//     })
// }