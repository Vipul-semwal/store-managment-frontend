import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Navbar, Footer } from '../../component/export';

function Firstlayout() {
    // to not show the layout component
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const currentPath = location.pathname;
        if (currentPath === '/') {
            navigate('/login');
        }

    }, []);

    return (
        <>
            <Navbar />
            <div class="container mt-3 mb-3">
                <div class="d-flex justify-content-center align-items-center vh-80">
                    <div>
                        <Outlet />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Firstlayout;
