import { useState } from "react"



export const useFilterSerch = () => {
    const [Result, SetResult] = useState([])
    const findSame = (name, arr) => {
        console.log("innnn", arr)

        SetResult([])
        if (name) {
            arr.forEach(element => {
                let Name = name.toUpperCase()
                console.log("uppercawe", Name)
                if (element.Name.slice(0, name.length) === Name) {
                    SetResult((prev) => {
                        return [...prev, element.Name]
                    })
                }
            });
        }
    }

    // console.log('rsinside', Result)
    return { findSame, Result }

} 