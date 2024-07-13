import React, { ChangeEvent, useState } from "react";
import { themeColors } from "../../theme/colors";
import { formatToCurrencyBRL, showToast } from "../../utils";
import { addBalanceToMyAccount } from "../../store/account/thunks";
import { useAppDispatch } from "../../store/hooks/useAppDispatch";
import Input from "../trasaction/input";
import { deposit } from "../../store/account/actions";
import colors from "tailwindcss/colors";
import { Title } from "../../styled-components/text";
import { addTransaction } from "../../store/transaction/actions";

const AddBalance: React.FC = () => {
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const dispatch = useAppDispatch();

    const applyCurrencyMask = (value: string): string => {
        const onlyDigits = value.replace(/\D/g, '');
        const formattedValue = (Number(onlyDigits) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return formattedValue;
    };

    const convertToFloat = (text: string) => {
        return parseFloat(text.replace(/\./g, '').replace(',', '.').replace('R$', ''));
    }

    const isValidAmount = (value: string): boolean => {
        const parsed = convertToFloat(value);
        return !isNaN(parsed) && parsed >= 0.50;
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const maskedValue = applyCurrencyMask(e.target.value);
        validateMoneyInput(maskedValue);
        setAmount(maskedValue);
    };

    const validateMoneyInput = (text: string) => {
        const amount = text;

        if (!isValidAmount(amount)) {
            setError('Valor abaixo do mínimo: 0,50');
            return;
        }
        setError('');
    };

    const handleAddAmountToBalance = async () => {
        setLoading(true);

        const AmountToBalance = convertToFloat(amount);

        try {
            const resultAction = await dispatch(addBalanceToMyAccount({ amount: AmountToBalance }));

            if (addBalanceToMyAccount.fulfilled.match(resultAction)) {
                dispatch(deposit(AmountToBalance));
                
                const transaction = resultAction.payload;
                dispatch(addTransaction(transaction));
                showToast('success', `Foi adicionado ${formatToCurrencyBRL(AmountToBalance)} na sua conta.`);
            } else {
                showToast('error', `Falha ao depositar.`);
            }
        } catch (error) {
            showToast('error', `Falha ao depositar.`);
        } finally {
            setLoading(false);
        }
        setAmount('');
    };

    return (
        <div>
            <p className='text-left p-2 bg-orange-200 text-orange-600 font-bold'>DEV | DEPÓSITO</p>
            <Title>Quanto iremos adicionar</Title>
            <Input
                type="text"
                value={amount}
                handleChange={handleAmountChange}
                placeholder="Digite o valor"
            />
            <div className="flex justify-center items-center my-2">
                {error && <p className='text-left p-2 bg-red-200 text-red-600 font-bold'>{error}</p>}
                {(!error && isValidAmount(amount)) && (
                    <button
                        className="py-2 px-4 mt-4 bg-green-800 font-bold text-white rounded hover:bg-green-900 transition-colors duration-300 capitalize"
                        onClick={handleAddAmountToBalance}
                        disabled={loading}
                    >
                        depositar
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddBalance;
