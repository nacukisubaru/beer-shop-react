import { createSlice } from "@reduxjs/toolkit";

interface IDrawerMenu {
    isFilterMenu: boolean,
    isMainMenu: boolean
}

const initialState: IDrawerMenu = {
    isFilterMenu: false,
    isMainMenu: false
};

export const drawerMenuSlice = createSlice({
    name: 'accountForms',
    initialState,
    reducers: {
        switchFilterMenu: (state) => {
            state.isFilterMenu = true;
            state.isMainMenu = false;
        },
        switchMainMenu: (state) => {
            state.isFilterMenu = false;
            state.isMainMenu = true;
        },
        closeFilterMenu: (state) => {
            state.isFilterMenu = false;
        },
        closeMainMenu: (state) => {
            state.isMainMenu = false;
        },
        closeAllMenues: (state) => {
            state.isFilterMenu = false;
            state.isMainMenu = false;
        }
    }
});

export const drawerMenuReducer = drawerMenuSlice.reducer;
export const drawerMenuActions = drawerMenuSlice.actions;