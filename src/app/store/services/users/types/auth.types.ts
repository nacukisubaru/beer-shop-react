import { IUser } from "./user.types";

export interface IAuth {
    accessToken: string,
    user: IUser
}

export interface ILogin {
    email: string,
    password: string
}