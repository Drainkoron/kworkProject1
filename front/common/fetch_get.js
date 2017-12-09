export default function fetchGet(url) {
    return new Promise(function(resolve, reject) {
        fetch(url, {
            method: 'GET',
            credentials: 'include'
        }).then((data) => {
            resolve(data)
        }).catch((error) => {
            reject(error)
        });
    });
}