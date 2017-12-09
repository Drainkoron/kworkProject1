export default function dictionaryChange(name, value, store) {
    store.form.error = ''
    store.model[name] = value
}
