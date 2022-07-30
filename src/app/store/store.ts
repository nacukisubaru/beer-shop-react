import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/users/users.api";
import { userReducer } from "./services/users/reducers/user.slice";
import { accountFormsReducer } from "./reducers/account.form.slice";
//import { beerApi } from "./services/beers/beer.api";
import { basketReducer } from "./services/basket/reducers/basket.slice";
import { beerReducer } from "./services/beers/reducers/beer.slice";
import { drawerMenuReducer } from "./reducers/drawer.menu.slice";

export const store = configureStore({
    reducer: {
        userReducer,
        accountFormsReducer,
        basketReducer,
        beerReducer,
        drawerMenuReducer,
        [userApi.reducerPath]: userApi.reducer,
        // [beerApi.reducerPath]: beerApi.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;