import { Action, createAsyncThunk, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import axios from "axios";
import { HYDRATE } from "next-redux-wrapper";
import { queryBuilder, thunkAxiosGet } from "../../../../helpers/queryHelper";
import { makeStore } from "../../../store";
//warning типы исправить
const initialState = {
    beerList: [],
    data: {},
    minPrice: 0,
    maxPrice:0,
    minVolumeDef: 0,
    maxVolumeDef: 0,
    minFortressDef: 0,
    maxFortressDef: 0,
    status: '',
    error: ''
};

export const getMinAndMaxVolumeBeers:any = createAsyncThunk(
    'volume_beers/fetch',
    async(_, {rejectWithValue}) => {
       return thunkAxiosGet('/beers/getMinAndMaxVolume', {}, false, rejectWithValue);
    }
);

export const getMinAndMaxFortressBeers:any = createAsyncThunk(
    'fortress_beers/fetch',
    async(_, {rejectWithValue}) => {
       return thunkAxiosGet('/beers/getMinAndMaxFortress', {}, false, rejectWithValue);
    }
);

export const beerSlice = createSlice({
    name: 'beer',
    initialState,
    reducers: {
        setBeerList(state, action) {
            state.data = action.payload;
        },
    },
    extraReducers: {
        [HYDRATE]: (state, action) => {
            const hydrateObject = {
                ...state,
                ...action.payload.subject,
            };

            if(action.payload.beerReducer.data.data && action.payload.beerReducer.data.data.rows) {
                hydrateObject.beerList = action.payload.beerReducer.data.data.rows;
            }

            return hydrateObject;
        },
        [getMinAndMaxVolumeBeers.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [getMinAndMaxVolumeBeers.fulfilled]: (state, action: PayloadAction<{minVolume: number, maxVolume: number}[]>) => {
            state.status = 'resolved';
            state.minVolumeDef = action.payload[0].minVolume;
            state.maxVolumeDef = action.payload[0].maxVolume;
        },
        [getMinAndMaxVolumeBeers.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getMinAndMaxFortressBeers.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [getMinAndMaxFortressBeers.fulfilled]: (state, action: PayloadAction<{minFortress: number, maxFortress: number}[]>) => {
            state.status = 'resolved';
            state.minFortressDef = action.payload[0].minFortress;
            state.maxFortressDef = action.payload[0].maxFortress;
        },
        [getMinAndMaxFortressBeers.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
});

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const fetchBeers = (params: any): AppThunk =>
    async dispatch => {
        const url = queryBuilder("/beers/getListByFilter/", params);
        let request = axios;
        const response = await request.get(url);
        dispatch(
            beerSlice.actions.setBeerList({ data: response.data }),
        );
    };

export const beerReducer = beerSlice.reducer;
export const beerActions = beerSlice.actions;