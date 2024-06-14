import React, { useState, ChangeEvent } from 'react';
import Input from './input/';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { useAppSelector } from '../../store/hooks/useAppSelector';
import { createTransaction } from '../../store/transaction/thunks';
import { withdraw } from '../../store/account/actions';
import { TransactionItem } from '../../store/transaction/initialState';
import { userService } from '../../services/user-service'; // Import the user service
import { addTransaction } from '../../store/transaction/actions';

// Definição dos tipos
type PixKeyType = 'email' | 'cpf' | 'cnpj' | 'phone' | 'random';

interface KeyRegex {
    type: PixKeyType;
    regex: RegExp;
}

// Função para formatar o valor monetário
const formatCurrency = (value: string): string => {
    const onlyDigits = value.replace(/\D/g, '');
    const formattedValue = (Number(onlyDigits) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    return formattedValue;
};

const keys: KeyRegex[] = [
    { type: 'email', regex: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]+$/ },
    { type: 'cpf', regex: /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/ },
    { type: 'cnpj', regex: /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/ },
    { type: 'phone', regex: /^\+?\d{1,2}?\(?\d{2}\)?\d{4,5}-?\d{4}$/ },
    { type: 'random', regex: /^[0-9a-fA-F]{32}$/ },
];

// Componente principal
const PixKeyValidation: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [pixKey, setPixKey] = useState<{ value: string | null, type: PixKeyType | null }>({ value: '', type: null });
    const [amount, setAmount] = useState<string>('');
    const [validKeys, setValidKeys] = useState<PixKeyType[] | null>([]);
    const [userName, setUserName] = useState<string | null>(null); // State to store user name
    const [messages, setMessages] = useState<{ error: null | string, success: null | string }>({
        error: null,
        success: null,
    });

    const dispatch = useAppDispatch();
    const { account } = useAppSelector((store) => store.account);

    const handlePixKeyChange = (e: ChangeEvent<HTMLInputElement>) => {
        const key: string = e.target.value;
        const validKeys: PixKeyType[] = keys.filter(({ regex }) => regex.test(key)).map(({ type }) => type);
        setPixKey({ value: key, type: null }); // Resetar tipo de chave e valor
        setValidKeys(validKeys); // Atualizar validKeys
        setUserName(null); // Limpar nome do usuário
        setMessages({ error: null, success: null }); // Limpar mensagens de erro/sucesso
    };

    const handlePixKeyTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedType: PixKeyType = e.target.value as PixKeyType;
        setPixKey({ ...pixKey, type: selectedType });
        if (validKeys!.length >= 1 && selectedType && pixKey.value) {
            userService.findUserByPixKey(pixKey.value)
                .then(user => {
                    console.log(user.name);
                    if (!user.name) {
                        throw new Error("Usuário não encontrado");
                    }
                    setUserName(user.name);
                    setStep(2);
                }).catch(() => {
                    console.log('dbhdcb');
                    setPixKey({ value: null, type: null });
                    setMessages({
                        error: 'Ocorreu um erro ao buscar o usuário. Tente novamente mais tarde.',
                        success: null,
                    });
                });
        }
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const formattedValue = formatCurrency(e.target.value);
        setAmount(formattedValue);
        setMessages({ error: null, success: null });
    };

    const convertToFloat = (text: string) => {
        return parseFloat(text.replace(/\./g, '').replace(',', '.').replace('R$', ''));
    };

    const isValidAmount = (value: string) => {
        const parsed = convertToFloat(value);
        return !isNaN(parsed) && parsed > 0.50;
    };

    const handleSubmit = async () => {
        if (isValidAmount(amount) && pixKey.type && pixKey.value) {
            const parsedAmount = convertToFloat(amount);
            try {
                if (account.balance < parsedAmount) {
                    setMessages({
                        error: "Saldo insuficiente!",
                        success: null,
                    });
                    return;
                }

                const transaction: TransactionItem = await dispatch(createTransaction({ amount: parsedAmount, payeePixKey: pixKey.value })).unwrap();

                if (!transaction) {
                    throw new Error("Erro ao efetuar a transação");
                }

                dispatch(withdraw(transaction.amount));
                dispatch(addTransaction(transaction));
                setAmount('');
                setStep(1);
                setPixKey({ value: null, type: null });
                setValidKeys(null);
                setMessages({
                    error: null,
                    success: "Transação realizada com sucesso!",
                });
            } catch (err: unknown) {
                setMessages({
                    error: "Erro ao efetuar a transação",
                    success: null,
                });
            }
        } else {
            setMessages({
                error: 'Por favor, insira um valor monetário maior que R$ 0,50.',
                success: null,
            });
        }
    };

    const handleBack = () => {
        if (step > 1) {
            setStep(step => step - 1);
        }
    };

    return (
        <div className='text-slate-50'>
            <h1 className="text-2xl mb-4">Enviar Pix</h1>
            <div className="mb-4 flex items-center">
                <div className="flex items-center flex-grow">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step === 1 ? 'bg-orange-400' : 'bg-slate-600'} transition-colors duration-300`}>
                        1
                    </div>
                    <div className={`h-1 flex-grow ${step >= 2 ? 'bg-orange-400' : 'bg-slate-600'} transition-colors duration-300`}></div>
                </div>
                <div className="flex items-center flex-grow">
                    <div className={`h-1 flex-grow ${step >= 2 ? 'bg-orange-400' : 'bg-slate-600'} transition-colors duration-300`}></div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${step === 2 ? 'bg-orange-400' : 'bg-slate-600'} transition-colors duration-300`}>
                        2
                    </div>
                </div>
            </div>
            {step === 1 && (
                <div className="mb-6 flex flex-col justify-between items-center">

                    <Input
                        type="text"
                        placeholder="Chave PIX"
                        value={pixKey.value || ''}
                        handleChange={handlePixKeyChange}
                    />
                    {messages.success && <div className="p-2 bg-green-600 font-bold text-green-50 mt-2">{messages.success}</div>}
                    {validKeys && validKeys.length > 0 && (
                        <div className="mt-10">
                            <label className="block mb-4 text-lg font-semibold">Qual o tipo da Chave?</label>
                            {validKeys.map((key, index) => (
                                <div
                                    key={index}
                                    className="mb-2"
                                >
                                    <input
                                        type="radio"
                                        id={key}
                                        name="pixKeyType"
                                        value={key}
                                        onChange={handlePixKeyTypeChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor={key}
                                        className="flex items-center p-2 bg-slate-700 rounded-md cursor-pointer hover:bg-slate-600 transition-colors duration-300 group"
                                    >
                                        <span className="w-4 h-4 mr-2 flex items-center justify-center border-2 border-white rounded-full group-hover:bg-orange-400 transition-colors duration-300">
                                            <span className="w-2 h-2 bg-transparent rounded-full"></span>
                                        </span>
                                        <span className="capitalize text-white">{key}</span>
                                    </label>
                                </div>
                            ))}
                        </div>
                    )}
                    {messages.error && <div className="p-2 bg-red-600 font-bold text-red-50 mt-2">{messages.error}</div>}
                </div>
            )}
            {step === 2 && (
                <div className="mb-6 flex flex-col justify-between">
                    {userName && <div className="text-lg mb-4">Usuário: {userName}</div>}
                    <div>
                        <Input
                            type="text"
                            placeholder="R$"
                            value={amount}
                            handleChange={handleAmountChange}
                        />
                        {messages.error && <div className="p-2 bg-red-600 font-bold text-red-50 mt-2">{messages.error}</div>}
                    </div>
                    <div className="flex justify-between">
                        <button
                            onClick={handleBack}
                            className="py-2 px-4 mt-4 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors duration-300"
                        >
                            Voltar
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="py-2 px-4 mt-4 bg-orange-400 font-bold text-white rounded hover:bg-orange-500 transition-colors duration-300"
                        >
                            Transferir
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PixKeyValidation;
