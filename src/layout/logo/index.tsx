import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <div className='flex flex-row'>
            <Link to="/">
                <h1 className='uppercase'>
                    <span className='font-thin'>PIX</span>
                    <span className='font-semibold'>Node</span>
                </h1>
            </Link>
        </div>
    );
}