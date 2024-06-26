import React, { useEffect, useState, useCallback } from 'react';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { loadMyAccountData } from '../../store/account/thunks';
import MyAccount from '../../shared/my-account';
import { ContainerGradient } from '../../styled-components/containers';
import Transactions from '../../shared/transactions';
import { loadMyTransactions } from '../../store/transaction/thunks';
import QRCodeBilling from '../../shared/qrcode-billing';
import './index.css';
import PixKeyValidation from '../../shared/trasaction';

const HomeScreen: React.FC = () => {
    const dispatch = useAppDispatch();
    const { account, error: accountError, status: accountStatus } = useAppSelector(store => store.account);
    const { userInfo } = useAppSelector(store => store.user);
    const { myTransactions, loadMyTransactionsStatus, loadMyTransactionsError } = useAppSelector(store => store.transaction);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (userInfo) {
            const loadApp = async () => {
                try {
                    await dispatch(loadMyAccountData()).unwrap();
                    await dispatch(loadMyTransactions()).unwrap();
                } catch (error) {
                    console.error("Failed to load data: ", error);
                } finally {
                    setLoading(false);
                }
            };

            loadApp();
        }
    }, [dispatch, userInfo]);

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
                            <PixKeyValidation />
                        </ContainerGradient>
                        <ContainerGradient className='md:flex-1 md:basis-1/2 lg:flex-none'>
                            <QRCodeBilling
                                accountId={account?.id}
                                pixKey={account?.pixKeys[0]}
                            />
                        </ContainerGradient>
                        {myTransactions.length > 0 && (
                            <ContainerGradient className='md:flex-1 md:basis-1/2 lg:flex-none h-[300px] overflow-y-auto snap-y custom-scrollbar'>
                                <Transactions
                                    myTransactions={myTransactions.slice(0, 5) || []}
                                    loadMyTransactionsStatus={loadMyTransactionsStatus || ""}
                                    loadMyTransactionsError={loadMyTransactionsError || ""}
                                    handleReload={handleReload}
                                />
                            </ContainerGradient>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default HomeScreen;
