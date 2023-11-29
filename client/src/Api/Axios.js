import axios from 'axios'
const baseURL = 'http://localhost:3001'


export const Axios = axios.create({
    baseURL: baseURL,
})

const axiosPrivate = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

export default axiosPrivate;
