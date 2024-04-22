import axios from "axios";
import { Cookies } from "react-cookie";
import useTokenRefresh from '../hooks/useTokenRefresh';

const instance = axios.create({
  baseURL: `${import.meta.env.VITE_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

instance.interceptors.request.use(
  (config) => {
    const cookies = new Cookies(["accessToken"]);
    const accessToken = cookies.get("accessToken");

    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 토큰 만료 에러 시 받는 에러 처리 할 것
    if (error.response && error.response.status === 401) {
      const cookies = new Cookies(['refreshToken']);
      const refreshToken = cookies.get('refreshToken');
      useTokenRefresh(refreshToken)
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
export default instance;
