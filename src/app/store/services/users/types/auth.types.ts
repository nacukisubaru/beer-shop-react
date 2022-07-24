import { IUser } from "./user.types";

export interface IAuth {
    accessToken: string,
    user: IUser,
    authError: {
        status: number,
        message: string
    }
}

export interface ILogin {
    email: string,
    password: string
}