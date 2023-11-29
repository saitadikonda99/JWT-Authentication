import { useLocation, Navigate, Outlet } from 'react-router-dom'

import useAuth from '../../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth()
    const location = useLocation()
    const isLoggedIn = sessionStorage.getItem('role')
    
    return (
        <>
             { auth?.role?.find(role => allowedRoles?.includes(role))
               || (allowedRoles.includes(isLoggedIn)) ?(
                <Outlet />
            ) : (
                <Navigate
                    to="/login"
                    replace
                    state={{ from: location.pathname }}
                />
            )}
        </>
    )
}


export default RequireAuth;