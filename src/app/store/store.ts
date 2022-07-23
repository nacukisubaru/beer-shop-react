import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/users/users.api";
import { userReducer } from "./services/users/reducers/user.slice";

export const store = configureStore({
    reducer: {
        userReducer,
        [userApi.reducerPath]: userApi.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;