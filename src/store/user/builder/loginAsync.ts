import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { IUserProps } from "../interfaces/IUserProps";
import { loginAsync } from "../thunks";
import { UserInfo } from "../initialState";

const loginAsyncBuilder = (
    builder: ActionReducerMapBuilder<IUserProps>,
) => {
    builder
        .addCase(loginAsync.fulfilled, (state, action: PayloadAction<UserInfo>) => {
            console.log(state.userInfo);

            state.userInfo = action.payload;

            localStorage.setItem('@User', JSON.stringify(action.payload));
            localStorage.setItem('TOKEN', action.payload.access_token);

            state.loading = false;
            state.signedIn = true;
        })
        .addCase(loginAsync.pending, (state, action) => {
            state.loading = true;
        })
        .addCase(loginAsync.rejected, (state, action) => {
            state.loading = false;
        })
}

export default loginAsyncBuilder;