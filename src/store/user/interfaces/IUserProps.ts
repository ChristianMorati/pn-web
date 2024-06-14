import { UserInfo } from "../initialState";

export interface IUserProps {
    signedIn: boolean;
    loading: boolean;
    userInfo: UserInfo;
}