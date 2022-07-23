import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
    }
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserData: (state, action: PayloadAction<IAuth>) => {
            console.log(action.payload);
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
        }
    }
})

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;