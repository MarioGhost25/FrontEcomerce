

import { useState } from 'react'
import { StoreIcon } from '../icons';
import { Link } from 'react-router';
import { Login, Register } from '../features/auth';



export const User = () => {
    const [isMoved, setIsMoved] = useState(false);

    const changeState = () => {
        setIsMoved(!isMoved);

    };

    return (
        <>
            <div className="font-display  text-gray-900 antialiased min-h-screen flex flex-col">
                {/* Navbar (Simplified for Login Context) */}
                <header className="w-full py-4 px-8 flex justify-between items-center bg-white/80 backdrop-blur-sm fixed top-0 z-10 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                        <div className="size-8 text-teal-700">
                            <StoreIcon className="w-8 h-8" />
                        </div>
                        <Link to="/">
                            <h2 className="text-teal-700 text-xl font-black leading-tight tracking-[-0.015em]">E-Store</h2>
                        </Link>
                    </div>
                    <Link to="/" className="text-sm font-medium text-gray-600 hover:text-teal-700 transition-colors">
                        Volver a la tienda
                    </Link>
                </header>

                <main className="flex-grow flex items-center justify-center gap-3 p-4 sm:p-6 pt-20 sm:pt-24 relative overflow-hidden">
                    <div
                        className={`hidden lg:flex items-center bg-amber-100 bg-gradient-to-t from-teal-700 absolute z-50 rounded-2xl w-[600px] h-[750px] 
                            shadow-xl transition-all duration-500 ease-in-out
                            ${isMoved ? 'translate-x-[-348px]' : 'translate-x-[248px]'}
                            `}
                        onClick={(e) => {
                            // Verifica si el click fue directamente en el contenedor y no en un hijo
                            if (e.target === e.currentTarget) {
                                changeState(!isMoved);
                            }
                        }}
                    >
                        <div className="p-8 lg:p-12 xl:p-16 text-white z-10">
                            <div className="bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/20 mb-6 lg:mb-8 shadow-2xl">
                                <div className="flex items-center gap-2 text-amber-300 mb-2">
                                    {[...Array(5)].map((_, i) => (
                                        <span key={i} className="material-symbols-outlined icon-filled text-sm">star</span>
                                    ))}
                                </div>
                                <p className="text-base lg:text-lg font-medium leading-relaxed italic">
                                    "La mejor experiencia de compra online que he tenido. La ropa es de excelente calidad y el envío fue rapidísimo."
                                </p>
                                <div className="mt-4 flex items-center gap-3">
                                    <img
                                        alt="Retrato de cliente feliz"
                                        className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjoqOZLsYYAum-OhCbq3i-pK7FqYswX6HPbL0tUH8XRVZE7ztgw6e-xCiuL6SjmYJKpljDXm19L1tsrZSKlU6DuwKgCHlEakmD0lrZQ5IjCLSkWV_7qGsbRwLJmxd7QviBnKQ1U955zXm-98Axi0A77Z47aSKfWOkN0T9gF0HlSDGDN_iw290uw0q__KoRoh3eRcHqvxiPXaFAgU5vhsGH33ALA6wLK3IMHM_mtcmp0lZG8buDK2OYTuLdnjUl5g2g19wN41dujXq-"
                                    />
                                    <div>
                                        <p className="text-sm font-bold">Sofía Martínez</p>
                                        <p className="text-xs text-cyan-100">Cliente Verificado</p>
                                    </div>
                                </div>
                            </div>
                            <h2 className="text-2xl lg:text-3xl font-bold mb-2">Empieza tu estilo hoy</h2>
                            <p className="text-cyan-100 text-base lg:text-lg">
                                Descubre las últimas tendencias con un 10% de descuento en tu primera compra al registrarte.
                            </p>

                            
                        </div>

                    </div >
                    
                    {/* Layout responsive: stack en móvil, lado a lado en desktop */}
                    <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-6">
                        <Login />
                        <Register />
                    </div>
                </main>
            </div>
        </>
    )
}
