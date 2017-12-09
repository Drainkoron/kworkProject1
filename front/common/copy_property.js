export default function copyProperty(toObject, inObject, list) {
    list.forEach(key => {
        toObject[key] = inObject[key]
    })
}