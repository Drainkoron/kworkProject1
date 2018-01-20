import { URL } from '../../app_constants'
import fetchPost from '../../common/fetch_post'
import fetchPut from '../../common/fetch_put'
import fetchGet from '../../common/fetch_get'
import fetchDelete from '../../common/fetch_delete'

const block = 'staff'

export function addReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/${block}_add/`, requestObject).then((response) => {
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

export function getListReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/${block}_list/`, requestObject).then((response) => {
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

// export function getReq(id) {
//     return new Promise(function(resolve, reject) {
//         fetchGet(`${API}/${block}/${id}/`).then((response) => {
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

// export function editReq(requestObject) {
//     return new Promise(function(resolve, reject) {
//         fetchPut(`${API}/${block}/update/${requestObject.json_data.id}/`, requestObject).then((response) => {
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




// export function deleteReq(id) {
//     return new Promise(function(resolve, reject) {
//         fetchDelete(`${API}/${block}/delete/${id}/`).then((response) => {
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


// export function reportCountReq(field) {
//     return new Promise(function(resolve, reject) {
//         var requestObject = {
//             name_object: 'Staff',
//             name_field: field
//         }
//         fetchPost(`${API}/report_count/`, requestObject).then((response) => {
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

// export function logigStaff(id, object) {
//     return new Promise(function(resolve, reject) {
//         var requestObject = {
//             name_object: 'Staff',
//             id_object: id,
//             json_data: object
//         }
//         fetchPost(`${API}/change_data/`, requestObject).then((response) => {
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

// export function getPayoutInStaffReq(id) {
//     return new Promise(function(resolve, reject) {
//         fetchGet(`${API}/${block}/payout/${id}/`).then((response) => {
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

// export function getReceiveInStaffReq(id, requestObject) {
//     return new Promise(function(resolve, reject) {
//         fetchPost(`${API}/${block}/receive/${id}/`, requestObject).then((response) => {
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



