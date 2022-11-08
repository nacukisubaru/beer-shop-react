import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { limitPageAdmin } from "../../http/http.request.config";

const initialState = {
    page: 0,
    maxPage: 0,
    lastPage: 10,
    countRows: 100,
    limitPage: limitPageAdmin,
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
        setCountRows: (state, action: PayloadAction<{count: number}>) => {
            state.countRows = action.payload.count;
        },
        setLastPage: (state, action: PayloadAction<{page: number}>) => {
            state.lastPage = action.payload.page;
        },
        setContentDefaultSort: (state) => {
            state.sortField = '';
            state.order = '';
        },
        setLimitPage: (state, action: PayloadAction<{limit: number}>) => {
            state.limitPage = action.payload.limit;
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