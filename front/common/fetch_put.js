export default function fetchPut(url, body) {
    return new Promise(function(resolve, reject) {
        fetch(url, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then((data) => {
            resolve(data)
        }).catch((error) => {
            reject(error)
        });
    });
}