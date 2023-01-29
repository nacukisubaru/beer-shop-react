import { IRole } from "../../roles/types/role.types";

export interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    avatar: string,
    isActivated: boolean,
    roles: IRole[],
    updatedAt: string,
    createdAt: string
}