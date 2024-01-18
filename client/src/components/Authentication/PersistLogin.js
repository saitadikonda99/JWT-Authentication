import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useAuth from '../../hooks/useAuth'

import useRefresh from '../../hooks/useRefresh'


const PersistLogin = () => {
    const [loading, setLoading] = useState(true);
    const refresh = useRefresh();
    const { auth }  = useAuth();


    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh()
            } catch (error) {
                console.error("Error fetching data:", error.message);
            } finally {
                setLoading(false);
            }
        };

        !auth?.accessToken ? verifyRefreshToken() :  setLoading(false);
       
    }, []);  

   
    if (loading) {
        return <div className='PeristLogin'>
                    <h1>Loading...</h1>
               </div>;
             }
    return <Outlet />;
}

export default PersistLogin