import { createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL_API } from "../../services/http-client";

type UserLogin = {
    username: string,
    password: string
}

type UserSignUp = {
    name: string,
    username: string,
    password: string,
    cpf?: string,
}

export const loginAsync = createAsyncThunk(
    "user/login",
    async (formData: UserLogin, { rejectWithValue }) => {
        try {
            const response = await fetch(BASE_URL_API + 'auth/signin', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const error = await response.json();
                return rejectWithValue(error);
            }

            const user = await response.json();
            return user;
        } catch (e) {
            return rejectWithValue(e);
        }
    }
);

export const signUpAsync = createAsyncThunk(
    "user/signup",
    async (formData: UserSignUp, { rejectWithValue }) => {
        try {
            const response = await fetch(BASE_URL_API + 'auth/signup', {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                return rejectWithValue(errorData.message || 'Failed to Create account');
            }

            const data = await response.json();
            return data;
        } catch (error) {
            return rejectWithValue('Failed to Create account');
        }
    }
);