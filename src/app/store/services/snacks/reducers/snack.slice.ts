import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { thunkAxiosGet } from "../../../../helpers/queryHelper";
import { ISnack } from "../types/snacks.types";
const initialState = {
    snackList:<ISnack[]> [],
    snack:<ISnack> {},
    minPrice: 0,
    maxPrice: 0,
    page: 0,
    total: 0,
    showSnack: false,
    status: '',
    error: ''
};

interface IBody {
    path: string,
    params: any
}

export const getSnackList:any = createAsyncThunk(
    'snacks/fetch',
    async(body: IBody, {rejectWithValue}) => {
        const {path, params} = body;
        return thunkAxiosGet(path, params, false, rejectWithValue);
    }
);

export const getMinAndMaxPriceSnacks:any = createAsyncThunk(
    'prices_snacks/fetch',
    async(_, {rejectWithValue}) => {
       return thunkAxiosGet('/products/minMaxPrices', {productType: 'snacks'}, false, rejectWithValue);
    }
);

export const snackSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        dropSnackList: (state) => {
            state.snackList = [];
        },
        resetSnackPage: (state) => {
            state.page = 0;
        },
        getSnack: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            state.snack = state.snackList.filter((item: ISnack) => {
                if(item.product.id === id) {
                    return item;
                }
            })[0];
        },
        openSnack: (state) => {
            state.showSnack = true;
        },
        closeSnack: (state) => {
            state.showSnack = false;
        }
    },
    extraReducers: {
        [getSnackList.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
            state.page = 0;
        },
        [getSnackList.fulfilled]: (state,action) => {
            state.status = 'resolved';
            state.snackList = state.snackList.concat(action.payload.rows);
            state.page = action.payload.nextPage;
            state.total = action.payload.count;
        },
        [getSnackList.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
            state.page = 0;
        },
        [getMinAndMaxPriceSnacks.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [getMinAndMaxPriceSnacks.fulfilled]: (state, action: PayloadAction<{minPrice: number, maxPrice: number}[]>) => {
            state.status = 'resolved';
            state.minPrice = action.payload[0].minPrice;
            state.maxPrice = action.payload[0].maxPrice;
        },
        [getMinAndMaxPriceSnacks.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
});

export const snackReducer = snackSlice.reducer;
export const snackActions = snackSlice.actions;