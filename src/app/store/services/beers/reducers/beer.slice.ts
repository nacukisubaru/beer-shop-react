import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBeer } from "../types/beer.type";
import { IQueryBuilder, queryBuilder } from "../../../../helpers/queryHelper";
const initialState = {
    beerList:<IBeer[]> [],
    beer:<IBeer> {},
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
            state.beer = state.beerList.filter((item: IBeer) => {
                if(item.id === id) {
                    return item;
                }
            })[0];
        },
        openBeer: (state) => {
            state.showBeer = true;
        },
        closeBeer: (state) => {
            state.showBeer = false;
        }
        // addBeers: (state, action) => {
        //     state.beerList = state.beerList.concat(action.payload);
        // },
        // setBeerPage: (state) => {
        //     state.page = state.page +1;
        // }, 
    },
    extraReducers: {
        [getBeerList.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
            state.page = 0;
        },
        [getBeerList.fulfilled]: (state,action) => {
            state.status = 'resolved';
            state.beerList = state.beerList.concat(action.payload.rows);
            state.page = action.payload.nextPage;
            state.total = action.payload.count;
        },
        [getBeerList.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
            state.page = 0;
        }
    }
});

export const beerReducer = beerSlice.reducer;
export const beerActions = beerSlice.actions;