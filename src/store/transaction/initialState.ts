export type TransactionItem = {
    id: number,
    amount: number,
    payerUserId: number,
    payeePixKey: string,
    accountId: number,
    payeePixKeyType: string
    type: string
    date: Date,
    success?: boolean
}

export interface TransactionState {
    transaction: TransactionItem,
    myTransactions: TransactionItem[],
    error: any,
    status: string | null;
    loadMyTransactionsStatus: string | null;
    loadMyTransactionsError: any;
}

export const initialState: TransactionState = {
    transaction: {} as TransactionItem,
    myTransactions: [],
    error: null,
    status: null,
    loadMyTransactionsStatus: null,
    loadMyTransactionsError: null,
};