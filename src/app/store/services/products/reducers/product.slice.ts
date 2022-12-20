import { Action, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import { makeStore } from "../../../store";

const initialState: any = {
    data: null
};

export const productSlice = createSlice({
    name: 'subject',

    initialState,

    reducers: {
        setEnt(state, action) {
            state.data = action.payload;  
        },
    },

    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,
                ...action.payload.subject,
                data: action.payload.productReducer.data
            };
        },
    },
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const fetchSubject = (id: any): AppThunk =>
    async dispatch => {
        console.log("asdas");
        const timeoutPromise = (timeout: number) => new Promise(resolve => setTimeout(resolve, timeout));
        await timeoutPromise(200);

        dispatch(
            productSlice.actions.setEnt({
                id,
                name: `Subject ${id}`,     
            }),
        );
    };

export const productReducer = productSlice.reducer;
export const productActions = productSlice.actions;