import React, { useState, ChangeEvent, useEffect } from 'react';
import Input from '../../shared/trasaction/input';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { signUpAsync } from '../../store/user/thunks';
import { useNavigate } from 'react-router-dom';
import { setSignedIn } from '../../store/user/actions';

// Função para validar email
const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Função para validar senha (mínimo de 6 caracteres)
const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

// Função para validar CPF (formato XXX.XXX.XXX-XX ou apenas números)
const validateCPF = (cpf: string): boolean => {
    const re = /^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/;
    return re.test(cpf);
};

// Função para validar nome completo (mínimo de 6 caracteres e sem números)
const validateName = (name: string): boolean => {
    const re = /^[A-Za-z\s]{6,}$/;
    return re.test(name);
};

// Componente principal
const SignUp: React.FC = () => {
    const [step, setStep] = useState<number>(1);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({
        email: null,
        password: null,
        cpf: null,
        name: null,
    });
    const [success, setSuccess] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Validações em tempo real
    useEffect(() => {
        if (step === 1) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                email: validateEmail(email) ? null : 'Deve conter um email válido.',
                password: validatePassword(password) ? null : 'A senha deve ter no mínimo 6 caracteres.',
            }));
        } else if (step === 2) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                name: validateName(name) ? null : 'O nome deve ter no mínimo 6 caracteres e não pode conter números.',
                cpf: validateCPF(cpf) ? null : 'Por favor, insira um CPF válido.',
            }));
        }
    }, [email, password, name, cpf, step]);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleCpfChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCpf(e.target.value);
    };

    const handleNextStep = () => {
        if (!errors.email && !errors.password) {
            setStep(2);
        }
    };

    const handleSubmit = () => {
        setIsSubmitting(true);
        const cleanedCpf = cpf.replace(/\D/g, '');

        dispatch(signUpAsync({ username: email, password, name, cpf: cleanedCpf })).then((data) => {
            console.log(data)
            navigate('/');
        }).catch((e) => {
            console.log(e);
        })

        setIsSubmitting(false);
    };

    interface TipProps {
        message: string;
    }

    const Tip: React.FC<TipProps> = ({ message }) => {
        return (
            <div className="text-sm text-yellow-400 mt-1">
                {message}
            </div>
        );
    };

    return (
        <div className='text-slate-50'>
            <h1 className="text-2xl mb-4">Cadastro</h1>
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
                <div className="mb-6">
                    {errors.email && <Tip message={errors.email} />}
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        handleChange={handleEmailChange}
                    />
                    {errors.password && <Tip message={errors.password} />}
                    <Input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        handleChange={handlePasswordChange}
                    />
                    <button
                        onClick={handleNextStep}
                        disabled={!!errors.email || !!errors.password}
                        className={`py-2 px-4 mt-4 font-bold text-white rounded transition-colors duration-300 ${!!errors.email || !!errors.password ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-500'}`}
                    >
                        Próximo
                    </button>
                </div>
            )}
            {step === 2 && (
                <div className="mb-6">
                    {errors.name && <Tip message={errors.name} />}
                    <Input
                        type="text"
                        placeholder="Nome Completo"
                        value={name}
                        handleChange={handleNameChange}
                    />
                    {errors.cpf && <Tip message={errors.cpf} />}
                    <Input
                        type="text"
                        placeholder="CPF"
                        value={cpf}
                        handleChange={handleCpfChange}
                    />
                    <div className="flex justify-between">
                        <button
                            onClick={() => setStep(1)}
                            className="py-2 px-4 mt-4 bg-slate-600 text-white rounded hover:bg-slate-500 transition-colors duration-300"
                        >
                            Voltar
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!!errors.name || !!errors.cpf || !name || !cpf || isSubmitting}
                            className={`py-2 px-4 mt-4 font-bold text-white rounded transition-colors duration-300 ${!!errors.name || !!errors.cpf || !name || !cpf || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-500'}`}
                        >
                            {isSubmitting ? 'Enviando...' : 'Cadastrar'}
                        </button>
                    </div>
                </div>
            )}
            {success && <div className="p-2 bg-green-600 font-bold text-green-50 mt-2">{success}</div>}
        </div>
    );
};

export default SignUp;
