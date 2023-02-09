import { createSlice } from "@reduxjs/toolkit";
import { IAccountForms} from "../../types/account.form.types";

const initialState: IAccountForms = {
    isRegistrationForm: false,
    isLoginForm: true,
    isVerificationCodeForm: false,
    lastestForm: "login"
};

export const accountFormsSlice = createSlice({
    name: 'accountForms',
    initialState,
    reducers: {
        switchLoginForm: (state) => {
            state.isLoginForm = true;
            state.isRegistrationForm = false;
            state.isVerificationCodeForm = false;
            state.lastestForm = "login";
        },
        switchRegForm: (state) => {
            state.isRegistrationForm = true;
            state.isLoginForm = false;
            state.isVerificationCodeForm = false;
            state.lastestForm = "registration";
        },
        switchVerificationForm: (state) => {
            state.isVerificationCodeForm = true;
            console.log('work')
            state.isLoginForm = false;
            state.isRegistrationForm = false
        }
    }
});

export const accountFormsReducer = accountFormsSlice.reducer;
export const accountFormsActions = accountFormsSlice.actions;