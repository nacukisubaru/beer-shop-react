import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { thunkAxiosPost } from "../../../../helpers/queryHelper";

interface IState {
    orderId: number,
    awareChangesInBasket: boolean,
    modalNotInStock: boolean,
    backRedirectToOrder: boolean,
    modalSuccessOrder: boolean,
    status: string,
    error: any
}

const initialState: IState = {
    orderId: 0,
    awareChangesInBasket: false,
    modalNotInStock: false,
    backRedirectToOrder: false,
    modalSuccessOrder: false,
    status: '',
    error: {}
};

export const createOrder: any = createAsyncThunk(
    'order/post',
    async (basketHash: string, { rejectWithValue }) => {
        return thunkAxiosPost('/orders/create', {basketHash}, true, rejectWithValue);
    }
);

export const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setAwareChangesInBasket: (state, action: PayloadAction<{aware: boolean}>) => {
            state.awareChangesInBasket = action.payload.aware;
        },
        setBackRedirectToOrder: (state, action: PayloadAction<{isRedirect: boolean}>) => {
            state.backRedirectToOrder = action.payload.isRedirect;
        },
        openModalProductNotInStock: (state) => {
            state.modalNotInStock = true;
        },
        closeModalProductNotInStock: (state) => {
            state.modalNotInStock = false;
        },
        openModalSuccessOrder: (state) => {
            state.modalSuccessOrder = true;
        },
        closeModalSuccessOrder: (state) => {
            state.modalSuccessOrder = false;
        },
    },
    extraReducers: {
        [createOrder.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [createOrder.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.backRedirectToOrder = false;
            state.orderId = action.payload.id;
            state.modalSuccessOrder = true;
            localStorage.removeItem("basketId");
        },
        [createOrder.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    },
});

export const orderReducer = orderSlice.reducer;
export const orderActions = orderSlice.actions;