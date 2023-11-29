import React, { useEffect, useState } from 'react'
import useRefresh from '../hooks/useRefresh';
import axiosPrivate from '../hooks/useAxiosPrivate'
import './css/User.css'


function User() {
    const [data, setData] = useState({});
    const refresh = useRefresh();
    const axios = axiosPrivate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await axios.get('http://localhost:3001/profile', {  
              withCredentials: true,
            });
            if (response.status === 200) {
              setData(response.data);
            }
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []); 

  return (
    <div className="UserComponent">
        <div className="UserComponent-in">
            <h1>User</h1>
            <p>Username : {data.name}</p>
            <p>Age : {data.age}</p>
            <button onClick={()=>refresh()} >Refresh</button>
        </div>
    </div>
  )
}

export default User