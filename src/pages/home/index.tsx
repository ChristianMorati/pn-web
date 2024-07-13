import React, { useEffect, useState, useCallback } from 'react';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { loadMyAccountData } from '../../store/account/thunks';
import MyAccount from '../../components/my-account';
import { ContainerGradient } from '../../styled-components/containers';
import Transactions from '../../components/transactions';
import { loadMyTransactions } from '../../store/transaction/thunks';
import QRCodeBilling from '../../components/qrcode-billing';
import './index.css';
import PixKeyValidation from '../../components/trasaction';
import { TransactionObservable } from '../../sse/transaction';
import AddBalance from '../../components/add-balance';

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

    useEffect(() => {
        var transactionObservable: TransactionObservable;
        if (userInfo.user.username) {
            transactionObservable = new TransactionObservable({ userId: userInfo.user.id });
            transactionObservable.listenToIncomingTransaction();
        }

        return () => {
            if (transactionObservable) {
                transactionObservable.stopListeningToIncomingTransaction();
            }
        };
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
                <div className='h-[100vh] w-[100vw] grid place-items-center'>
                    <div className="loader" />
                </div>
            ) : (
                <div className='p-2 flex-col gap-2 w-[100%] md:w-[90%] lg:w-[70%] mx-auto' style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <ContainerGradient className='w-[100%]'>
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
                        <ContainerGradient>
                            <AddBalance />
                        </ContainerGradient>
                    </div >
                </div >
            )}
        </>
    );
}

export default HomeScreen;
