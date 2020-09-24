export default function setCourse(name, base, store) {
    fetch(`https://api.ratesapi.io/api/latest?base=${base}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then((data) => {
        resolve(store.model[name] = data.RUB)
        //store.form.error = ''
    }).catch((error) => {
        reject(error)
    });
}