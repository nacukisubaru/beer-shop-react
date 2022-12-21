import { Action, createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { queryBuilder, thunkAxiosGet } from "../../../../helpers/queryHelper";
import { makeStore } from "../../../store";
import axios from "axios";
import { ISnack } from "../../snacks/types/snacks.types";
import { IBeer } from "../../beers/types/beer.type";
import { arrayUniqueByKey } from "../../../../helpers/arrayHelper";

type productTypeArray =  IBeer[] | ISnack[];
type productType =  IBeer | ISnack;

interface InitialState {
    productList: productTypeArray,
    product: any,
    data: any,
    page: number,
    total: number,
    showProduct: boolean,
    status: string,
    error: string
}

interface IBody {
    path: string,
    params: any
}

const initialState: InitialState = {
    productList: [],
    product: {},
    data: {},
    page: 0,
    total: 0,
    showProduct: false,
    status: '',
    error: ''
};

export const getProductsList:any = createAsyncThunk(
    'products/fetch',
    async(body: IBody, {rejectWithValue}) => {
        const {path, params} = body;
        return thunkAxiosGet(path, params, false, rejectWithValue);
    }
);

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProductsList(state, action) {
            state.data = action.payload;
            state.status = "resolved";
            state.page = 1;
        },
        setProductListRejected(state, action) {
            state.status = "rejected";
        },
        setProductListPending(state, action) {
            state.status = "pending";
        },
        dropProductList: (state) => {
            state.productList = [];
        },
        resetProductPage: (state) =>{
            state.page = 0;
        },
        getProduct: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            state.product = state.productList.filter((item: productType) => {
                if(item.productId === id) {
                    return item;
                }
                return false;
            })[0];
        },
        openProduct: (state) => {
            state.showProduct = true;
        },
        closeProduct: (state) => {
            state.product = false;
        }
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.subject,
                page: action.payload.productReducer.page,
                status: action.payload.productReducer.status,
                productList: action.payload.productReducer.data.data.rows
            };
        },
        [getProductsList.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
            state.page = 0;
        },
        [getProductsList.fulfilled]: (state,action) => {
            state.status = 'resolved';
       
            state.productList = arrayUniqueByKey(state.productList.concat(action.payload.rows));
            state.page = action.payload.nextPage;
            state.total = action.payload.count;
        },
        [getProductsList.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
            state.page = 0;
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