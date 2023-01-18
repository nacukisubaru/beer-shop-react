import { hostAdminPanel } from "../http/http.request.config";
import axios from "axios";
import { unwrapRes } from "./stringHelper";

export const cmsQueryExecute = async (query: string) => {
    try {
        let result: any = await axios.get(`${hostAdminPanel}${query}`);
        result = unwrapRes(result);
        if(Array.isArray(result) && result.length) {
            const data = result.map((item: any) => {
                return cmsBuildStructure(item);
            });

            return data;
        } else {
            return cmsBuildStructure(result);
        }
    } catch (e) {
        return false;
    }
}

export const cmsBuildStructure = (result: any) => {
    if(result && result.attributes) {
        const attributes = result.attributes;
        attributes.id = result.id;
        for(let atrInc in attributes) {
        const attrs:any = attributes[atrInc];
            if (attrs.data) {
                if (attrs.data !== null) {
                    let nestedFields = attrs.data;
                    //Обработка структуры файлов
                    const filesRes = cmsBuildFilesArrayMultipleOrSingle(nestedFields);
                    if(filesRes.length) {
                        attributes[atrInc].data = filesRes;
                    }
                } else {
                    attrs.data = [];
                }
            }
        }

        return attributes;
    }
}

export const cmsBuildFilesArray = (filesObj: any) => {
    const filesList: any[] = [];
    const filesArray = Object.values(filesObj);
    filesArray.map((item: any) => {
        if(item.attributes.ext) {
            item.attributes.id = item.id;
            item.attributes.url = `${hostAdminPanel}${item.attributes.url}`;
            filesList.push(item.attributes);
        }
    });

    return filesList;
}

const cmsBuildFilesArrayMultipleOrSingle = (filesArray:any) => {
    let result: any[] = [];
    if(Array.isArray(filesArray)) {
        result = cmsBuildFilesArray(filesArray);
    } else {
        result = cmsBuildFilesArray([filesArray]);
    }

    return result;
}