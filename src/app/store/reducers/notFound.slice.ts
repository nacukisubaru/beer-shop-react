import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    modalNotFoundByFilter: false
}

export const notFoundSlice = createSlice({
    name: 'notFound',
    initialState,
    reducers: {
        openModalNotFoundByFilter: (state) => {
            state.modalNotFoundByFilter = true;
        },
        closeModalNotFoundByFilter: (state) => {
            state.modalNotFoundByFilter = false;
        }
    }
});

export const notFoundReducer = notFoundSlice.reducer;
export const notFoundActions = notFoundSlice.actions;