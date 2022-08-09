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
        },
        removeItem: (state, action) => {
            let itemToRemove: any = {};
            state.list = state.list.filter(item => {
                if(item.id !== action.payload.id) {
                    return item;
                } else {
                    itemToRemove = item;
                }
            });
            
            state.count = state.count - 1;
        },
        plusQuantity: (state, action) => {
            const obj = action.payload;
            console.log(state.list, obj);
            const items = state.list.filter(item => {
                if(item.id === obj.id) {
                    return item;
                }
            });
            
            items[0].quantity = items[0].quantity + obj.value;
        },
        minusQuantity: (state, action) => {
            if(state.count > 2) {
                const obj = action.payload;
                state.list[obj.id].quantity = state.list[obj.id].quantity - obj.value;
            }
        },
        setQuantity: (state, action) => {
            const obj = action.payload;
            const items = state.list.filter(item => {
                if(item.id === obj.id) {
                    return item;
                }
            });
            items[0].quantity = obj.value;
        },
        plusCountPosition: (state) => {
            state.count = state.count + 1;
        },
        minusCountPosition: (state) => {
            state.count = state.count - 1;
        }
    }
})

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;