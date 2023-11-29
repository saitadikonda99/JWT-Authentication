import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefresh from "../../hooks/useRefresh";
import useAuth from '../../hooks/useAuth'

const PersistLogin = () => {
    const [loading, setLoading] = useState(true);
    const refresh = useRefresh();
    const { auth }  = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        console.log('auth:', auth)
        !auth?.accessToken ? verifyRefreshToken() :  setLoading(false);
    }, []);  

    if (loading) {
        return <div>Loading...</div>;
    }

    return <Outlet />;
}

export default PersistLogin