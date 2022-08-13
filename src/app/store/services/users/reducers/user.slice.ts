import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IError } from "../../../../types/error.types";
import { IAuth } from "../types/auth.types";

const initialState: IAuth = {
    accessToken: '',
    user: {
        id: 0,
        name: '',
        surname: '',
        email: '',
        phone: '',
        isActivated: false,
        createdAt: '',
        updatedAt: ''
    },

    authError: { 
        status: 0, 
        message: ''
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserDataWithStorage: (state, action: PayloadAction<IAuth>) => {
            const token = action.payload.accessToken;
            const user:any = action.payload.user;

            state.accessToken = token;
            state.user = user;
            
            localStorage.setItem("accessToken", token);
            localStorage.setItem("user", JSON.stringify(user));
        },
        addUserData: (state, action: PayloadAction<IAuth>) => {
            const token = action.payload.accessToken;
            const user:any = action.payload.user;

            state.accessToken = token;
            state.user = user;
        },
        addAuthError: (state, action: PayloadAction<IError>) => {
            state.authError = action.payload;
        },
        resetAuthError: (state) => {
            state.authError = {status: 0, message: ''};
        }
    }
})

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;