export default function getCourse(name, base, store) {
    fetch(`https://api.ratesapi.io/api/latest?base=${base}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true,
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE',
            'Content-Type': 'application/json'
        },
    }).then((data) => {
        resolve(store.model[name] = data.RUB)
        //store.form.error = ''
    }).catch((error) => {
        reject(error)
    });
}