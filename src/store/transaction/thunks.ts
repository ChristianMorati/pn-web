import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../services/http-client";

type createTransactionParams = {
    amount: number,
    payeePixKey: string
}

export const createTransaction = createAsyncThunk(
    'transaction/create',
    async ({ amount, payeePixKey }: createTransactionParams, { rejectWithValue }) => {
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
                    payeePixKey
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
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
            console.log("loadMyTransactions: ",account)
            const token = localStorage.getItem('TOKEN');
            const response = await httpClient.request(`transaction/all/${account.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
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