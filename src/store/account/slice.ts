import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState'
import { loadMyAccountDataBuilder } from './builder/loadMyAccountDataBuilder';

export const accountReducer = createSlice({
    name: 'account',
    initialState,
    reducers: {
        deposit(state, action: PayloadAction<number>) {
            state.account.balance += action.payload;
        },
        withdraw(state, action: PayloadAction<number>) {
            state.account.balance -= action.payload;
        },
    },
    extraReducers: (builder) => {
        loadMyAccountDataBuilder(builder)
    },
});