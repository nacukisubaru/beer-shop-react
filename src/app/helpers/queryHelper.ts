import { host } from "../http/http.request.config";

export interface IQueryBuilder {
    action: string,
    params: any
}

export const queryBuilder = (query:IQueryBuilder, path: string) => {
    let url: string = host + '/' + path;
    if(query.action) {
        url += '/' + query.action + '/';
    }

    if(query.params) {
        url += '?';
    }
    
    for(let inc in  query.params) {
        if(Array.isArray(query.params[inc])) {
            query.params[inc].map((item: string) => {
                url += inc + '[]=' + item + "&";
            });
        } else {
            url += inc + '=' +  query.params[inc] + "&";
        }
    }

    return url.slice(0, -1);
}


export const asyncThunkCallback = async(request = ()=>{}, rejectWithValue: any) => {
    try {
        const response:any = await request();
        // if(response.statusText !== "OK") {
        //     throw new Error('server error!');
        // }

        if(response.data) {
            return response.data;
        }
        return await response.json();
    } catch(error: any) {
        return rejectWithValue(error.message);
    }
}