
import { Register } from './register'
import { Login } from './login'
import { useState } from 'react'

export const User = () => {
    const [isMoved, setIsMoved] = useState(false);

    const changeState = () => {
        setIsMoved(!isMoved);

    };

    return (
        <div
            className={`flex justify-evenly items-center relative h-auto w-auto before:w-[448px] before:h-[550px] 
         before:bg-amber-100 before:shadow-xl before:absolute before:z-0 before:left-0 before:-top-15 before:rounded-3xl
         
         before:transition-all before:duration-500 before:ease-in-out
        ${isMoved ? 'before:translate-x-[448px]' : 'before:translate-x-0'}
        `}
            onClick={(e) => {
                // Verifica si el click fue directamente en el contenedor y no en un hijo
                if (e.target === e.currentTarget) {
                    changeState(!isMoved);
                }
            }}
        >
            <Login />
            <Register />
        </div >
    )
}
