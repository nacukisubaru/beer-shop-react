import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {thunkAxiosGet, thunkAxiosPost} from "../../../../helpers/queryHelper";
import { removeMask } from "../../../../helpers/stringHelper";
import { IAuth, ILogin, ILoginByCode, IRegistration, ISendCodeByCallResponse, IUserRegData } from "../types/auth.types";
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
        roles: [],
        createdAt: '',
        updatedAt: '',
    },
    isAuth: false,
    status: '',
    error: {message: ''}
};

export const registrate:any = createAsyncThunk(
    'registration/post',
    async(body: IRegistration, {rejectWithValue}) => {
        const phone = removeMask(body.phone);
        return thunkAxiosPost('/users/registration', {...body, phone}, true, rejectWithValue);
    }
);

export const login:any = createAsyncThunk(
    'login/post',
    async(body: ILogin, {rejectWithValue}) => {
        const phone = removeMask(body.phone);
        return thunkAxiosPost('/users/login', {...body, phone}, true, rejectWithValue);
    }
);

export const loginByCode:any = createAsyncThunk(
    'loginByCode/post',
    async(body: ILoginByCode, {rejectWithValue}) => {
        const phone = removeMask(body.phone);
        return thunkAxiosPost('/users/loginByCode', {...body, phone}, true, rejectWithValue);
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

export const sendCodeByCall:any = createAsyncThunk(
    'sendCodeByCall/get',
    async(phone: string, {rejectWithValue}) => {
        phone = removeMask(phone);
        return thunkAxiosGet('/verification-code/sendCodeByCall', {phone}, false, rejectWithValue);
    }
);

export const checkUserExistByPhone:any = createAsyncThunk(
    'checkUserExistByPhone/get',
    async(phone: string, {rejectWithValue}) => {
        phone = removeMask(phone);
        return thunkAxiosGet('/users/checkUserExistByPhone/', {phone}, false, rejectWithValue);
    }
);

export const checkUserNotExistByEmailAndPhone:any = createAsyncThunk(
    'checkUserNotExistByEmailAndPhone/get',
    async(body: IUserRegData, {rejectWithValue}) => {
        const phone = removeMask(body.phone);
        return thunkAxiosGet('/users/checkUserNotExistByEmailAndPhone/', {...body, phone}, false, rejectWithValue);
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
        clearUserErrors: (state) => {
            state.error = {message: ''};
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

            state.error =  {message: ''}
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
        [loginByCode.pending]: (state) => {
            state.status = 'loading';
        },
        [loginByCode.fulfilled]: (state, action: PayloadAction<IAuth>) => {
            state.status = 'resolved';
            const token = action.payload.accessToken;
            const user:any = action.payload.user;

            state.error =  {message: ''}
            state.accessToken = token;
            state.user = user;
            state.isAuth = true;
            localStorage.setItem("accessToken", token);
            localStorage.setItem("userId", user.id);
        },
        [loginByCode.rejected]: (state,action) => {
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
        [registrate.pending]: (state) => {
            state.status = 'loading';
        },
        [registrate.fulfilled]: (state, action: PayloadAction<IAuth>) => {
            state.status = 'resolved';
            const token = action.payload.accessToken;
            const user:any = action.payload.user;

            //state.accessToken = token;
            //state.user = user;
            //state.isAuth = true;
            //localStorage.setItem("accessToken", token);
            //localStorage.setItem("userId", user.id);
        },
        [registrate.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
            state.isAuth = false;
        },      
        [sendCodeByCall.pending]: (state) => {
            state.status = 'loading';
        },
        [sendCodeByCall.fulfilled]: (state, action: PayloadAction<ISendCodeByCallResponse>) => {
            state.status = 'resolved';
            const payload = action.payload;
            if(payload.status === "ERROR") {
                state.error = {message: payload.status_text}
            } else {
                state.error =  {message: ''}
            }
        },
        [sendCodeByCall.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
            state.isAuth = false;
        },
        [checkUserExistByPhone.pending]: (state) => {
            state.status = 'loading';
        },
        [checkUserExistByPhone.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.error =  {message: ''}
        },
        [checkUserExistByPhone.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
        [checkUserNotExistByEmailAndPhone.pending]: (state) => {
            state.status = 'loading';
        },
        [checkUserNotExistByEmailAndPhone.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.error =  {message: ''}
        },
        [checkUserNotExistByEmailAndPhone.rejected]: (state,action) => {
            state.status = 'rejected';
            state.error = action.payload;
        },
    }
})

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;