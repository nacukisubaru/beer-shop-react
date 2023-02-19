import { createSlice, PayloadAction } from "@reduxjs/toolkit"
//warning типы исправить
export const initialState = {
    grades:<number[]> [],
    brandIds:<number[]> [],
    typesPackagingIds:<number[]> [],
    minPrice:<number> 0,
    maxPrice:<number> 0,
    minVolume:<number> 0,
    maxVolume:<number> 0,
    minFortress:<number> 0,
    maxFortress:<number> 0,
    forBottling:<any> "",
    filtered:<any> "",
    fishTypes:<number[]> [],
    isActive: 'true',
    sortField: 'price',
    order: 'ASC',
    q: ''
}

const removeItem = (state:any, id:number) => {
    if(state.includes(id)) {
        return state.filter((item: number) => {
            if(item !== id) {
                return item;
            }
        });
    } 
    return false;
}

export const filterProductsSlice = createSlice({
    name: 'filterProducts',
    initialState,
    reducers: {
        addGrade: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            const result = removeItem(state.grades, id);
            result ? state.grades = result : state.grades.push(id);
        },
        addBrand: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            const result = removeItem(state.brandIds, id);
            result ? state.brandIds = result : state.brandIds.push(id);
        },
        addTypePackaging: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            const result = removeItem(state.typesPackagingIds, id);
            result ? state.typesPackagingIds = result : state.typesPackagingIds.push(id);
        },
        addFishType: (state, action: PayloadAction<{id:number}>) => {
            const id = action.payload.id;
            const result = removeItem(state.fishTypes, id);
            result ? state.fishTypes = result : state.fishTypes.push(id);
        },
        setMinPrice: (state, action: PayloadAction<{price:number}>) => {
            state.minPrice = action.payload.price;
        },
        setMaxPrice: (state, action: PayloadAction<{price:number}>) => {
            state.maxPrice = action.payload.price;
        },
        setMinVolume: (state, action: PayloadAction<{minVolume: number}>) => {
            state.minVolume = action.payload.minVolume;
        },
        setMaxVolume: (state, action: PayloadAction<{maxVolume: number}>) => {
            state.maxVolume = action.payload.maxVolume;
        },
        setMinFortress: (state, action: PayloadAction<{minFortress: number}>) => {
            state.minFortress = action.payload.minFortress;
        },
        setMaxFortress: (state, action: PayloadAction<{maxFortress: number}>) => {
            state.maxFortress = action.payload.maxFortress;
        },
        setBottling: (state, action: PayloadAction<{forBottling: boolean}>) => {
            state.forBottling = action.payload.forBottling;
        },
        setFiltered: (state, action: PayloadAction<{filtered: boolean}>) => {
            state.filtered = action.payload.filtered;
        },
        setSort: (state, action: PayloadAction<{field: string, value: string}>) => {
            state.sortField = action.payload.field;
            state.order = action.payload.value;
        },
        setSearch: (state, action: PayloadAction<{q: string}>) => {
           state.q = action.payload.q;
        },
        resetProductFilters: (state) => {
            state.grades = [];
            state.brandIds = [];
            state.typesPackagingIds = [];
            state.minPrice = 0;
            state.maxPrice = 0;
            state.maxVolume = 0;
            state.minVolume = 0;
            state.minFortress = 0;
            state.maxFortress = 0;
            state.forBottling = "";
            state.filtered = "";
        }
    }
});

export const filterProductsReducer = filterProductsSlice.reducer;
export const filterProductsActions = filterProductsSlice.actions;