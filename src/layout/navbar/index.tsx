import React from 'react';
import { Link } from 'react-router-dom'; // Importando o Link do React Router DOM
import Logo from '../logo';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { logOff } from '../../store/user/actions';

export default function Navbar() {
    const dispatch = useAppDispatch();
    return (
        <nav className="flex justify-between items-center bg-gray-800 text-white p-4">
            {/* Links à esquerda */}
            <div className="flex items-center space-x-4">
                <Logo />
            </div>

            {/* Botões à direita */}
            <div className="flex items-center space-x-4">
                <Link to={"auth"} onClick={() => dispatch(logOff())} className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md">Login</Link>
                <Link to={"auth"} onClick={() => dispatch(logOff())} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md">Signup</Link>
                <Link to={"auth"} onClick={() => dispatch(logOff())} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Sair</Link>
            </div>
        </nav>
    );
}
