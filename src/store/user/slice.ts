import { createSlice } from '@reduxjs/toolkit';
import loginAsyncBuilder from './builder/loginAsync';
import { UserInfo, initialState } from './initialState';
import { IUserProps } from './interfaces/IUserProps';
import signUpAsyncBuilder from './builder/signUpAsync';

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logOff(state: IUserProps) {
            localStorage.clear();
            state.signedIn = false;
            state.userInfo = {} as UserInfo;
        },
        setSignedIn(state, action) {
            state.signedIn = action.payload;
        },
        setUserInfo(state, action) {
            state.userInfo = action.payload;
        },
    },
    extraReducers: (builder) => {
        loginAsyncBuilder(builder);
        signUpAsyncBuilder(builder);
    },
});