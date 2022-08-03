import { createSlice } from "@reduxjs/toolkit";
import { IProductСharacteristics } from "../../../../types/product.types";

const initialState = {
    list:<IProductСharacteristics[]> [],
    count:<number> 0
};

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.list.push(action.payload);
            state.count = state.count + 1;
        },
        plusQuantity: (state, action) => {
            const obj = action.payload;
            console.log(state.list[obj.id]);
            state.list[obj.id].quantity = state.list[obj.id].quantity + obj.value;
            state.count = state.count + 1;
        },
        minusQuantity: (state, action) => {
            const obj = action.payload;
            state.list[obj.id].quantity = state.list[obj.id].quantity - obj.value;
            state.count = state.count - 1;
        }
    }
})

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;