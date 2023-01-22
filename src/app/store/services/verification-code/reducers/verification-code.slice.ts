import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRegistrationFields } from "../../users/types/auth.types";

const initialState = {
    loginPhone: "",
    phone: "",
    email: "",
    password: "",
    retryPassword: "",
    minutesResend: 1,
    secondsResend: 59,
    canResendCode: false
};

export const verificationCodeSlice = createSlice({
    name: 'verification-code',
    initialState,
    reducers: {
        setLoginPhone: (state, action: PayloadAction<{phone:string}>) => {
            state.loginPhone = String(action.payload.phone);
        },
        setPhone: (state, action: PayloadAction<{phone:string}>) => {
            state.phone = action.payload.phone;
        },
        setRegFields: (state, action: PayloadAction<IRegistrationFields>) => {
            state.email = action.payload.email;
            state.phone = action.payload.phone;
            state.password = action.payload.password;
            state.retryPassword = action.payload.retryPassword;
        },
        resetRegFields: (state) => {
            state.email = "";
            state.phone = "";
            state.password = "";
            state.retryPassword = "";            
        },
        setMinutesResend: (state, action: PayloadAction<{minutes: number}>) => {
            state.minutesResend = action.payload.minutes;
        },
        setSecondsResend: (state, action: PayloadAction<{seconds: number}>) => {
            state.secondsResend = action.payload.seconds;
        },
        setCanResendCode: (state, action: PayloadAction<{resendCode: boolean}>) => {
            state.canResendCode = action.payload.resendCode;
        }
    }
});

export const verificationCodeReducer = verificationCodeSlice.reducer;
export const verificationCodeActions = verificationCodeSlice.actions;