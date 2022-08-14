import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { asyncThunkCallback} from "../../../../helpers/queryHelper";
import { setObjStorage, setValStorage } from "../../../../helpers/storageHelper";
import $api from "../../../../http/axios.middlewares";
import { IError } from "../../../../types/error.types";
import { IAuth } from "../types/auth.types";

const initialState: IAuth = {
    accessToken: '',
    user: {
        id: 0,
        name: '',
        surname: '',
        email: '',
        phone: '',
        isActivated: false,
        createdAt: '',
        updatedAt: ''
    },

    authError: { 
        status: 0, 
        message: ''
    },
    status: '',
    error: ''
};

export const login:any = createAsyncThunk(
    'login/post',
    async(body, {rejectWithValue}) => {
        const request = async () => {
            return $api.post('/users/login', body);
        } 
        return asyncThunkCallback(request, rejectWithValue);
    }
);

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserData: (state, action: PayloadAction<IAuth>) => {
            const token = action.payload.accessToken;
            const user:any = action.payload.user;

            state.accessToken = token;
            state.user = user;
        },
        addAuthError: (state, action: PayloadAction<IError>) => {
            state.authError = action.payload;
        },
        resetAuthError: (state) => {
            state.authError = {status: 0, message: ''};
        },
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.status = 'loading';
            state.error = '';
        },
        [login.fulfilled]: (state, action: PayloadAction<IAuth>) => {
            state.status = 'resolved';
            const token = action.payload.accessToken;
            const user:any = action.payload.user;

            state.accessToken = token;
            state.user = user;
            setValStorage("accessToken", token);
            setObjStorage("user", JSON.stringify(user));
        },
        [login.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
})

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;