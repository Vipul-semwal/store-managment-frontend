import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';



const useFetchdata = () => {
    const [loading, SetLoading] = useState(false)
    const [res, Setres] = useState([])
    const [Message, SetMessage] = useState(null)


    const MakeApiReq = async (api, query, ShouldAppend) => {
        SetLoading(true)
        const result = await api(query)

        if (result === null) {
            toast.error('error fetching data')
            SetLoading(false)
            return
        }
        if (result?.status === 200) {
            // if append true then whatever data got from db join that with previous data else just simple setdata
            if (ShouldAppend) {
                if (result.data.data[0] !== undefined) {
                    console.log('up',)
                    Setres((prev) => {
                        return (
                            [...prev, ...result.data.data]
                        )
                    })
                }

                else {
                    SetMessage('no more data')
                    return
                }

            }
            else {
                if (result.data.data[0] === undefined) {
                    Setres(result.data.data)
                    SetMessage('no result')
                }
                else {
                    SetMessage(null)
                    Setres(result.data.data)
                }
            }
            SetLoading(false)
            // toast.success('hora han')
            // console.log(result.data.data)
        }
        else {
            toast.error(result.data.message)
            SetLoading(false)
        }
    }


    return { loading, res, MakeApiReq, Message }

}


export default useFetchdata