import { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import { loadMyAccountData } from "../thunks";
import { AccountState } from "../initialState";

export const loadMyAccountDataBuilder = (
    builder: ActionReducerMapBuilder<any>,
) => {
    builder
        .addCase(loadMyAccountData.fulfilled, (state: AccountState, action) => {
            state.status = 'succeeded';
            state.account = action.payload;
        })
        .addCase(loadMyAccountData.pending, (state: AccountState) => {
            state.status = 'loading';
            state.error = null;
        })
        .addCase(loadMyAccountData.rejected, (state: AccountState, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        });
}