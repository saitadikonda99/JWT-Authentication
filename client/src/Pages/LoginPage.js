import React, { useEffect } from 'react'
import { useState,  } from 'react'
import { useLocation, Navigate, Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useAuth from '../hooks/useAuth';
import './css/Login.css'

function LoginPage() {

    const { setAuth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from || "/";

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      });
    
    const [error, setError] = useState(null);
    
    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
        ...formData,
        [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post('http://localhost:3001/login',
              JSON.stringify(formData),
              {
                headers: {
                  'Content-Type': 'application/json',
                },
                withCredentials: true,
              }
            );


            const accessToken = response?.data?.accessToken;
            const refreshToken = response?.data?.refreshToken;
            const role = response?.data?.role;
            const user = response?.data?.username;
            const password = response?.data?.password;
           
            setAuth({ user, role, password, accessToken, refreshToken });
            sessionStorage.setItem('role', role);
           
            console.log(response.data);
            if (response.status === 200) {
                navigate(from, { replace: true });
            }
        } catch (error) { 
            console.log(error);
            setError(error.message);
        }
    };

 

  return (
     <div className="LoginComponent">
        <div className="LoginComponent-in">
            <h1>Login Here</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                />
                <input 
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Password"
                />
                <button>Submit</button>
            </form>
        </div>
        {error && (
            <div style={{ color: 'red' }}>
                Error: {error}
            </div>
        )}
     </div>
  )}
export default LoginPage