import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { queryBuilder } from "../../../../helpers/queryHelper";
import { IProductСharacteristics } from "../../../../types/product.types";

const initialState = {
    list:<IProductСharacteristics[]> [],
    count:<number> 0,
    status: '',
    error: ''
};

export const getBasketList:any = createAsyncThunk(
    'basket/fetch',
    async(id, {rejectWithValue}) => {
        try {
            const response = await fetch(queryBuilder({
                action: 'getBasket/' + id,
                params: {}
            }, 'basket'));
            if(!response.ok) {
                throw new Error('server error!');
            }
            return await response.json();
        } catch(error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const findItemInBasket = (basket: IProductСharacteristics[], id: number): IProductСharacteristics => {
    let basketItem: any = false;
    const items: IProductСharacteristics[] = basket.filter(item => {
        if(item.id === id) {
            return item;
        }
    });

    if(items.length > 0) {
        basketItem = items[0];
    }
    return basketItem;
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.list.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<{id: number}>) => {
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
        plusQuantity: (state, action: PayloadAction<{id: number, value: number}>) => {
            const obj = action.payload;
            const item = findItemInBasket(state.list, obj.id);
            if(item) {
                item.quantity = item.quantity + obj.value;
            }
        },
        minusQuantity: (state, action: PayloadAction<{id: number, value: number}>) => {
            const obj = action.payload;
            const item = findItemInBasket(state.list, obj.id);
            if(item) {
                item.quantity = item.quantity - obj.value;
            }
        },
        setQuantity: (state, action: PayloadAction<{id: number, value: number}>) => {
            const obj = action.payload;
            const item = findItemInBasket(state.list, obj.id);
            if(item) {
                item.quantity = obj.value;
            }
        },
        plusCountPosition: (state) => {
            state.count = state.count + 1;
        },
        minusCountPosition: (state) => {
            state.count = state.count - 1;
        }
    },
    extraReducers: {
        [getBasketList.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [getBasketList.fulfilled]: (state, action: PayloadAction) => {
            state.status = 'resolved';
            console.log(action.payload);
            //state.list = action.payload;
        },
        [getBasketList.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;