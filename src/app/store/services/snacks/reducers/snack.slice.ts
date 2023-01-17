import { Action, createSlice, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { queryBuilder } from "../../../../helpers/queryHelper";
import { makeStore } from "../../../store";
const initialState = {
    snackList: [],
    data: {},
    status: '',
    error: ''
};

export const snackSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
        setSnackList(state, action) {
            state.data = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            const hydrateObject = {
                ...state,
                ...action.payload.subject
            };

            if(action.payload.snackReducer.data.data && action.payload.snackReducer.data.data.rows) {
                hydrateObject.snackList = action.payload.snackReducer.data.data.rows;
            }
            return hydrateObject;
        },
    }
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const fetchSnacks = (params: any): AppThunk =>
    async dispatch => {
        const url = queryBuilder("/snacks/getListByFilter/", params);
        let request = axios;
        const response = await request.get(url);
        dispatch(
            snackSlice.actions.setSnackList({ data: response.data }),
        );
    };

export const snackReducer = snackSlice.reducer;
export const snackActions = snackSlice.actions;