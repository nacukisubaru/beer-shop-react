import { useCallback, useEffect, useState } from "react";
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
    const { disableNextPage, setCountRows, setLastPage, setClickFilter, openAdminModalNotFoundByFilter, resetFilters, setContentSort } = useActions();
    const { page, sortField, order, limitPage, filters, reqFilterDisabled, clickFilter } = useAppSelector((state) => state.contentReducer);
    const { data, error, refetch } = api.useGetListQuery({ page, sortField, order, limitPage, filter: paramsBuilder(filters) },
        { skip: reqFilterDisabled }
    );
    const [add] =  api.useAddMutation ? api.useAddMutation() : [()=>{}];
    const [upd] = api.useUpdateMutation ? api.useUpdateMutation() :  [()=>{}];
    const [remove] = api.useRemoveMutation ? api.useRemoveMutation() : [()=>{}];
    
    const [rows, setRows] = useState<any[]>([]);
    const [isFilterWorking, setFilterWork] = useState<boolean>(false);
    const [stateResponse, setStateResponse] = useState<IStateResponse>({ status: 'noRequest', response: { status: 0, data: '' } });
    
    //так можно избегать варнинга missing dependencies и при это не попапдать в
    //постоянный re-render
    const [mount, setMount] = useState(false);

    const resetFiltersAndSort = () => {
        resetFilters();
        setContentSort({field: 'id', sort: 'DESC'});
    };

    useEffect(() => {
        if(!mount) {
            resetFiltersAndSort();
            setMount(true);
        }
    }, [mount]);

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
    
            if (errorRes.status === 404 && isFilterWorking && filters.length) {
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

    const removeRow = async (id: number): Promise<IStateResponse> => {
        let response: any = { status: 'noRequest', response: { status: 0, data: '' } };
        
        await remove({id})
            .unwrap()
            .then((payload: any) => { response = { status: 'fulfilled', response: payload } })
            .catch((error: any) => { response = { status: 'rejected', response: error } });

        setStateResponse(response);
        return response;
    }


    const clearStateResponse = () => {
        setStateResponse({ status: 'noRequest', response: { status: 0, data: '' } });
    }

    return { rows, addRow, updRow, removeRow, stateResponse, clearStateResponse, limitPage: limitPageAdmin }
}