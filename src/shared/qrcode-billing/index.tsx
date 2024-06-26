import React, { useState, ChangeEvent } from 'react';
import QRCodeGenerator from '../../shared/qrcode-generator';
import Input from '../../shared/trasaction/input';
import { TransactionItem } from '../../store/transaction/initialState';
import { PixKey } from '../../store/account/initialState';

interface QRCodeBillingProps {
    accountId: number;
    pixKey: PixKey;
}

const QRCodeBilling: React.FC<QRCodeBillingProps> = ({ accountId, pixKey }) => {
    const [qrValue, setQrValue] = useState('');
    const [amount, setAmount] = useState('');
    const [confirmed, setConfirmed] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const applyCurrencyMask = (value: string): string => {
        const onlyDigits = value.replace(/\D/g, '');
        const formattedValue = (Number(onlyDigits) / 100).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        return formattedValue;
    };

    const isValidAmount = (value: string): boolean => {
        const parsed = parseFloat(value.replace(/\./g, '').replace(',', '.').replace('R$', ''));
        return !isNaN(parsed) && parsed > 0.50;
    };

    const handleAmountChange = (e: ChangeEvent<HTMLInputElement>) => {
        const maskedValue = applyCurrencyMask(e.target.value);
        setError(null);
        setAmount(maskedValue);
    };

    const handleSubmit = () => {
        setError(null);
        
        if (isValidAmount(amount)) {
            const billing: Partial<TransactionItem> = {
                amount: parseFloat(amount.replace(/\./g, '').replace(',', '.').replace('R$', '')),
                accountId,
                payeePixKey: pixKey.value,
                payeePixKeyType: pixKey.type
            };
            setQrValue(JSON.stringify(billing));
            setConfirmed(true);
            setError(null);
        } else {
            setError('Por favor, insira um valor monetário válido maior que R$ 0,50.');
        }
    };

    const handleClear = () => {
        setQrValue('');
        setAmount('');
        setConfirmed(false);
        setError(null);
    };

    return (
        <div>
            <p className='text-left p-2 bg-orange-200 text-orange-600 font-bold'>Somente usuários PIXNODE</p>
            <h1 className="text-2xl my-4 text-white">Gerar cobrança QR</h1>
            {error && <div className="p-2 bg-red-600 font-bold text-red-50 mt-2">{error}</div>}
            <div className='flex flex-col justify-center items-center'>
                {!confirmed ? (
                    <>
                        <div className='py-2'>
                            <Input
                                type="text"
                                placeholder="R$"
                                value={amount}
                                handleChange={handleAmountChange}
                                disabled={confirmed}
                            />
                        </div>
                        <button
                            onClick={handleSubmit}
                            className="py-2 px-4 mt-4 bg-orange-400 font-bold text-white rounded hover:bg-orange-500 transition-colors duration-300"
                        >
                            Gerar QR Code
                        </button>
                    </>
                ) : (
                    <>
                        <QRCodeGenerator value={qrValue} size={150} />
                        <button
                            onClick={handleClear}
                            className="py-2 px-4 mt-4 bg-gray-400 font-bold text-white rounded hover:bg-gray-500 transition-colors duration-300"
                        >
                            Limpar
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}

export default QRCodeBilling;
