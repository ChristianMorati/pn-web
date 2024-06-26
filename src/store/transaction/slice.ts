import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TransactionItem, initialState } from './initialState'
import { createTransactionBuilder } from './builder/createTransactionBuilder';
import { loadMyTransactionsBuilder } from './builder/loadMyTransactionsBuilder';

export const transactionReducer = createSlice({
    name: 'transaction',
    initialState,
    reducers: {
        addTransaction(state, action: PayloadAction<TransactionItem>) {
            state.myTransactions.unshift(action.payload);
        },
        changeTypeOfTransactionToRefund(state, action: PayloadAction<TransactionItem>) {
            const refundedTransactionIndex = state.myTransactions.findIndex(item => item.id == action.payload.id);
            state.myTransactions[refundedTransactionIndex].type = "refund";
        },
    },
    extraReducers: (builder) => {
        createTransactionBuilder(builder)
        loadMyTransactionsBuilder(builder)
    },
});