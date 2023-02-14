import { Action, createSlice, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { queryBuilder  } from "../../../../helpers/queryHelper";
import { makeStore } from "../../../store";

const initialState = {
    fishList: [],
    data: {},
    status: '',
    error: ''
};

export const fishSlice = createSlice({
    name: 'fish',
    initialState,
    reducers: {
        setFishList(state, action) {
            state.data = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            const hydrateObject = {
                ...state,
                ...action.payload.subject,
            };

            if(action.payload.fishReducer.data.data && action.payload.fishReducer.data.data.rows) {
                hydrateObject.fishList = action.payload.fishReducer.data.data.rows;
            }

            return hydrateObject;
        }
    }
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const fetchFish = (params: any): AppThunk =>
    async dispatch => {
        const url = queryBuilder("/fish/getListByFilter/", params);
        let request = axios;
        const response = await request.get(url);
        dispatch(
            fishSlice.actions.setFishList({ data: response.data }),
        );
    };

export const fishReducer = fishSlice.reducer;
export const fishActions = fishSlice.actions;