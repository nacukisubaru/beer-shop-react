import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
    page: 0,
    maxPage: 0,
    sortField: 'id',
    order: 'DESC',
    disableNextPage: false
}

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setContentPage:(state, action: PayloadAction<{page:number}>) => {
            const page = action.payload.page;
            state.page = page;
            if(page >= state.maxPage) {
                state.maxPage = page;
            }
        },
        setContentSort:(state, action: PayloadAction<{field: string, sort: string}>) => {
            state.sortField = action.payload.field;
            state.order = action.payload.sort;
        },
        setContentDefaultSort: (state) => {
            state.sortField = '';
            state.order = '';
        },
        disableNextPage: (state) => {
            state.disableNextPage = true;
        },
        enableNextPage: (state) => {
            state.disableNextPage = false;
        }
    }
});

export const contentReducer = contentSlice.reducer;
export const contentActions = contentSlice.actions;