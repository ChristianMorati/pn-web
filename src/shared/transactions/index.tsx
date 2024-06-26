import React, { useEffect } from "react";
import { themeColors } from "../../theme/colors";
import { formatToCurrencyBRL, formatToDateBRL } from "../../utils";
import { ContainerGradient } from "../../styled-components/containers";
import { TransactionItem } from "../../store/transaction/initialState";
import { useAppSelector } from "../../store/hooks/useAppSelector";
import { PixKey } from "../../store/account/initialState";
import RefundTransactionButton from "../refund-button";

interface TransactionsProps {
    myTransactions: TransactionItem[];
    loadMyTransactionsStatus: string;
    loadMyTransactionsError: string;
    handleReload: () => void;
}

export default function Transactions({
    myTransactions,
    loadMyTransactionsStatus,
    loadMyTransactionsError,
    handleReload
}: TransactionsProps) {
    const { account } = useAppSelector(store => store.account);

    return (
        <>
            {loadMyTransactionsStatus === 'loading' && (
                <div className="flex items-center justify-center h-full bg-primary">
                    <div className="loader"></div>
                </div>
            )}

            {loadMyTransactionsStatus === 'failed' && (
                <div className="flex flex-col items-center justify-center h-full bg-primary">
                    <p className="text-lg text-error">OPS... {loadMyTransactionsError}</p>
                    <button className="p-4 rounded-lg m-2 bg-error text-color font-bold uppercase" onClick={handleReload}>
                        Tentar novamente
                    </button>
                </div>
            )}

            {loadMyTransactionsStatus === 'succeeded' && myTransactions && (
                <div className="overflow-hidden">
                    <div className="">
                        <p className="pt-2 font-medium text-xl mb-2" style={{ color: themeColors.color }}>Minhas Transações</p>
                        {myTransactions.length > 0 ? (
                            <>
                                {myTransactions.map(transaction => {
                                    const keys: PixKey[] = account.pixKeys || [];
                                    const isAdd = keys.some((pixKey: PixKey) => pixKey.value === transaction.payeePixKey);
                                    return (
                                        <div key={transaction.id}>
                                            <ContainerGradient>
                                                <p className="font-bold text-right" style={{ color: themeColors.color }}>
                                                    {formatToDateBRL(transaction.date)}
                                                </p>
                                                <p className="font-bold text-right" style={{ color: themeColors.color }}>
                                                    {isAdd && transaction.type === 'refund' ? "Foi extornada" : null}
                                                </p>
                                                <div className="flex-row justify-start py-4">
                                                    {isAdd && transaction.type === 'transaction' && (
                                                        <RefundTransactionButton
                                                            buttonText={"Devolver"}
                                                            transaction={transaction}
                                                        />
                                                    )}
                                                </div>
                                                <div className="flex flex-row justify-between pt-2">
                                                    {transaction.type === 'deposit' && (
                                                        <>
                                                            <p className="font-semibold" style={{ color: themeColors.success }}>
                                                                Depósito
                                                            </p>
                                                            <p className="font-bold text-right" style={{ color: themeColors.success }}>
                                                                <span className="material-icons" style={{ fontSize: '12px' }}>trending_up</span>
                                                                {` +${formatToCurrencyBRL(transaction.amount)}`}
                                                            </p>
                                                        </>
                                                    )}
                                                    {account.id === transaction.accountId && transaction.type === 'refund' && (
                                                        <>
                                                            <p className="font-semibold" style={{ color: themeColors.success }}>
                                                                O destinatário extornou
                                                            </p>
                                                            <p className="font-bold text-right" style={{ color: themeColors.success }}>
                                                                <span className="material-icons" style={{ fontSize: '12px' }}>trending_up</span>
                                                                {` +${formatToCurrencyBRL(transaction.amount)}`}
                                                            </p>
                                                        </>
                                                    )}

                                                    {isAdd && transaction.type === 'refund' && (
                                                        <>
                                                            <p className="font-semibold" style={{ color: themeColors.error }}>
                                                                Você extornou
                                                            </p>
                                                            <p className="font-bold text-right" style={{ color: themeColors.error }}>
                                                                <span className="material-icons" style={{ fontSize: '12px' }}>trending_down</span>
                                                                {` -${formatToCurrencyBRL(transaction.amount)}`}
                                                            </p>
                                                        </>
                                                    )}

                                                    {isAdd && transaction.type === 'transaction' && (
                                                        <>
                                                            <p className="font-semibold" style={{ color: themeColors.success }}>
                                                                Recebido
                                                            </p>
                                                            <p className="font-bold text-right" style={{ color: themeColors.success }}>
                                                                <span className="material-icons" style={{ fontSize: '12px' }}>trending_up</span>
                                                                {` +${formatToCurrencyBRL(transaction.amount)}`}
                                                            </p>
                                                        </>
                                                    )}

                                                    {!isAdd && transaction.type === 'transaction' && (
                                                        <>
                                                            <p className="font-semibold" style={{ color: themeColors.error }}>
                                                                Transferência
                                                            </p>
                                                            <p className="font-bold text-right" style={{ color: themeColors.error }}>
                                                                <span className="material-icons" style={{ fontSize: '12px' }}>trending_down</span>
                                                                {` -${formatToCurrencyBRL(transaction.amount)}`}
                                                            </p>
                                                        </>
                                                    )}
                                                </div>
                                            </ContainerGradient>
                                        </div>
                                    )
                                })}

                            </>
                        ) : (
                            <ContainerGradient lightTop>
                                <p className="font-bold text-center" style={{ color: themeColors.error }}>Sem Transações</p>
                            </ContainerGradient>
                        )}
                    </div >
                </div >
            )
            }
        </>
    );
};
