
import { host } from "./http.request.config";

export const axios = require('axios');

const $api = axios.create({
    //withCredentials: true,
    baseURL: host,
    // headers: {
    //     "Content-Type": "application/json",
    //         "Access-Control-Allow-Origin": "*",
    // }
});

$api.interceptors.request.use((config: any) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});

$api.interceptors.request.use((config: any) => {
    return config;
},
    async (error:any) => {
        const originalRequest = error.config;
        if(error.response.status == 401) {
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
