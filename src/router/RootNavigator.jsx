import React, { useEffect, useState } from "react";
import { setSignedIn, setUserInfo } from "../store/user/actions";
import { useAppSelector } from "../store/hooks/useAppSelector";
import { useAppDispatch } from "../store/hooks/useAppDispatch";
import { updateTokens } from "../services/jwt";
import AuthRouter from "./AuthRouter";
import AuthScreen from "../pages/LoginScreen";
import NonAuthRouter from "./NonAuthRouter";
import './index.css';

export default function RootNavigator() {
    const [isLoading, setIsLoading] = useState(true);
    const { signedIn } = useAppSelector(store => store.user);
    const dispatch = useAppDispatch();

    const checkIfIsAuthtenticated = async () => {
        try {
            const user = localStorage.getItem("@User");
            if (!user) {
                throw new Error("Sem dados de Usuário");
            }

            const userData = JSON.parse(user);
            if (!userData.access_token) {
                throw new Error("Access token não encontrado");
            }

            const tokens = {
                access_token: userData.access_token,
                refresh_token: userData.refresh_token,
            }

            const updatedTokens = await updateTokens(tokens);
            if (!updatedTokens) {
                throw new Error("falha ao atualizar tokens");
            }

            dispatch(setUserInfo(userData));
            dispatch(setSignedIn(true));
        } catch (error) {
            dispatch(setSignedIn(false));
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkIfIsAuthtenticated();
    }, []);

    return (
        <>
            {isLoading ? (
                <div className="index">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {signedIn ? <AuthRouter /> : <NonAuthRouter />}
                </>
            )}
        </>
    );
};