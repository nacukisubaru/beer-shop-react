import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { limitPageAdmin } from "../../http/http.request.config";

interface IFilter {
    name: string,
    value: number | string | number[] | string[]
}
interface IinitialState {
    page: number,
    maxPage: number,
    lastPage: number,
    countRows: number,
    limitPage: number,
    filters: IFilter[],
    tmpfilters: IFilter[],
    sortField: string,
    order: string,
    disableNextPage: boolean,
    reqFilterDisabled: boolean,
    clickFilter: boolean
}

const initialState: IinitialState = {
    page: 0,
    maxPage: 0,
    lastPage: 10,
    countRows: 100,
    limitPage: limitPageAdmin,
    filters: [],
    tmpfilters:[],
    sortField: 'id',
    order: 'DESC',
    disableNextPage: false,
    reqFilterDisabled: false,
    clickFilter: false
}

const contentSlice = createSlice({
    name: 'content',
    initialState,
    reducers: {
        setFilters: (state, action) => {
            state.filters = action.payload;
        },
        removeFilters: (state) => {
           state.filters = [];
           state.tmpfilters = []
        },
        setFilter:(state, action: PayloadAction<{name: string, value: number | string | number[] | string[]}>) => {
            const findFilter = state.tmpfilters.findIndex((filter) => filter.name === action.payload.name);
            if(findFilter > -1) {
                state.tmpfilters[findFilter] = {name: action.payload.name, value: action.payload.value};
            } else {
                state.tmpfilters = state.tmpfilters.concat({name: action.payload.name, value: action.payload.value});
            }
        },
        removeFilter: (state, action: PayloadAction<{name:string}>) => {
           state.tmpfilters = state.tmpfilters.filter((filter) => filter.name !== action.payload.name);
           state.filters = state.filters.filter((filter) => filter.name !== action.payload.name);
           state.reqFilterDisabled = false;
           state.disableNextPage = false;
           state.clickFilter = true;
        },
        setRequestFilterDisabled: (state, action: PayloadAction<{disable: boolean}>) => {
            state.reqFilterDisabled = action.payload.disable;
        },
        filter: (state) => {
            state.page = 0;
            state.reqFilterDisabled = false;
            state.filters = state.tmpfilters;
            state.clickFilter = true;
        },
        resetFilters: (state) => {
            state.filters = [];
            state.tmpfilters = [];
            state.reqFilterDisabled = false;
            state.disableNextPage = false;
            state.clickFilter = true;
        },
        setClickFilter: (state, action: PayloadAction<{isClick: boolean}>) => {
            state.clickFilter = action.payload.isClick;
        },
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