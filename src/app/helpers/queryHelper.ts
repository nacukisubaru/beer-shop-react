import axios from "axios";
import $api from "../http/axios.middlewares";
import { host } from "../http/http.request.config";

export interface IQueryBuilder {
    action: string,
    params: any
}

export const queryBuilder = (path: string, params: any) => {
    let url: string = host + path;
    if (params) {
        url += '?';
    }

    for (let inc in params) {
        if (Array.isArray(params[inc])) {
            params[inc].map((item: string) => {
                url += inc + '[]=' + item + "&";
            });
        } else {
            url += inc + '=' + params[inc] + "&";
        }
    }

    return url.slice(0, -1);
}


export const thunkAxiosPost = async (path = "", params = {}, isApi = false, rejectWithValue: any) => {
    let request = axios;
    if (isApi) {
        request = $api;
    }

    try {
        const response = await request.post(path, params);
        console.log(response);
        if (!response || !response.data) {
            throw new Error('error');
        }

        return response.data;
    } catch (error: any) {
        console.log(error);
        return rejectWithValue(error);
    }
}

export const thunkAxiosGet = async (path = "", params = {}, isApi = false, rejectWithValue: any) => {
    const url = queryBuilder(path, params);
    let request = axios;
    if (isApi) {
        request = $api;
    }

    try {

        const response = await request.get(url);
        if (!response || !response.data) {
            throw new Error('error');
        }
        return response.data;
    } catch (error: any) {
        return rejectWithValue(error.response.data);
    }
}