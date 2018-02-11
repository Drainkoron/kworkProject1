import { API } from '../../app_constants'
import fetchPost from '../../common/fetch_post'
import fetchPut from '../../common/fetch_put'
import fetchGet from '../../common/fetch_get'
import fetchDelete from '../../common/fetch_delete'

const block = 'order'

export function addReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${API}/${block}/create/`, requestObject).then((response) => {
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

export function getReq(id) {
    return new Promise(function(resolve, reject) {
        fetchGet(`${API}/${block}/${id}/`).then((response) => {
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

export function editReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPut(`${API}/${block}/update/${requestObject.json_data.id}/`, requestObject).then((response) => {
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

export function getListReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${API}/${block}/list/`, requestObject).then((response) => {
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


export function deleteReq(id) {
    return new Promise(function(resolve, reject) {
        fetchDelete(`${API}/${block}/delete/${id}/`).then((response) => {
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


// export function reportCountReq(field) {
//     return new Promise(function(resolve, reject) {
//         var requestObject = {
//             name_object: 'Customer',
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

export function logicOrder(id, object) {
    return new Promise(function(resolve, reject) {
        var requestObject = {
            name_object: 'Order',
            id_object: id,
            json_data: object
        }
        fetchPost(`${API}/change_data/`, requestObject).then((response) => {
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

export function getStaffFreeReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${API}/staff/free/`, requestObject).then((response) => {
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

export function addStaffInOrderReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${API}/interval/create/`, requestObject).then((response) => {
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

export function getStaffinOrderReq(id) {
    return new Promise(function(resolve, reject) {
        fetchGet(`${API}/staff/order/${id}/`).then((response) => {
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

export function deleteStaffInOrderReq(object) {
    return new Promise(function(resolve, reject) {
        fetchDelete(`${API}/interval/delete/${object.interval}/${object.order}/`).then((response) => {
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

export function getOrderActReq(id) {
    return new Promise(function(resolve, reject) {
        fetchGet(`${API}/order/act/${id}/`).then((response) => {
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

export function getPayoutActReq(id) {
    return new Promise(function(resolve, reject) {
        fetchGet(`${API}/order/payout/${id}/`).then((response) => {
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

export function getTableInOrderReq(id) {
    return new Promise(function(resolve, reject) {
        fetchGet(`${API}/order/table/${id}/`).then((response) => {
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

export function getJobsInTableReq(id) {
    return new Promise(function(resolve, reject) {
        fetchGet(`${API}/table/job/${id}/`).then((response) => {
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

export function generateTabeleReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${API}/xls_generate/payout/`, requestObject).then((response) => {
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

export function createJobReq(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${API}/job/create/`, requestObject).then((response) => {
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


// export function getStaffReq(id) {
//     return new Promise(function(resolve, reject) {
//         fetchGet(`${API}/order/table/${id}/`).then((response) => {
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


// GET /api/v1/staff/{pk}/
