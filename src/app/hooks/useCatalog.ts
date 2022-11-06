import { useEffect, useState } from "react";
import { createList } from "../helpers/arrayHelper";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

export const useCatalog = (api: any, list: 'beer') => {
    const { disableNextPage } = useActions();
    const { page, sortField, order } = useAppSelector((state) => state.contentReducer);
    const { data, error, refetch } = api.useGetListQuery({page, sortField, order, limitPage: 5});
    const [rows, setRows] = useState<any>([]);
        
    useEffect(() => {
        if (data && data.rows) {
            setRows(createList(data.rows, list));
        }
    }, [data]);

    useEffect(() => {
        refetch();
    }, [page, sortField, order]);

    useEffect(() => {
        if (error) {
            const errorRes: any = error;
            if(errorRes.status === 404) {
                disableNextPage();
            }
        }
    }, [error]);

    return {rows}
}