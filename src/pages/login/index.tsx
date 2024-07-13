import React, { useState, ChangeEvent, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { loginAsync } from '../../store/user/thunks';
import Input from '../../components/trasaction/input';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../utils';

// Função para validar email
const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

// Função para validar senha (mínimo de 6 caracteres)
const validatePassword = (password: string): boolean => {
    return password.length >= 6;
};

// Componente para exibir dicas/erros
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

const Login: React.FC = () => {
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errors, setErrors] = useState<{ [key: string]: string | null }>({
        email: null,
        password: null,
        form: null,
    });
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate();

    useEffect(() => {
        setErrors({
            email: validateEmail(email) ? null : 'Deve conter um email válido.',
            password: validatePassword(password) ? null : 'A senha deve ter no mínimo 6 caracteres.',
            form: null,
        });
    }, [email, password]);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const resultAction = await dispatch(loginAsync({ username: email, password: password }));

            if (loginAsync.fulfilled.match(resultAction)) {
                const user = resultAction.payload;
                console.log(user);
                navigate("/");
            } else {
                throw new Error('Failed to login');
            }
        } catch (error) {
            showToast("error", {
                header: "OPS...",
                text: "verifique suas credenciais!"
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='text-slate-50'>
            <h1 className="text-2xl mb-4">Minha Conta</h1>
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
                <div className="flex flex-row justify-center items-center">
                    <button
                        onClick={handleSubmit}
                        disabled={!!errors.email || !!errors.password || isSubmitting}
                        className={`py-2 px-4 mt-4 font-bold text-white rounded transition-colors duration-300 ${!!errors.email || !!errors.password || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-500'}`}
                    >
                        {isSubmitting ? 'Enviando...' : 'Entrar'}
                    </button>
                </div>
                {errors.form && <Tip message={errors.form} />}
            </div>
        </div>
    );
};

export default Login;
