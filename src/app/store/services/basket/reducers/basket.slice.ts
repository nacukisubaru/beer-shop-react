import { createSlice } from "@reduxjs/toolkit";
import { IProductСharacteristics } from "../../../../types/product.types";

const initialState:IProductСharacteristics[] = [];

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.push(action.payload);
        },
        updateQuantity: (state, action) => {
            const obj = action.payload;
            state[obj.id].quantity = state[obj.id].quantity + obj.value;
        }
    }
})

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;