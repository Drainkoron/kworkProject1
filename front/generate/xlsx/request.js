import { URL } from '../../app_constants'
import fetchPost from '../../common/fetch_post'


export function generateExcel(requestObject) {
    return new Promise(function(resolve, reject) {
        fetchPost(`${URL}/generate_excel`, requestObject).then((response) => {
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