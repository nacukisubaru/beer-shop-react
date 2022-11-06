import { useEffect, useState } from "react";
import { createList } from "../helpers/arrayHelper";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

export const useCatalog = (api: any, list: 'beer') => {
    const { disableNextPage } = useActions();
    const { page, maxPage } = useAppSelector((state) => state.contentReducer);
    const { data, error, refetch } = api.useGetListQuery(page);
    const [rows, setRows] = useState([]);
        
    useEffect(() => {
        if (data && data.rows) {
            const rowsList:any = [
                ...createList(data.rows, list),
                ...rows,
            ];
            setRows(rowsList);
        }
    }, [data]);

    useEffect(() => {
        if (page > maxPage) {
            refetch();
        }
    }, [page]);

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