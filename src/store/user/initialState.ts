import { IUserProps } from "./interfaces/IUserProps";

export type User = {
    id: number,
    username: string,
    name: string,
    cpf?: string,
}

export type UserInfo = {
    user: User;
    access_token: string,
    refresh_token: string
}

export const initialState: IUserProps = {
    signedIn: false,
    loading: false,
    userInfo: {} as UserInfo,
};