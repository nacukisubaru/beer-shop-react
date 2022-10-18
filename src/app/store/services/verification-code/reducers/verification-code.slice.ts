import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    phone: "",
};

export const verificationCodeSlice = createSlice({
    name: 'verification-code',
    initialState,
    reducers: {
        setPhone: (state, action: PayloadAction<{phone:string}>) => {
            state.phone = action.payload.phone;
        }
    }
});

export const verificationCodeReducer = verificationCodeSlice.reducer;
export const verificationCodeActions = verificationCodeSlice.actions;