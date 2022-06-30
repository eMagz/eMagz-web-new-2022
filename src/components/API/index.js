
import axios from 'axios';
export  const BaseUrl = 'http://api.emagz.live/v1.0';
export  const ImageUrl = 'http://api.emagz.live/assets/userimage/';
export const api = axios.create({
    baseURL: 'http://api.emagz.live/v1.0',
});

api.interceptors.request.use(
    (config) => {
        console.log("config",config)
        let token = localStorage.getItem('token');
        if (token) {
            config.headers['x-access-token']=`${token}`;
        } else {
            delete api.defaults.headers;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



















