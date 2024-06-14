import React, { useEffect } from "react";
import { themeColors } from "../../theme/colors";
import { formatToCurrencyBRL, formatToDateBRL } from "../../utils";
import { ContainerGradient } from "../../styled-components/containers";
import { TransactionItem } from "../../store/transaction/initialState";

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
                                {myTransactions.map(transaction => (
                                    <div
                                        key={transaction.id}
                                    >
                                        <ContainerGradient>
                                            <p className="font-bold text-right" style={{ color: themeColors.color }}>
                                                {formatToDateBRL(transaction.date)}
                                            </p>

                                            <div className="flex justify-between pt-2">
                                                <p className="font-semibold" style={{ color: transaction.payeePixKey ? themeColors.error : themeColors.success }}>
                                                    {transaction.payeePixKey == null ? "Adição de Saldo" : "Transferência"}
                                                </p>
                                                {transaction.payeePixKey ? (
                                                    <p className="font-bold text-right" style={{ color: themeColors.error }}>
                                                        <i className="fa fa-arrow-trend-down" aria-hidden="true"></i>{` -${formatToCurrencyBRL(transaction.amount)}`}
                                                    </p>
                                                ) : (
                                                    <p className="font-bold text-right" style={{ color: themeColors.success }}>
                                                        <i className="fa fa-arrow-trend-up" aria-hidden="true"></i>{` +${formatToCurrencyBRL(transaction.amount)}`}
                                                    </p>
                                                )}
                                            </div>
                                        </ContainerGradient>
                                    </div>
                                ))}
                            </>
                        ) : (
                            <div className="flex flex-col pt-2 px-4 py-6 rounded-t-xl bg-white overflow-hidden">
                                <div className="bg-gradient-to-r from-secondary to-primary h-20 rounded-t-xl mb-4"></div>
                                <p className="font-bold text-center" style={{ color: themeColors.error }}>Sem Transações</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};
