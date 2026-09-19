import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'https://simpleapi-backend.onrender.com/api/',
    headers: {
        'Content-Type': 'application/json'
    }
});
