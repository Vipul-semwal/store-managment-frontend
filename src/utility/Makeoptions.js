export const Makeoptions = (arr, Name) => {
    console.log('make', arr, Name)
    const newarr = []
    arr.forEach(element => {
        let name = element[Name]
        const Newobj = { value: name, label: name }
        newarr.push(Newobj)
    });

    return newarr
}
