import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    phone: "",
    minutesResend: 4,
    secondsResend: 59,
    canResendCode: false
};

export const verificationCodeSlice = createSlice({
    name: 'verification-code',
    initialState,
    reducers: {
        setPhone: (state, action: PayloadAction<{phone:string}>) => {
            state.phone = action.payload.phone;
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