import { addBalanceToMyAccount } from "../thunks";
import { AccountState } from "../initialState";
import { PayloadAction } from "@reduxjs/toolkit";
import { TransactionItem } from "../../transaction/initialState";
import { store } from "../..";
import { deposit } from "../actions";

export const addBalanceToMyAccountBuilder = {
    addCase: (builder: any) => {
        builder
            .addCase(addBalanceToMyAccount.fulfilled, (state: AccountState, action: PayloadAction<TransactionItem>) => {
                state.statusAddingAmountToBalance = 'succeeded';
                state.statusAddingAmountToBalanceLoading = false;
                store.dispatch(deposit(action.payload.amount));
            })
            .addCase(addBalanceToMyAccount.pending, (state: AccountState) => {
                state.statusAddingAmountToBalance = 'loading';
                state.statusAddingAmountToBalanceLoading = true;
                state.error = null;
            })
            .addCase(addBalanceToMyAccount.rejected, (state: AccountState, action: PayloadAction<any>) => {
                state.statusAddingAmountToBalance = 'failed';
                state.error = 'failed to do transaction'
                state.statusAddingAmountToBalanceLoading = false;
            });
    }
};
