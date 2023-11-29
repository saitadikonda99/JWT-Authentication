import axiosPrivate from '../Api/Axios'
import { useEffect } from 'react';
import useRefresh from './useRefresh';
import useAuth from './useAuth';

const useAxiosPrivate = () => {
    const refresh = useRefresh();
    const { auth } = useAuth();


    useEffect(() => {

          const requestInterceptor = axiosPrivate.interceptors.request.use(
                (config) => {
                    if(!config.headers['Authorization']) {
                        console.log('config.headers:', config.headers)
                        config.headers['Authorization'] =  `Bearer ${auth?.accessToken}`;                   }
                    return config;
                }, error => Promise.reject(error)
            );
        

           const responseInterceptor = axiosPrivate.interceptors.response.
           use(
                response => response,
                async (error) => {
                   const prevRequest = error?.config;
                     if(error?.response?.status === 403 && !prevRequest?.sent) {
                         prevRequest.sent = true;
                         const newToken = await refresh();
                         prevRequest.headers.Authorization = `Bearer ${newToken}`;
                         return axiosPrivate(prevRequest);
                     }
                     return Promise.reject(error);
                }
           );
           return () => {
               axiosPrivate.interceptors.request.eject(requestInterceptor);
               axiosPrivate.interceptors.response.eject(responseInterceptor);
           }

        }, [auth, refresh]);

            return axiosPrivate;
        }

export default useAxiosPrivate;


