import { Action, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { queryBuilder } from "../../../../helpers/queryHelper";
import { makeStore } from "../../../store";
import axios from "axios";

const initialState: any = {
    productList: []
};

export const productSlice = createSlice({
    name: 'products',

    initialState,

    reducers: {
        setProductsList(state, action) {
            state.data = action.payload;
        },
        setProductListRejected(state, action) {
            
        },
        setProductListPending(state, action) {

        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.subject,
                productList: action.payload.productReducer.data.data.rows
            };
        },
    },
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const fetchProducts = (path: string, params: any): AppThunk =>
    async dispatch => {
        dispatch(
            productSlice.actions.setProductListPending({ data: {rows: []} }),
        );

        const url = queryBuilder(path, params);
        let request = axios;
        try {
            const response = await request.get(url);

            if (!response || !response.data) {
                throw new Error('error');
            }

            dispatch(
                productSlice.actions.setProductsList({ data: response.data }),
            );
        } catch (error: any) {
            dispatch(
                productSlice.actions.setProductListRejected({ data: error.response.data }),
            );
        }
    };

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;