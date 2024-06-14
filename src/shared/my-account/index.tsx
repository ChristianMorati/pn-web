import React from 'react';
import { formatToCurrencyBRL } from '../../utils';
import { AccountItem } from '../../store/account/initialState';
import { themeColors } from '../../theme/colors';
import { Link } from 'react-router-dom';

export type MyAccountProps = {
    account: AccountItem;
    status: string;
    error: string;
    handleReload: () => void;
};

const MyAccount: React.FC<MyAccountProps> = ({ account, status, error, handleReload }) => {
    if (status === 'loading') {
        return <div className="flex items-center justify-center h-full"><div className="spinner-border text-success"></div></div>;
    }

    if (status === 'failed') {
        return (
            <div className="flex flex-col items-center justify-center h-full bg-primary">
                <p className="text-lg text-error">{error}</p>
                <button className="p-4 rounded-lg m-2 bg-error text-color font-bold uppercase" onClick={handleReload}>
                    Tentar novamente
                </button>
            </div>
        );
    }

    return (
        <>
            {status === 'succeeded' && account ? (
                <>
                    <div>
                        <div className="flex flex-row justify-between items-center">
                            <p className="font-medium text-xl" style={{ color: themeColors.color }}>conta</p>
                            <Link
                                to={"/my-transactions"}
                                className="duration-150 transition-all font-medium text-md text-orange-400 hover:text-slate-50"
                            >
                                minhas transações &gt;
                            </Link>
                        </div>
                        <div className='my-4'>
                            <p className="font-extralight text-xl" style={{ color: themeColors.color }}>Saldo disponível</p>
                            <p className="font-extralight text-4xl mt-2" style={{ color: themeColors.success }}>{formatToCurrencyBRL(account.balance)}</p>
                        </div>
                    </div>
                </>
            ) : (
                <p>No data available</p>
            )}
        </>
    );
};

export default MyAccount;
