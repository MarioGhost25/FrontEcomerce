

import { useState } from 'react'
import { Star, StoreIcon } from 'lucide-react';
import { Login } from '../components/LoginForm';
import { Register } from '../components/RegisterForm';
import { Link } from 'react-router';

export const User = () => {
    const [isMoved, setIsMoved] = useState(false);
    const changeState = () => {
        setIsMoved((prev) => !prev);
    };

    const testimonialText = '"La mejor experiencia de compra online que he tenido. La ropa es de excelente calidad y el envío fue rapidísimo."';
    const testimonialImage = 'https://lh3.googleusercontent.com/aida-public/AB6AXuBjoqOZLsYYAum-OhCbq3i-pK7FqYswX6HPbL0tUH8XRVZE7ztgw6e-xCiuL6SjmYJKpljDXm19L1tsrZSKlU6DuwKgCHlEakmD0lrZQ5IjCLSkWV_7qGsbRwLJmxd7QviBnKQ1U955zXm-98Axi0A77Z47aSKfWOkN0T9gF0HlSDGDN_iw290uw0q__KoRoh3eRcHqvxiPXaFAgU5vhsGH33ALA6wLK3IMHM_mtcmp0lZG8buDK2OYTuLdnjUl5g2g19wN41dujXq-';

    const TestimonialContent = ({ compact = false }) => (
        <div className={compact ? 'p-6 sm:p-8 text-white z-10' : 'p-8 lg:p-12 xl:p-16 text-white z-10'}>
            <div className={compact ? 'bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 mb-6 shadow-2xl' : 'bg-white/10 backdrop-blur-md p-4 lg:p-6 rounded-2xl border border-white/20 mb-6 lg:mb-8 shadow-2xl'}>
                <div className="flex items-center gap-2 text-amber-300 mb-2">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 icon-filled text-amber-300" fill="currentColor" />
                    ))}
                </div>
                <p className={compact ? 'text-sm sm:text-base font-medium leading-relaxed italic' : 'text-base lg:text-lg font-medium leading-relaxed italic'}>
                    {testimonialText}
                </p>
                <div className="mt-4 flex items-center gap-3">
                    <img
                        alt="Retrato de cliente feliz"
                        className="w-10 h-10 rounded-full object-cover border-2 border-white/30"
                        src={testimonialImage}
                    />
                    <div>
                        <p className="text-sm font-bold">Sofía Martínez</p>
                        <p className="text-xs text-cyan-100">Cliente Verificado</p>
                    </div>
                </div>
            </div>

            <h2 className={compact ? 'text-xl sm:text-2xl font-bold mb-2' : 'text-2xl lg:text-3xl font-bold mb-2'}>
                Empieza tu estilo hoy
            </h2>
            <p className={compact ? 'text-cyan-100 text-sm sm:text-base' : 'text-cyan-100 text-base lg:text-lg'}>
                Descubre las últimas tendencias con un 10% de descuento en tu primera compra al registrarte.
            </p>
        </div>
    );

    const desktopPanelBaseClass = 'hidden lg:flex absolute z-30 items-center rounded-2xl w-[600px] h-[750px] bg-gradient-to-t from-teal-700 to-amber-100 shadow-xl transition-all duration-500 ease-in-out';
    const mobilePanelClass = 'absolute left-1/2 z-30 flex w-[600px] h-[750px] -translate-x-1/2 items-center rounded-2xl bg-gradient-to-t from-teal-700 to-amber-100 shadow-xl transition-all duration-500 ease-in-out lg:hidden';



    return (
        <div className="font-display min-h-screen flex flex-col text-gray-900 antialiased">
            {/* Navbar (Simplified for Login Context) */}
            <header className="fixed top-0 z-10 flex w-full items-center justify-between border-b border-gray-100 bg-white/80 px-8 py-4 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                    <div className="size-8 text-teal-700">
                        <StoreIcon className="w-8 h-8" />
                    </div>
                    <Link to="/">
                        <h2 className="text-xl font-black leading-tight tracking-[-0.015em] text-teal-700">E-Store</h2>
                    </Link>
                </div>
                <Link to="/" className="text-sm font-medium text-gray-600 transition-colors hover:text-teal-700">
                    Volver a la tienda
                </Link>
            </header>

            <main className="relative flex flex-grow items-start justify-center gap-3 overflow-hidden p-4 pt-20 sm:p-6 sm:pt-24 lg:items-center">
                <div
                    className={`${desktopPanelBaseClass} ${isMoved ? 'translate-x-[-310px]' : 'translate-x-[300px]'}`}
                    onClick={(e) => {
                        // Solo alterna el panel cuando el click fue en el panel mismo.
                        if (e.target === e.currentTarget) {
                            changeState();
                        }
                    }}
                >
                    <TestimonialContent />
                </div>

                {/* Layout responsive: stack en móvil, lado a lado en desktop */}
                <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-y-10 lg:flex-row lg:gap-6">
                    <div
                        className={`${mobilePanelClass} ${isMoved ? 'translate-y-[-400px]' : 'translate-y-[374px]'}`}
                        onClick={changeState}
                    >
                        <TestimonialContent compact />

                    </div>

                    <div className="relative z-20 flex w-full justify-center">
                        <Login isMoved={isMoved} setIsMoved={setIsMoved} />
                    </div>
                    <div className="relative z-20 flex w-full justify-center">
                        <Register />
                    </div>
                </div>
            </main >
        </div >
    )
}
