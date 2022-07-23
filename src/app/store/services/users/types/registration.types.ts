import { IUser } from "./user.types";

export interface IRegistration {
    accessToken: string,
    refreshToken: string,
    user: IUser
}