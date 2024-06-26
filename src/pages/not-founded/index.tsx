import { Link } from 'react-router-dom';

const NotFoundScreen = () => {
    return (
        <div className='h-screen w-screen bg-gray-100 flex flex-col justify-center gap-3 items-center'>
            <div className='text-center'>
                <h1 className='text-9xl font-bold text-gray-800'>404</h1>
                <p className='text-2xl font-medium mt-4 text-gray-600'>Página não encontrada</p>
                <p className='mt-2 text-gray-500 my-4'>A página que você está procurando não existe ou foi movida.</p>
                <Link to="/my-account" className='px-4 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300'>
                    Voltar para a página inicial
                </Link>
            </div>
        </div>
    );
};

export default NotFoundScreen;