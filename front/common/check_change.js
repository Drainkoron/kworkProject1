
export default function checkChange(event, store) {
    let item = store.scheme[event.target.name]
    store.form.error = ''
    store.model[item.elem.name] = !item.elem.checked
}