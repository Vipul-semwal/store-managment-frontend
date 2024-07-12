import { ToastContainer, toast } from 'react-toastify';
import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';

const useformreq = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const makeRequest = async (apiFunction, redirectUrl, values, extraFn) => {
        setLoading(true)
        const result = await apiFunction(values)
        if (!result) {
            toast.error("something went wrong")
            setLoading(false)
            return
        }
        if (result.data.success === true) {
            if (redirectUrl) {
                navigate(redirectUrl)
            }
            console.log("useformik", extraFn)
            if (extraFn) {
                extraFn()
            }
            toast.success(result.data.message)

        }
        else {
            console.log('respone', result)
            toast.error(result.data.message)
        }
        if (!result) {
            console.log('null', result)
            toast.error('somethig went wrong')
        }

        setLoading(false)
    }


    return { loading, makeRequest };
};




export default useformreq;
