import { IUser } from "./user.types";

export interface IAuth {
    accessToken: string,
    user: IUser,
    isAuth: boolean,
    status: string,
    error: {message: string}
}

export interface IRegistration {
    phone: string,
    email: string,
    password: string
}

export interface ILogin {
    phone: string,
    password: string
}

export interface ILoginByCode {
    phone: string,
    code: string
}

export interface IVerification {
    balance: number,
    call_id: string,
    cost: number,
    status: string,
    status_text: string
}