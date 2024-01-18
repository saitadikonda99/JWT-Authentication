import axiosPrivate from '../Api/Axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();
    
     
    const logout = async () => {

        setAuth({})
        try {
            const response = await axiosPrivate.get('/logout');
    
            console.log(response.status);
            window.location.href = '/login';
   
    } catch (error) {
        alert('login first')
        console.error('Error logging out:', error.message);
     }
    }   

    return logout;
}

export default useLogout;