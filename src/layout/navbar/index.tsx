import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../logo';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { logOff } from '../../store/user/actions';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { themeColors } from '../../theme/colors';

export default function Navbar() {
    const dispatch = useAppDispatch();
    const { userInfo } = useAppSelector(store => store.user);
    return (
        <nav className="flex justify-between items-center text-white p-4" style={{ backgroundColor: themeColors.primary }}>
            <div className="flex items-center space-x-4">
                <Logo />
            </div>

            <div className="flex items-center space-x-4">
                {userInfo.access_token && (
                    <>
                        <Link to={"/login"} onClick={() => dispatch(logOff())} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">Sair</Link>
                    </>
                )}
            </div>
        </nav>
    );
}
