
import { Link } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import { IoClose } from 'react-icons/io5';
import { Outlet } from 'react-router-dom';
import './DashboardLayout.css'
import { Sidebar } from '../../component/export';
import { useEffect, useState } from 'react';
import dataApi from '../../Api/DataApi';
import auth from '../../Api/Authentication'
import { toast } from 'react-toastify';
import { createContext } from 'react';
import Cookies from 'js-cookie';
import { useNavigate, useLocation } from 'react-router-dom';

const DashboardContext = createContext(null)

const DashboardLayout = () => {
    const [Data, SetData] = useState([])
    const [Reload, SetReload] = useState(true)
    const [Loading, SetLoading] = useState(false)
    const [isFresh, SetIsfresh] = useState(0)
    const [isLogedIn, SetIslogedIn] = useState(false)
    const navigate = useNavigate()
    const location = useLocation();

    const reloadFunction = () => {
        SetReload(!Reload)
    }

    //    verify jwt

    useEffect(() => {
        (async () => {
            SetLoading(true)
            const result = await auth.AuthCheck()

            if (result === null) {
                navigate('/login')
                toast.error("can't accsess route right now!")
            }
            // console.log('hook', result)
            if (result?.status === 200) {
                (async () => {
                    if (isFresh !== 2) {
                        SetLoading(true)
                    }
                    const result = await dataApi.GetUserData()

                    if (result === null) {
                        toast.error('error fetching data')
                        SetLoading(false)
                        return
                    }
                    // console.log('hook', result)
                    if (result?.status === 200) {
                        SetData(result.data.Data)
                        SetLoading(false)
                    }
                    else {
                        toast.error('error fetching data please try again')
                        SetLoading(false)
                    }
                }

                )()
                if (isFresh !== 2) {
                    SetIsfresh((prev) => {
                        return prev + 1
                    })
                }
            }
            else {
                navigate('/login')
                toast.error(result?.data?.message)
            }
        }

        )()
    }, [Reload])

    // to redirect to hom dashboard
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/dashboard') {
            navigate('/dashboard/home');
        }

    }, []);

    if (Loading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'red' }}>Loading...</div>
        )
    }
    return (
        <DashboardContext.Provider value={{ Data, reloadFunction, }}>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <Sidebar />
                    <div className="col py-3 w-70">
                        <Outlet />
                    </div>
                </div>
            </div>
        </DashboardContext.Provider>
    );
};

export { DashboardLayout, DashboardContext };
