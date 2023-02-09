import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import {thunkAxiosGet, thunkAxiosPost} from "../../../../helpers/queryHelper";
import { removeMask } from "../../../../helpers/stringHelper";
import { IAuth, ILogin, ILoginByCode, IRegistration, ISendCodeByCallResponse, IUserRegData, IUserVerifyData } from "../types/auth.types";
import { IUser } from "../types/user.types";

const initialState: IAuth = {
    accessToken: '',
    user: {
        id: 0,
        fio: '',
        email: '',
        phone: '',
        avatar: '',
        isActivated: false,
        roles: [],
        createdAt: '',
        updatedAt: '',
    },
    isAuth: false,
    isVerifyPhone: false,
    isNewPhoneVerify: false,
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

export const checkUserNotExistByPhone:any = createAsyncThunk(
    'checkUserNotExistByPhone/get',
    async(phone: string, {rejectWithValue}) => {
        phone = removeMask(phone);
        return thunkAxiosGet('/users/checkUserNotExistByPhone/', {phone}, false, rejectWithValue);
    }
);

export const checkUserNotExistByEmailAndPhone:any = createAsyncThunk(
    'checkUserNotExistByEmailAndPhone/get',
    async(body: IUserRegData, {rejectWithValue}) => {
        const phone = removeMask(body.phone);
        return thunkAxiosGet('/users/checkUserNotExistByEmailAndPhone/', {...body, phone}, false, rejectWithValue);
    }
);

export const verifyUserBySmsCode:any = createAsyncThunk(
    'verifyUserBySmsCode/post',
    async(body: IUserVerifyData, {rejectWithValue}) => {
        const phone = removeMask(body.phone);
        return thunkAxiosPost('/users/verifyUserByCode/', {...body, phone}, false, rejectWithValue);
    }
);

export const verifyPhoneByCode:any = createAsyncThunk(
    'verifyPhoneByCode/post',
    async(body: IUserVerifyData, {rejectWithValue}) => {
        const phone = removeMask(body.phone);
        return thunkAxiosPost('/users/verifyPhoneByCode/', {...body, phone}, false, rejectWithValue);
    }
);

export const changePhone:any = createAsyncThunk(
    'changePhone/post',
    async(phone:string, {rejectWithValue}) => {
        phone = removeMask(phone);
        return thunkAxiosPost('/users/changePhone/', {phone}, true, rejectWithValue);
    }
);

export const changeFio:any = createAsyncThunk(
    'changeFio/post',
    async(fio:string, {rejectWithValue}) => {
        return thunkAxiosPost('/users/changeFio/', {fio}, true, rejectWithValue);
    }
);

export const changeEmail:any = createAsyncThunk(
    'changeEmail/post',
    async(email:string, {rejectWithValue}) => {
        return thunkAxiosPost('/users/changeEmail/', {email}, true, rejectWithValue);
    }
);

export const changePassword:any = createAsyncThunk(
    'changePassword/post',
    async(password:string, {rejectWithValue}) => {
        return thunkAxiosPost('/users/changePassword/', {password}, true, rejectWithValue);
    }
);

export const uploadAvatar:any = createAsyncThunk(
    'uploadAvatar/post',
    async(form:any, {rejectWithValue}) => {
        return thunkAxiosPost('/users/uploadAvatar/', form, true, rejectWithValue);
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
        changePhoneState: (state, action: PayloadAction<{phone: string}>) => {
            state.user.phone = removeMask(action.payload.phone);
            state.isVerifyPhone = false;
        },
        changeEmailState: (state, action: PayloadAction<{email: string}>) => {
            state.user.email = action.payload.email;
        },
        changeFioState: (state, action: PayloadAction<{fio: string}>) => {
            state.user.fio = action.payload.fio;
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
        [checkUserNotExistByPhone.pending]: (state) => {
            state.status = 'loading';
        },
        [checkUserNotExistByPhone.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.error =  {message: ''}
        },
        [checkUserNotExistByPhone.rejected]: (state,action) => {
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
        [verifyUserBySmsCode.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.error =  {message: ''}
            state.isVerifyPhone = true;
        },
        [verifyUserBySmsCode.rejected]: (state, action) => {
            state.status = 'rejected';
            const payload = action.payload;
            state.error.message = payload.response.data.message;
            state.isVerifyPhone = false;
        },
        [verifyPhoneByCode.pending]: (state) => {
            state.status = 'loading';
            state.isNewPhoneVerify = false;
            state.error = {message: ''};
        },
        [verifyPhoneByCode.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.isNewPhoneVerify = true;
            state.error = {message: ''};
        },
        [verifyPhoneByCode.rejected]: (state, action) => {
            state.status = 'rejected';
            state.isNewPhoneVerify = false;
            const payload = action.payload;
            state.error.message = payload.response.data.message;
        },
        [uploadAvatar.pending]: (state) => {
            state.status = 'loading';
            state.error = {message: ''};
        },
        [uploadAvatar.fulfilled]: (state, action) => {
            state.status = 'resolved';
            state.user.avatar = action.payload;
            state.error = {message: ''};
        },
        [uploadAvatar.rejected]: (state, action) => {
            state.status = 'rejected';
            const payload = action.payload;
            state.error.message = payload.message;
        },
    }
})

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;