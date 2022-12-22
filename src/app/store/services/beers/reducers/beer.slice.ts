import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { thunkAxiosGet } from "../../../../helpers/queryHelper";
//warning типы исправить
const initialState = {
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
    },
    extraReducers: {
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

export const beerReducer = beerSlice.reducer;
export const beerActions = beerSlice.actions;