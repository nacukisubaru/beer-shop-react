import { createSlice } from "@reduxjs/toolkit";
import { IAccountForms} from "../../types/account.form.types";

const initialState: IAccountForms = {
    isRegistrationForm: false,
    isLoginForm: true,
    isSmsCodeForm: false
};

export const accountFormsSlice = createSlice({
    name: 'accountForms',
    initialState,
    reducers: {
        switchLoginForm: (state) => {
            state.isLoginForm = true;
            state.isRegistrationForm = false;
            state.isSmsCodeForm = false;
        },
        switchRegForm: (state) => {
            state.isRegistrationForm = true;
            state.isLoginForm = false;
            state.isSmsCodeForm = false;
        },
        switchSmsForm: (state) => {
            state.isSmsCodeForm = true;
            state.isLoginForm = false;
            state.isRegistrationForm = false
        }
    }
});

export const accountFormsReducer = accountFormsSlice.reducer;
export const accountFormsActions = accountFormsSlice.actions;