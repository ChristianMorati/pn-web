import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL_API, httpClient } from "../../services/http-client";
import { store } from "..";

export const loadMyAccountData = createAsyncThunk(
    'account/loadMyAccountData',
    async () => {
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

            const response = await httpClient.request(`account/user/${userData.user.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response) {
                throw new Error('Failed to load user data');
            }

            return response;
        } catch (error) {
            return Promise.reject({ message: "Falha ao carregar os dados da conta" });
        }
    }
);

type findUserByPixKeyParams = {
    pixKey: string
}

export const findUserByPixKey = createAsyncThunk(
    'account/loadMyAccountData',
    async ({ pixKey }: findUserByPixKeyParams) => {
        try {
            const token = localStorage.getItem('TOKEN');
            const response = await httpClient.request(`user/pixKey/${pixKey}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.data) {
                throw new Error('Failed to load user data');
            }

            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }
    }
);

type AddBalanceToMyAccountParams = {
    amount: number;
};

export const addBalanceToMyAccount = createAsyncThunk<
    any,
    AddBalanceToMyAccountParams
>(
    'account/deposit',
    async ({ amount }, { rejectWithValue }) => {
        const { account } = store.getState().account;
        try {
            const response = await fetch(BASE_URL_API + 'account/deposit', {
                method: 'POST',
                body: JSON.stringify({
                    accountId: account.id,
                    amount
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Falha ao adicionar saldo na conta');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue({ message: "Falha ao adicionar saldo na conta" });
        }
    }
);