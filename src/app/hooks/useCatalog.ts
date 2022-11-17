import { useEffect, useState } from "react";
import { createList } from "../helpers/arrayHelper";
import { paramsBuilder } from "../helpers/stringHelper";
import { limitPageAdmin } from "../http/http.request.config";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

export const useCatalog = (api: any, list: 'beer') => {
    const { disableNextPage, setCountRows, setLastPage, setClickFilter, openAdminModalNotFoundByFilter, resetFilters } = useActions();
    const { page, sortField, order, limitPage, filters, reqFilterDisabled, clickFilter } = useAppSelector((state) => state.contentReducer);
    const { data, error, refetch } = api.useGetListQuery({page, sortField, order, limitPage, filter: paramsBuilder(filters)}, 
        {skip: reqFilterDisabled}
    );
    const [rows, setRows] = useState<any>([]);
    const [isFilterWorking, setFilterWork] = useState(false);

    useEffect(() => {
        if (data && data.rows) {
            setCountRows({count: data.count});
            setLastPage({page: data.lastPage});
            setRows(createList(data.rows, list));
            setFilterWork(false);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            const errorRes: any = error;
            if(errorRes.status === 404) {
                disableNextPage();
            }
            if(errorRes.status === 404 && isFilterWorking) {
                openAdminModalNotFoundByFilter();
                resetFilters();
            }
        }
        setFilterWork(false);
    }, [error, isFilterWorking]);

    //для фильтрации
    useEffect(() => {
        refetch();
        setClickFilter({isClick: false});
        setFilterWork(true);
    }, [clickFilter]);
    
    return {rows, limitPage: limitPageAdmin}
}