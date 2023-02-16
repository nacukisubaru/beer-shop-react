import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { userApi } from "./services/users/users.api";
import { userReducer } from "./services/users/reducers/user.slice";
import { accountFormsReducer } from "./reducers/account.form.slice";
import { beerApi } from "./services/beers/beer.api";
import { basketReducer } from "./services/basket/reducers/basket.slice";
import { beerReducer } from "./services/beers/reducers/beer.slice";
import { drawerMenuReducer } from "./reducers/drawer.menu.slice";
import { gradeApi } from "./services/grades/grade.api";
import { brandApi } from "./services/brands/brand.api";
import { filterProductsReducer } from "./reducers/filter.products";
import { snackReducer } from "./services/snacks/reducers/snack.slice";
import { typePackagingApi } from "./services/type-packaging/type-packaging.api";
import { notFoundReducer } from "./reducers/notFound.slice";
import { snackApi } from "./services/snacks/snack.api";
import { verificationCodeReducer } from "./services/verification-code/reducers/verification-code.slice";
import { orderReducer } from "./services/order/reducers/order.slice";
import { productApi } from "./services/products/product.api";
import { contentReducer } from "./reducers/content.slice";
import { productTypeApi } from "./services/product-types/product-types.api";
import { roleApi } from "./services/roles/role.api";
import { orderApi, orderStatusApi, orderUserApi } from "./services/order/order.api";
import { createWrapper } from "next-redux-wrapper";
import { productReducer } from "./services/products/reducers/product.slice";
import { headerReducer } from "./reducers/header.slice";
import { fishApi, fishTypesApi, fishTypesCrudApi } from "./services/fish/fish.api";
import { fishReducer } from "./services/fish/reducers/fish.slice";

export const makeStore = () => configureStore({
    reducer: {
        userReducer,
        accountFormsReducer,
        basketReducer,
        beerReducer,
        fishReducer,
        drawerMenuReducer,
        filterProductsReducer,
        snackReducer,
        notFoundReducer,
        verificationCodeReducer,
        orderReducer,
        contentReducer,
        productReducer,
        headerReducer,
        [userApi.reducerPath]: userApi.reducer,
        [gradeApi.reducerPath]: gradeApi.reducer,
        [brandApi.reducerPath]: brandApi.reducer,
        [typePackagingApi.reducerPath]: typePackagingApi.reducer,
        [beerApi.reducerPath]: beerApi.reducer,
        [snackApi.reducerPath]: snackApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
        [productTypeApi.reducerPath]: productTypeApi.reducer,
        [roleApi.reducerPath]: roleApi.reducer,
        [orderApi.reducerPath]: orderApi.reducer,
        [orderUserApi.reducerPath]: orderUserApi.reducer,
        [orderStatusApi.reducerPath]: orderStatusApi.reducer,
        [fishApi.reducerPath]: fishApi.reducer,
        [fishTypesApi.reducerPath]: fishTypesApi.reducer,
        [fishTypesCrudApi.reducerPath]: fishTypesCrudApi.reducer
    },
    
    middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false}).concat(
        beerApi.middleware, 
        userApi.middleware, 
        gradeApi.middleware, 
        brandApi.middleware, 
        typePackagingApi.middleware,
        snackApi.middleware, 
        productTypeApi.middleware,
        productApi.middleware,
        roleApi.middleware,
        orderApi.middleware,
        fishApi.middleware,
        fishTypesCrudApi.middleware
    ),
    //middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false})
});

export const wrapper = createWrapper(makeStore);

export const store = makeStore();
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;