import { Children, lazy } from "react";
import Loadable from "../component/Global/Loadable";
import { Firstlayout } from "../layouts/export";

// lazy loading components
const AuthLogin = Loadable(lazy(() => import('../Pages/SignIn/SignIn')));
const AuthRegister = Loadable(lazy(() => import('../Pages/Signup/SignUp')));

const AuthRoutes = {
    path: '/',
    element: <Firstlayout />,
    children: [
        {
            path: 'login',
            element: <AuthLogin />
        },
        {
            path: 'register',
            element: <AuthRegister />
        }
    ]
}

export default AuthRoutes