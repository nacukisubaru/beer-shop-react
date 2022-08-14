import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { asyncThunkCallback, queryBuilder } from "../../../../helpers/queryHelper";
import { setObjStorage } from "../../../../helpers/storageHelper";
import $api from "../../../../http/axios.middlewares";
import { IProduct, IProductBasket } from "../../../../types/product.types";
import { IBasket } from "../types/basket.type";

const initialState = {
    list:<IProductBasket[]> [],
    count:<number> 0,
    status: '',
    error: ''
};

export const getBasketList:any = createAsyncThunk(
    'basket/fetch',
    async(id, {rejectWithValue}) => {
        const request = async () => {
            return fetch(queryBuilder({action:'getBasket/' + id, params: {}}, 'basket'));
        }
        return asyncThunkCallback(request, rejectWithValue);
    }
);


export const getBasketByUserId:any = createAsyncThunk(
    'getBasket/fetch',
    async(id: number, {rejectWithValue}) => {
        const request = async () => {
            return $api.get(queryBuilder({action:'freeBasket/' + id, params: {}}, 'basket'));
        }
        return asyncThunkCallback(request, rejectWithValue);
    }
);

export const createProductForBuy = (product: IProduct, quantity: number = 1): IProductBasket => {
    const {id, price, title, description, image} = product;
    const prod: IProductBasket = {
        id,
        title,
        price,
        description,
        quantity,
        image
    };

    return prod;
}


const findItemInBasket = (basket: IProductBasket[], id: number): IProductBasket => {
    let basketItem: any = false;
    const items: IProductBasket[] = basket.filter(item => {
        if(item.id === id) {
            return item;
        }
    });

    if(items.length > 0) {
        basketItem = items[0];
    }
    return basketItem;
}

const setStateProductList = (state: any, action: PayloadAction<IBasket>) => {
    const products = action.payload.products;
    state.list = products.map((item) => {
        return createProductForBuy(item, item.BasketProducts.quantity);
    });
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
        [getBasketList.fulfilled]: (state, action: PayloadAction<IBasket>) => {
            state.status = 'resolved';
            setStateProductList(state, action);
        },
        [getBasketList.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getBasketByUserId.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [getBasketByUserId.fulfilled]: (state, action: PayloadAction<IBasket>) => {
            state.status = 'resolved';
            setStateProductList(state, action);
            setObjStorage("basketId", String(action.payload.id));
        },
        [getBasketByUserId.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;