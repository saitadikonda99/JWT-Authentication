import axios from 'axios'
import useAuth from './useAuth'

const useRefresh = () => {
    const { setAuth } = useAuth()


    const refresh = async () => {
        const response = await axios.get('http://localhost:3001/refresh', {
            withCredentials: true
        });
        
        setAuth( (prev) => {
        
            return {
                ...prev,
                id : response.data.id,
                role : response.data.role,
                user : response.data.username,
                accessToken: response.data.accessToken
            }
        })

        console.log(response.data)

        return response.data.accessToken
    }
    
  return refresh;
}

export default useRefresh