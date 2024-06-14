import React, { useState, ChangeEvent, useEffect } from 'react';
import { useAppDispatch } from '../../store/hooks/useAppDispatch';
import { loginAsync } from '../../store/user/thunks';
import Input from '../../shared/trasaction/input';
import { setSignedIn } from '../../store/user/actions';
import { useNavigate } from 'react-router-dom';

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

// Componente principal de Login
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
    const [success, setSuccess] = useState<string | null>(null);
    const navigate = useNavigate();

    // Validações em tempo real
    useEffect(() => {
        setErrors({
            email: validateEmail(email) ? null : 'Deve conter um email válido.',
            password: validatePassword(password) ? null : 'A senha deve ter no mínimo 6 caracteres.',
            form: null, // Limpa o erro de formulário ao editar os campos
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
            await dispatch(loginAsync({ username: email, password: password }));
            dispatch(setSignedIn(true));
            navigate('');
        } catch (error: any) {
            console.log("Error to login")
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
                <button
                    onClick={handleSubmit}
                    disabled={!!errors.email || !!errors.password || isSubmitting}
                    className={`py-2 px-4 mt-4 font-bold text-white rounded transition-colors duration-300 ${!!errors.email || !!errors.password || isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-400 hover:bg-orange-500'}`}
                >
                    {isSubmitting ? 'Enviando...' : 'Entrar'}
                </button>
                {errors.form && <Tip message={errors.form} />}
            </div>
            {success && <div className="p-2 bg-green-600 font-bold text-green-50 mt-2">{success}</div>}
        </div>
    );
};

export default Login;
