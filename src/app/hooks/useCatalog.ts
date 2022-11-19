import { useEffect, useState } from "react";
import { createList } from "../helpers/arrayHelper";
import { paramsBuilder } from "../helpers/stringHelper";
import { limitPageAdmin } from "../http/http.request.config";
import { beerApi } from "../store/services/beers/beer.api";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

interface IResponse {
    data: any,
    status: number
}

interface IStateResponse {
    status: string,
    response: IResponse
}

export const useCatalog = (api: any, list: 'beer') => {
    const { disableNextPage, setCountRows, setLastPage, setClickFilter, openAdminModalNotFoundByFilter, resetFilters } = useActions();
    const { page, sortField, order, limitPage, filters, reqFilterDisabled, clickFilter } = useAppSelector((state) => state.contentReducer);
    const { data, error, refetch } = api.useGetListQuery({ page, sortField, order, limitPage, filter: paramsBuilder(filters) },
        { skip: reqFilterDisabled }
    );
    const [add] = api.useAddMutation({});
    const [rows, setRows] = useState<any>([]);
    const [isFilterWorking, setFilterWork] = useState(false);
    const [stateResponse, setStateResponse] = useState<IStateResponse>({status:'noRequest', response: {status: 0, data: ''}});

    useEffect(() => {
        if (data && data.rows) {
            setCountRows({ count: data.count });
            setLastPage({ page: data.lastPage });
            setRows(createList(data.rows, list));
            setFilterWork(false);
        }
    }, [data]);

    useEffect(() => {
        if (error) {
            const errorRes: any = error;
            if (errorRes.status === 404) {
                disableNextPage();
            }
            if (errorRes.status === 404 && isFilterWorking) {
                openAdminModalNotFoundByFilter();
                resetFilters();
            }
        }
        setFilterWork(false);
    }, [error, isFilterWorking]);

    //для фильтрации
    useEffect(() => {
        refetch();
        setClickFilter({ isClick: false });
        setFilterWork(true);
    }, [clickFilter]);

    useEffect(() => {
        console.log({stateResponse});
    }, [stateResponse]);

    const addRow = (body:any) => {
        add({...body})
            .unwrap()
            .then((payload: any) => console.log({status: 'fulfilled', response: payload}))
            .catch((error: any) => setStateResponse({status: 'rejected', response: error}));
    }

    const clearStateResponse = () => {
        setStateResponse({status:'noRequest', response: {status: 0, data: ''}});
    }

    return { rows, addRow, stateResponse, clearStateResponse, limitPage: limitPageAdmin }
}