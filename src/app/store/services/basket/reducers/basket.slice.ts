import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { thunkAxiosGet } from "../../../../helpers/queryHelper";
import { IProduct, IProductBasket } from "../../../../types/product.types";
import { IBasket } from "../types/basket.type";
//warning типы исправить
const initialState = {
    list:<IProductBasket[]> [],
    currentBasket: 0,
    count:<number> 0,
    status: '',
    error: ''
};

export const getBasketById:any = createAsyncThunk(
    'basket/fetch',
    async(id, {rejectWithValue}) => {
        return thunkAxiosGet('/basket/getBasket/' + id, {}, false, rejectWithValue);
    }
);

export const getBasketByUserId:any = createAsyncThunk(
    'getBasket/fetch',
    async(basketId: number, {rejectWithValue}) => {
        return thunkAxiosGet('/basket/freebasket/', {basketId}, true, rejectWithValue);
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
    let countPosition = 0;
    const products = action.payload.products;
    state.list = products.map((item) => {
        countPosition++;
        return createProductForBuy(item, item.BasketProducts.quantity);
    });

    state.list = state.list.sort((a:any, b:any)=> {
        return a.id - b.id;
    });
    
    state.count = countPosition;
}

export const basketSlice = createSlice({
    name: 'basket',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.list.push(action.payload);
            state.list = state.list.sort((a:any, b:any)=> {
                return a.id - b.id;
            });
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
        },
        setBasket: (state, action) => {
            state.currentBasket = action.payload;
            localStorage.setItem("basketId", action.payload);
        },
        resetBasket: (state) => {
            state.list = [];
            state.currentBasket = 0;
        }
    },
    extraReducers: {
        [getBasketById.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [getBasketById.fulfilled]: (state, action: PayloadAction<IBasket>) => {
            state.status = 'resolved';
            console.log(action);
            state.currentBasket = action.payload.id;
            setStateProductList(state, action);
        },
        [getBasketById.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [getBasketByUserId.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [getBasketByUserId.fulfilled]: (state, action: PayloadAction<IBasket>) => {
            state.status = 'resolved';
            state.currentBasket = action.payload.id;
            setStateProductList(state, action);
        },
        [getBasketByUserId.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        }
    }
})

export const basketReducer = basketSlice.reducer;
export const basketActions = basketSlice.actions;