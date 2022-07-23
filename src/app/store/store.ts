import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/users/users.api";

export const store = configureStore({
    reducer: {
        [userApi.reducerPath]: userApi.reducer,
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;