import { IUser } from "./user.types";

export interface IAuth {
    accessToken: string,
    user: IUser,
    isAuth: boolean,
    isVerifyPhone: boolean,
    isNewPhoneVerify: boolean,
    status: string,
    error: {message: string}
}

export interface IRegistration {
    phone: string,
    email: string,
    password: string
}

export interface IRegistrationFields extends IRegistration {
    retryPassword: string
}

export interface IUserRegData {
    phone: string,
    email: string,
}

export interface ILogin {
    phone: string,
    password: string
}

export interface ILoginByCode {
    phone: string,
    code: string
}

export interface IRemainingTime {
    minutes: number,
    seconds: number
}

export interface ISendCodeByCallResponse {
    balance: number,
    call_id: string,
    cost: number,
    status: string,
    status_text: string,
    remainingTime: IRemainingTime
}

export interface IUserVerifyData {
    phone: string,
    code: string
}