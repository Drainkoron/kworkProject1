export default function changeDate(date, store, name) {
    let item = store.scheme[event.target.name]
    date.set('second', 0)
    store.form.error = ''
    store.model[name] = date.utc().format()
}