import { useLocation, Navigate, Outlet } from 'react-router-dom'
import useAuth from '../../hooks/useAuth'

const RequireAuth = ({ allowedRoles }) => {
    const { auth } = useAuth()
    const location = useLocation()
    
    return (
        <>
             { auth?.role?.some(role => allowedRoles?.includes(role)) ?(
                <Outlet />
            ) : auth?.role ? (
                <Navigate to="/unAuth" state={{ from: location.pathname }} replace={true} />
            ) : (
                <Navigate to="/login" state={{ from: location.pathname }} replace={true} />
            )
            }
        </>
    )
}


export default RequireAuth;