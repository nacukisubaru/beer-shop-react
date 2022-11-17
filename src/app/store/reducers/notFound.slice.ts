import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
    modalNotFoundByFilter: false,
    adminModalNotFoundByFilter: false
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
        },
        openAdminModalNotFoundByFilter: (state) => {
            state.adminModalNotFoundByFilter = true;
        },
        closeAdminModalNotFoundByFilter: (state) => {
            state.adminModalNotFoundByFilter = false;
        }
    }
});

export const notFoundReducer = notFoundSlice.reducer;
export const notFoundActions = notFoundSlice.actions;