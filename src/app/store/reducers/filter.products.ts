import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { queryBuilder } from "../../helpers/queryHelper";

export const initialState = {
    grades:<number[]> [],
    brandIds:<number[]> [],
    typesPackagingIds:<number[]> [],
    minPrice:<number> 0,
    maxPrice:<number> 0,
    minVolumeVal:<number> 0,
    maxVolumeVal:<number> 0,
    minFortressVal:<number> 0,
    maxFortressVal:<number> 0,
    modalNotFoundByFilter: false,
    status: '',
    error: ''
}

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
        addTypePackaging: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            const result = removeItem(state.typesPackagingIds, id);
            result ? state.typesPackagingIds = result : state.typesPackagingIds.push(id);
        },
        setMinPrice: (state, action: PayloadAction<{price:number}>) => {
            state.minPrice = action.payload.price;
        },
        setMaxPrice: (state, action: PayloadAction<{price:number}>) => {
            state.maxPrice = action.payload.price;
        },
        setMinVolume: (state, action: PayloadAction<{minVolume: number}>) => {
            state.minVolumeVal = action.payload.minVolume;
        },
        setMaxVolume: (state, action: PayloadAction<{maxVolume: number}>) => {
            state.maxVolumeVal = action.payload.maxVolume;
        },
        setMinFortress: (state, action: PayloadAction<{minFortress: number}>) => {
            state.minFortressVal = action.payload.minFortress;
        },
        setMaxFortress: (state, action: PayloadAction<{maxFortress: number}>) => {
            state.maxFortressVal = action.payload.maxFortress;
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
    }
});

export const filterProductsReducer = filterProductsSlice.reducer;
export const filterProductsActions = filterProductsSlice.actions;