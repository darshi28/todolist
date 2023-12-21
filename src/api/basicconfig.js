import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { getRefreshToken, setJwtToken} from './../Service/localStorageService';

const instance = axios.create({
  baseURL: 'http://127.0.0.1:5000/',
});
// const localStorageService = LocalStorageService;


  instance.interceptors.request.use(request => {
    console.log("req", request)
    const token = localStorage.getItem('jwt')
    // const token = "test local";
    if (token && request.url != '/access-tokens/refresh') {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  },
    error => {
      console.log(error);
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(async (response) => {
    console.log('called response');

    return response;
  }, async (error) => {
    const originalRequest = error.config;
    // const navigate = useNavigate();
    console.log('called error');
    const refreshToken = getRefreshToken();
    if (error.response.status === 401) {
      if (!refreshToken || originalRequest._retry) {
        // navigate("/LoginForm");
        return Promise.reject(error);
      }
      
      let response = await instance.post('/access-tokens/refresh', {
        refresh_token: refreshToken
      }, { _retry : true });
      setJwtToken(response.data['jwt']);
      
      originalRequest._retry = true;
      return instance.request(originalRequest);
    }
    if (error.response.status === 400) {
      alert("Bad request");
    }
    return Promise.reject(error);
  });
export default instance;