export const setValStorage = (key: string, data: any) => {
    localStorage.setItem(key, data);
}

export const setObjStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
}

export const getValStorage = (key: string) => {
    return localStorage.getItem(key);
}

export const getObjStorage = (key: string) => {
    const data:any = localStorage.getItem(key);
    return JSON.parse(data);
}