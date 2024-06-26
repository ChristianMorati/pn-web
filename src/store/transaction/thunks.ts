import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../services/http-client";
import { TransactionItem } from "./initialState";

type createTransactionParams = {
    amount: number,
    payeePixKey: string
    payeePixKeyType: string
}

export const createTransaction = createAsyncThunk(
    'transaction/create',
    async ({ amount, payeePixKey, payeePixKeyType }: createTransactionParams, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('TOKEN');
            if (!token) {
                throw new Error('Token not found');
            }

            const user = localStorage.getItem('@User');
            if (!user) {
                throw new Error('User data not found');
            }

            const userData = JSON.parse(user);

            const response = await httpClient.request(`transaction`, {
                method: "POST",
                body: JSON.stringify({
                    amount: amount,
                    payerUserId: userData.user.id,
                    payeePixKey,
                    payeePixKeyType
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.success) {
                throw new Error('Failed to create transaction');
            }

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const refundTransaction = createAsyncThunk(
    'transaction/refund',
    async (transaction: TransactionItem, { rejectWithValue }) => {
        try {
            const token = localStorage.getItem('TOKEN');
            if (!token) {
                throw new Error('Token not found');
            }

            const response = await httpClient.request(`transaction/refund`, {
                method: "POST",
                body: JSON.stringify(transaction),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.success) {
                throw new Error('Failed to create transaction');
            }

            return response;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const loadMyTransactions = createAsyncThunk(
    'transaction/allByAccountId',
    async (_, { getState }: any) => {
        const { account } = getState()?.account;

        try {
            console.log("loadMyTransactions: ", account)
            const response = await httpClient.request(`transaction/all/${account.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response) {
                throw new Error('Failed to load user data');
            }

            return response;
        } catch (error) {
            return Promise.reject({ message: "Aconteceu algum erro" });
        }
    }
);