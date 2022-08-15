import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {thunkAxiosGet, thunkAxiosPost} from "../../../../helpers/queryHelper";
import { IAuth } from "../types/auth.types";
import { IUser } from "../types/user.types";

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
    isAuth: false,
    status: '',
    error: {message: ''}
};

export const login:any = createAsyncThunk(
    'login/post',
    async(body: any, {rejectWithValue}) => {
       return thunkAxiosPost('/users/login', body, true, rejectWithValue);
    }
);

export const logout:any = createAsyncThunk(
    'logout/post',
    async(_, {rejectWithValue}) => {
       return thunkAxiosPost('/users/logout', {}, true, rejectWithValue);
    }
);

export const getUser:any = createAsyncThunk(
    'getUser/get',
    async(id: number, {rejectWithValue}) => {
       return thunkAxiosGet('/users/' + id, {}, false, rejectWithValue);
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
        }
    },
    extraReducers: {
        [login.pending]: (state) => {
            state.status = 'loading';
        },
        [login.fulfilled]: (state, action: PayloadAction<IAuth>) => {
            state.status = 'resolved';
            const token = action.payload.accessToken;
            const user:any = action.payload.user;

            state.accessToken = token;
            state.user = user;
            state.isAuth = true;
            localStorage.setItem("accessToken", token);
            localStorage.setItem("userId", user.id);
        },
        [login.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
            state.isAuth = false;
        },
        [logout.pending]: (state) => {
            state.status = 'loading';
        },
        [logout.fulfilled]: (state) => {
            state.status = 'resolved';
            state.isAuth = false;
        },
        [logout.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },

        [getUser.pending]: (state) => {
            state.status = 'loading';
        },
        [getUser.fulfilled]: (state, action: PayloadAction<IUser>) => {
            state.status = 'resolved';
            state.user = action.payload;
            state.isAuth = true;
        },
        [getUser.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
})

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;