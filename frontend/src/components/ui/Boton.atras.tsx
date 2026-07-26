import { useNavigate } from 'react-router-dom';

export function BotonAtras () {
    const navigate = useNavigate();
    return (
        <button className="cursor-pointer transition-transform duration-500 hover:scale-105" onClick={() => navigate('/')}>
            <span className={`fa-solid fa-arrow-left text-black text-2xl`}></span>
        </button>
    );
}