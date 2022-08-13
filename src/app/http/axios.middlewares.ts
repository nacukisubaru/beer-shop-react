
import { host } from "./http.request.config";

export const axios = require('axios');

const $api = axios.create({
    baseURL: host,
});

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

$api.interceptors.response.use((config: any) => {
    return config;
},
    async (error:any) => {
        const originalRequest = error.config;
        if(error.response.status == 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true;
            try {
                const response = await axios.get(`${host}/users/refresh`);
                console.log(response);
                localStorage.setItem('accessToken', response.data.accessToken);
                return $api.request(originalRequest);
            } catch (e) {
                console.log('НЕ АВТОРИЗОВАН');
            }
        }
    }
 );

export default $api;
