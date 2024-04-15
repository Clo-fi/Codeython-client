import axios from 'axios';
import { Cookies } from 'react-cookie';

const instance = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
})

instance.interceptors.request.use(
  (config) => {
    const cookies = new Cookies(['accessToken']);
    const accessToken = cookies.get('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
)

export default instance;