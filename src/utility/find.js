export default function (id, obj) {

    if (!id) {
        return null
    }
    let data = null
    obj.forEach(element => {
        if (element._id === id) {
            data = element
            return
        }
    });
    return data
}