import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBeer } from "../types/beer.type";
import { queryBuilder, thunkAxiosGet } from "../../../../helpers/queryHelper";
import { arrayUniqueByKey } from "../../../../helpers/arrayHelper";
//warning типы исправить
const initialState = {
    beerList:<IBeer[]> [],
    beer:<IBeer> {},
    minPrice: 0,
    maxPrice:0,
    minVolumeDef: 0,
    maxVolumeDef: 0,
    minFortressDef: 0,
    maxFortressDef: 0,
    page: 0,
    total: 0,
    showBeer: false,
    status: '',
    error: ''
};

interface IBody {
    path: string,
    params: any
}

export const getBeerList:any = createAsyncThunk(
    'beers/fetch',
    async(body: IBody, {rejectWithValue}) => {
        const {path, params} = body;
        try {
            console.log(body);
            await beerSlice.actions.dropBeerList();
            const response = await fetch(queryBuilder(path, params));
            if(!response.ok) {
                throw new Error('server error!');
            }
            return await response.json();
        } catch(error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const getMinAndMaxPriceBeers:any = createAsyncThunk(
    'prices_beers/fetch',
    async(_, {rejectWithValue}) => {
       return thunkAxiosGet('/products/minMaxPrices', {productType: 'beers'}, false, rejectWithValue);
    }
);

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
        dropBeerList: (state) => {
            state.beerList = [];
        },
        resetBeerPage: (state) => {
            state.page = 0;
        },
        getBeer: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            console.log(state.beerList);
            state.beer = state.beerList.filter((item: IBeer) => {
                if(item.productId === id) {
                    console.log(item.productId);
                    return item;
                }
                return false;
            })[0];
        },
        openBeer: (state) => {
            state.showBeer = true;
            console.log(state);
        },
        closeBeer: (state) => {
            console.log(state);
            state.showBeer = false;
        }
    },
    extraReducers: {
        [getBeerList.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
            state.page = 0;
        },
        [getBeerList.fulfilled]: (state,action) => {
            state.status = 'resolved';
       
            state.beerList = arrayUniqueByKey(state.beerList.concat(action.payload.rows));
            state.page = action.payload.nextPage;
            state.total = action.payload.count;
        },
        [getBeerList.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
            state.page = 0;
        },
        [getMinAndMaxPriceBeers.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [getMinAndMaxPriceBeers.fulfilled]: (state, action: PayloadAction<{minPrice: number, maxPrice: number}[]>) => {
            state.status = 'resolved';
            state.minPrice = action.payload[0].minPrice;
            state.maxPrice = action.payload[0].maxPrice;
        },
        [getMinAndMaxPriceBeers.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
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

export const beerReducer = beerSlice.reducer;
export const beerActions = beerSlice.actions;