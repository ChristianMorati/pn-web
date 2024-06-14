import { createAsyncThunk } from "@reduxjs/toolkit";
import { httpClient } from "../../services/http-client";
import { UserInfo } from "./initialState";

type UserLogin = {
    username: string,
    password: string
}

type userSignUp = {
    name: string,
    username: string,
    password: string,
    cpf?: string,
}

export const loginAsync = createAsyncThunk(
    "login/login",
    async (formData: UserLogin) => {
        try {
            const response = await httpClient.request(`auth/signin`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                return response;
            } else {
                throw new Error(`Unexpected status code: ${response}`);
            }

        } catch (error) {
            throw error;
        }
    }
);

export const signUpAsync = createAsyncThunk(
    "login/signup",
    async (formData: userSignUp) => {
        try {
            const response = await httpClient.request(`auth/signup`, {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    'Content-Type': 'application/json',
                },
            })

            if (response.status === 201) {
                return response;
            } else {
                throw new Error(`Unexpected status code: ${response}`);
            }

        } catch (error) {
            throw error;
        }
    }
);
