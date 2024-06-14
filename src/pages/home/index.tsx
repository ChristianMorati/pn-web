import React, { useEffect, useCallback, useState } from 'react';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { loadMyAccountData } from '../../store/account/thunks';
import MyAccount from '../../shared/my-account';
import { ContainerGradient } from '../../styled-components/containers';
import Transactions from '../../shared/transactions';
import { loadMyTransactions } from '../../store/transaction/thunks';
import PixTransactionForm from '../../shared/trasaction';
import QRCodeBilling from '../../shared/qrcode-billing';
import './index.css';

const HomeScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { account, error: accountError, status: accountStatus } = useAppSelector(store => store.account);
    const { myTransactions, loadMyTransactionsStatus, loadMyTransactionsError } = useAppSelector(store => store.transaction);

    const [loading, setLoading] = useState(true);

    async function loadApp() {
        try {
            const account = await dispatch(loadMyAccountData());
            if (account.payload.id) {
                await dispatch(loadMyTransactions());
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        loadApp();
    }, []);

    const handleAccountReload = useCallback(() => {
        dispatch(loadMyAccountData());
    }, [dispatch]);

    const handleReload = useCallback(() => {
        if (account && account.id) {
            dispatch(loadMyTransactions());
        }
    }, [dispatch, account]);

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className='p-2 flex-col gap-2 w-[100%] md:w-[90%] lg:w-[70%] mx-auto' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <ContainerGradient className='w-[100%] h-[150px]'>
                        <MyAccount
                            account={account} error={accountError} status={accountStatus || ""} handleReload={handleAccountReload}
                        />
                    </ContainerGradient>
                    <div className='main-actions'>
                        <ContainerGradient className='md:flex-1 md:basis-1/2 lg:flex-none'>
                            <PixTransactionForm />
                        </ContainerGradient>
                        <ContainerGradient className='md:flex-1 md:basis-1/2 lg:flex-none'>
                            <QRCodeBilling accountId={account.id} pixKey={account.pixKeys[0].value} />
                        </ContainerGradient>
                        <ContainerGradient className='md:flex-1 md:basis-1/2 lg:flex-none h-[300px] overflow-y-auto snap-y custom-scrollbar'>
                            <Transactions
                                myTransactions={myTransactions.slice(0, 5) || []}
                                loadMyTransactionsStatus={loadMyTransactionsStatus || ""}
                                loadMyTransactionsError={loadMyTransactionsError || ""}
                                handleReload={handleReload}
                            />
                        </ContainerGradient>
                    </div>
                </div>
            )}
        </>
    );
}

export default HomeScreen;
