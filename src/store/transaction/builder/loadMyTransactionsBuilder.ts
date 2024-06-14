import { ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { loadMyTransactions } from "../thunks";
import { TransactionItem } from "../initialState";

export const loadMyTransactionsBuilder = (
    builder: ActionReducerMapBuilder<any>,
) => {
    builder
        .addCase(loadMyTransactions.fulfilled, (state, action: PayloadAction<TransactionItem[]>) => {
            state.loadMyTransactionsStatus = 'succeeded';
            state.myTransactions = action.payload;
        })
        .addCase(loadMyTransactions.pending, (state) => {
            state.loadMyTransactionsStatus = 'loading';
            state.loadMyTransactionsError = null;
        })
        .addCase(loadMyTransactions.rejected, (state, action) => {
            state.loadMyTransactionsStatus = 'failed';
            state.loadMyTransactionsError = action.error.message;
        });
}