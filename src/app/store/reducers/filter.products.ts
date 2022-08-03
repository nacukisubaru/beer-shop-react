import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { queryBuilder } from "../../helpers/queryHelper";

export const initialState = {
    grades:<number[]> [],
    brandIds:<number[]> [],
    minPriceDefault:<number> 0,
    maxPriceDefault:<number> 1000,
    minPrice:<number> 0,
    maxPrice:<number> 0,
    modalNotFoundByFilter: false,
    status: '',
    error: ''
}

export const getMinAndMaxPrice:any = createAsyncThunk(
    'prices/fetch',
    async(_, {rejectWithValue}) => {
        try {
            const response = await fetch(queryBuilder({action:'minMaxPrices', params:{}}, 'products'));
            if(!response.ok) {
                throw new Error('server error!');
            }

            const result = await response.json();
            if(result.length > 0) {
                return result[0];
            }
            return [];
        } catch(error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const removeItem = (state:any, id:number) => {
    if(state.includes(id)) {
        return state.filter((item: number) => {
            if(item !== id) {
                return item;
            }
        });
    } 
    return false;
}

export const filterProductsSlice = createSlice({
    name: 'filterProducts',
    initialState,
    reducers: {
        addGrade: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            const result = removeItem(state.grades, id);
            result ? state.grades = result : state.grades.push(id);
        },
        addBrand: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            const result = removeItem(state.brandIds, id);
            result ? state.brandIds = result : state.brandIds.push(id);
        },
        setMinPrice: (state, action: PayloadAction<{price:number}>) => {
            state.minPrice = action.payload.price;
        },
        setMaxPrice: (state, action: PayloadAction<{price:number}>) => {
            state.maxPrice = action.payload.price;
        },
        resetFilters: (state) => {
            state.grades = [];
            state.brandIds = [];
            state.minPrice = 0;
            state.maxPrice = 0;
        },
        openModalNotFoundByFilter: (state) => {
            state.modalNotFoundByFilter = true;
        },
        closeModalNotFoundByFilter: (state) => {
            state.modalNotFoundByFilter = false;
        }
    },
    extraReducers: {
        [getMinAndMaxPrice.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [getMinAndMaxPrice.fulfilled]: (state,action: PayloadAction<{minPrice:number, maxPrice:number}>) => {
            state.status = 'resolved';
            const {minPrice, maxPrice} = action.payload;
            if(minPrice) {
                state.minPriceDefault = action.payload.minPrice;
            }
            if(maxPrice) {
                state.maxPriceDefault = action.payload.maxPrice;
            }
        },
        [getMinAndMaxPrice.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
});

export const filterProductsReducer = filterProductsSlice.reducer;
export const filterProductsActions = filterProductsSlice.actions;