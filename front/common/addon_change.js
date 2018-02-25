export default function addonChange(name, value, store) {
    store.form.error = ''
    store.model[name] = value
}
