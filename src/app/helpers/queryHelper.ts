import { host } from "../store/services/api.config";

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