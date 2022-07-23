import { IUser } from "./user.types";

export interface ILogin {
    accessToken: string,
    refreshToken: string,
    user: IUser
}