import { useEffect, useState } from "react";
import { createList } from "../helpers/arrayHelper";
import { paramsBuilder } from "../helpers/stringHelper";
import { limitPageAdmin } from "../http/http.request.config";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

export const useCatalog = (api: any, list: 'beer') => {
    const { disableNextPage, setCountRows, setLastPage } = useActions();
    const { page, sortField, order, limitPage, filters, reqFilterDisabled } = useAppSelector((state) => state.contentReducer);
    const { data, error } = api.useGetListQuery({page, sortField, order, limitPage, filter: paramsBuilder(filters)}, 
        {skip: reqFilterDisabled}
    );
    const [rows, setRows] = useState<any>([]);
    
    useEffect(() => {
        if (data && data.rows) {
            setCountRows({count: data.count});
            setLastPage({page: data.lastPage});
            setRows(createList(data.rows, list));
        }
    }, [data]);


    useEffect(() => {
        if (error) {
            const errorRes: any = error;
            if(errorRes.status === 404) {
                disableNextPage();
            }
        }
    }, [error]);

    return {rows, limitPage: limitPageAdmin}
}