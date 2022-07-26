import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/users/users.api";
import { userReducer } from "./services/users/reducers/user.slice";
import { accountFormsReducer } from "./reducers/account.form.slice";
import { beerApi } from "./services/beers/beer.api";
import { basketReducer } from "./services/basket/reducers/basket.slice";

export const store = configureStore({
    reducer: {
        userReducer,
        accountFormsReducer,
        basketReducer,
        [userApi.reducerPath]: userApi.reducer,
        [beerApi.reducerPath]: beerApi.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;