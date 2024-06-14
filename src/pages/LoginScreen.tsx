import React, { useState } from "react";
import { ContainerGradient } from "../styled-components/containers";
import Login from "./login";
import SignUp from "./signup";


export default function AuthScreen() {

    const [showSignup, setShowSignup] = useState(false);

    return (
        <div className="w-full h-full flex flex-col p-4 justify-center items-center">
            {showSignup ? (
                <ContainerGradient className="w-full md:w-[400px] lg:w-[450px]">
                    <SignUp />
                    <button onClick={() => setShowSignup(!showSignup)} className="text-orange-400 hover:text-orange-300 text-lg pb-1">
                        entrar
                    </button>
                </ContainerGradient>
            ) : (
                <ContainerGradient className="w-full md:w-[400px] lg:w-[450px]">
                    <Login />
                    <button onClick={() => setShowSignup(!showSignup)} className="text-orange-400 hover:text-orange-300 text-lg pb-1">
                        crie uma conta
                    </button>
                </ContainerGradient>
            )}
        </div>
    )
}