import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: '',
    error: ''
};

export const snackSlice = createSlice({
    name: 'snack',
    initialState,
    reducers: {
    },
    extraReducers: {
    }
});

export const snackReducer = snackSlice.reducer;
export const snackActions = snackSlice.actions;