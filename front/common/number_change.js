export default function numberChange(name, value, store) {
    // console.log(value)
    // var newValue = ''
    // if(typeof value == 'string') {
    //     newValue = value.replace(/\D/g, "")
    // } else {
    //     if(value == undefined) {
    //         newValue = ''
    //     } else {
    //         newValue = value
    //     }
    // }
    store.form.error = ''
    store.model[name] = value
}