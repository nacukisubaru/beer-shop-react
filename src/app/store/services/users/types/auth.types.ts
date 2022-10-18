import { IUser } from "./user.types";

export interface IAuth {
    accessToken: string,
    user: IUser,
    isAuth: boolean,
    status: string,
    error: {message: string}
}

export interface ILogin {
    phone: string,
    password: string
}

export interface ILoginByCode {
    phone: string,
}