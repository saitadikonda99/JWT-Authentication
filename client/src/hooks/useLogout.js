import axios from 'axios';
import useAuth from './useAuth';

const useLogout = () => {
    const { setAuth } = useAuth();
     
    const logout = async () => {

        setAuth({})
        try {
            const response = await axios.get('http://localhost:3001/logout', { 
                headers: {
                    'Content-Type': 'application/json',
            },
                credentials : 'include',
                withCredentials: true,  
                })
    
                console.log(response.status);
                sessionStorage.removeItem('role');
                window.location.href = '/login';
   
    } catch (error) {
        alert('login first')
        console.error('Error logging out:', error.message);
     }
    }   

    return logout;
}

export default useLogout;