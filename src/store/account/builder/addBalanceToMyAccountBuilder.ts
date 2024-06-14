import { addBalanceToMyAccount } from "../thunks";
import { AccountState } from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";

export const addBalanceToMyAccountBuilder = {
    addCase: (builder: any) => {
        builder
            .addCase(addBalanceToMyAccount.fulfilled, (state: AccountState, action: PayloadAction<any>) => {
                state.statusAddingAmountToBalance = 'succeeded';
                state.statusAddingAmountToBalanceLoading = false;
                state.account = action.payload;
            })
            .addCase(addBalanceToMyAccount.pending, (state: AccountState) => {
                state.statusAddingAmountToBalance = 'loading';
                state.statusAddingAmountToBalanceLoading = true;
                state.error = null;
            })
            .addCase(addBalanceToMyAccount.rejected, (state: AccountState, action: PayloadAction<any>) => {
                state.statusAddingAmountToBalance = 'failed';
                state.error = action.payload ? action.payload : 'Unknown error';
                state.statusAddingAmountToBalanceLoading = false;
            });
    }
};
