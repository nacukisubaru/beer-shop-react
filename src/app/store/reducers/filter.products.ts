import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export const initialState = {
    grades:<number[]> [],
    brandIds:<number[]> [],
    minPrice:<number> 0,
    maxPrice:<number> 1000
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
        setMinPrice: (state, action: PayloadAction<{price:number}>) => {
            state.minPrice = action.payload.price;
        },
        setMaxPrice: (state, action: PayloadAction<{price:number}>) => {
            state.maxPrice = action.payload.price;
        }
    }
});

export const filterProductsReducer = filterProductsSlice.reducer;
export const filterProductsActions = filterProductsSlice.actions;