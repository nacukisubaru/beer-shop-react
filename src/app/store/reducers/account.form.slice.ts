import { createSlice } from "@reduxjs/toolkit";
import { IAccountForms} from "../../types/account.form.types";

const initialState: IAccountForms = {
    isRegistrationForm: false,
    isLoginForm: true,
    isVerificationCodeForm: false
};

export const accountFormsSlice = createSlice({
    name: 'accountForms',
    initialState,
    reducers: {
        switchLoginForm: (state) => {
            state.isLoginForm = true;
            state.isRegistrationForm = false;
            state.isVerificationCodeForm = false;
        },
        switchRegForm: (state) => {
            state.isRegistrationForm = true;
            state.isLoginForm = false;
            state.isVerificationCodeForm = false;
        },
        switchVerificationForm: (state) => {
            state.isVerificationCodeForm = true;
            state.isLoginForm = false;
            state.isRegistrationForm = false
        }
    }
});

export const accountFormsReducer = accountFormsSlice.reducer;
export const accountFormsActions = accountFormsSlice.actions;