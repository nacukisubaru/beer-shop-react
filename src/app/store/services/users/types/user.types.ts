export interface IUser {
    id: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    password: string,
    activationLink: string,
    isActivated: boolean,
    updatedAt: string,
    createdAt: string
}