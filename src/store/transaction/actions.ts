import { transactionReducer } from "./slice";

export const {
    addTransaction,
    changeTypeOfTransactionToRefund,
} = transactionReducer.actions;