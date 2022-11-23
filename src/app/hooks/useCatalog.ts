import { useEffect, useState } from "react";
import { createList } from "../helpers/arrayHelper";
import { paramsBuilder } from "../helpers/stringHelper";
import { limitPageAdmin } from "../http/http.request.config";
import { useActions } from "./useActions";
import { useAppSelector } from "./useAppSelector";

interface IResponse {
    data: any,
    status: number
}

export interface IStateResponse {
    status: string,
    response: IResponse
}

export const useCatalog = (api: any, list?: string) => {
    const { disableNextPage, setCountRows, setLastPage, setClickFilter, openAdminModalNotFoundByFilter, resetFilters } = useActions();
    const { page, sortField, order, limitPage, filters, reqFilterDisabled, clickFilter } = useAppSelector((state) => state.contentReducer);
    const { data, error, refetch } = api.useGetListQuery({ page, sortField, order, limitPage, filter: paramsBuilder(filters) },
        { skip: reqFilterDisabled }
    );
    const [add] = api.useAddMutation();
    const [upd] = api.useUpdateMutation();
    const [rows, setRows] = useState<any[]>([]);
    const [isFilterWorking, setFilterWork] = useState<boolean>(false);
    const [stateResponse, setStateResponse] = useState<IStateResponse>({ status: 'noRequest', response: { status: 0, data: '' } });

    useEffect(() => {
        if (data && data.rows) {
            setCountRows({ count: data.count });
            setLastPage({ page: data.lastPage });
            if(list) {
                setRows(createList(data.rows, list));     
            } else {
                setRows(data.rows);
            }
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


    const addRow = async (body: any, isObject = false): Promise<IStateResponse> => {
        let response: any = { status: 'noRequest', response: { status: 0, data: '' } };
        let bodyData = body;
        if (isObject) {
            bodyData = { ...body };
        }
        
        await add(bodyData)
            .unwrap()
            .then((payload: any) => { response = { status: 'fulfilled', response: payload } })
            .catch((error: any) => { response = { status: 'rejected', response: error } });

        setStateResponse(response);
        return response;
    }

    const updRow = async (body: any, isObject = false): Promise<IStateResponse> => {
        let response: any = { status: 'noRequest', response: { status: 0, data: '' } };
        let bodyData = body;
        if (isObject) {
            bodyData = { ...body };
        }
        
        await upd(bodyData)
            .unwrap()
            .then((payload: any) => { response = { status: 'fulfilled', response: payload } })
            .catch((error: any) => { response = { status: 'rejected', response: error } });

        setStateResponse(response);
        return response;
    }

    const clearStateResponse = () => {
        setStateResponse({ status: 'noRequest', response: { status: 0, data: '' } });
    }

    return { rows, addRow, updRow, stateResponse, clearStateResponse, limitPage: limitPageAdmin }
}