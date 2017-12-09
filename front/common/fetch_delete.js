export default function fetchDelete(url) {
    return new Promise(function(resolve, reject) {
        fetch(url, {
            method: 'DELETE',
            credentials: 'include'
        }).then((data) => {
            resolve(data)
        }).catch((error) => {
            reject(error)
        });
    });
}