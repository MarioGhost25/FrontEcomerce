import { useState } from "react";
import { useForm } from "../../../hooks/useForm";
import { useLoginMutation } from "../../../api/endpoints/userApi";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import { MailIcon, LockIcon, EyeIcon, EyeCloseIcon, StoreIcon } from "../../../icons";
import * as z from 'zod';


const loginSchema = z.object({
    email: z.string().trim().email({ message: 'Correo electronico invalido' }),
    password: z.string().trim().min(8, { message: 'La contraseña debe tener al menos 8 caracteres' }),
});

export const Login = () => {
    const [fieldErrors, setFieldErrors] = useState({})
    const [showPassword, setShowPassword] = useState(false);
    const [loginUser, { isLoading }] = useLoginMutation();
    const navigate = useNavigate();

    const { email, password, onInputChange } = useForm({
        email: '',
        password: '',
    });

    const handleFieldChange = (e) => {
        onInputChange(e);


        if (fieldErrors[e.target.name]) {
            setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userData = { email, password };
        const validation = loginSchema.safeParse(userData);

        if (!validation.success) {
            const { fieldErrors: zodFieldErrors } = validation.error.flatten();
            setFieldErrors(zodFieldErrors);

            const firstError = Object.values(zodFieldErrors).flat().find(Boolean);
            toast.error(firstError || 'Revisa los campos del formulario');
            return;
        }

        setFieldErrors({});

        try {

            const res = await loginUser(validation.data).unwrap();
            console.log(res.user)
            const accessToken = res?.accessToken ?? res?.token;
            const user = res?.user;

            user?.role === 'admin' ? navigate('/dashboard') : navigate('/');

            console.log('Token recibido:', accessToken);

        } catch (error) {
            toast.error(error?.data?.message || 'Error al iniciar sesión❌');
        }
    };

    return (
        <>
            {/* Abstract Decoration Background
                <div className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px] opacity-40 pointer-events-none"></div>
                <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[30%] bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div> */}

            {/* Login Card */}
            <div className="w-full max-w-[440px] bg-white rounded-xl sm:rounded-2xl shadow-xl border border-white/50 relative z-10 overflow-hidden">
                {/* Card Header */}
                <div className="pt-6 sm:pt-10 pb-2 px-4 sm:px-8 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Bienvenido de nuevo</h1>
                    <p className="text-gray-600 text-xs sm:text-sm">Ingresa tus credenciales para acceder a tu cuenta.</p>
                </div>

                {/* Form Container */}
                <div className="p-4 sm:p-8">
                    <form noValidate onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                        {/* Email Field */}
                        <div className="space-y-2 group">
                            <label className="block text-sm font-semibold text-gray-900" htmlFor="email">
                                Correo Electrónico
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-700 transition-colors">
                                    <MailIcon className="w-5 h-5" />
                                </div>
                                <input
                                    className="block w-full pl-10 pr-3 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-teal-700 focus:ring-1 focus:ring-teal-700 placeholder:text-gray-400 transition-all duration-200 text-gray-900"
                                    id="email"
                                    name="email"
                                    placeholder="ejemplo@correo.com"
                                    required
                                    type="email"
                                    value={email}
                                    onChange={handleFieldChange}
                                />
                            </div>
                            {fieldErrors.email?.[0] && (
                                <p className="text-xs text-red-600">{fieldErrors.email[0]}</p>
                            )}
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2 group">
                            <div className="flex justify-between items-center">
                                <label className="block text-sm font-semibold text-gray-900" htmlFor="password">
                                    Contraseña
                                </label>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-teal-700 transition-colors">
                                    <LockIcon className="w-5 h-5" />
                                </div>
                                <input
                                    className="block w-full pl-10 pr-10 py-2.5 sm:py-3 border border-gray-200 rounded-lg text-sm bg-gray-50 focus:bg-white focus:border-teal-700 focus:ring-1 focus:ring-teal-700 placeholder:text-gray-400 transition-all duration-200 text-gray-900"
                                    id="password"
                                    name="password"
                                    placeholder="••••••••"
                                    required
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={handleFieldChange}
                                />
                                <button
                                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-teal-700 transition-colors focus:outline-none"
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeCloseIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            {fieldErrors.password?.[0] && (
                                <p className="text-xs text-red-600">{fieldErrors.password[0]}</p>
                            )}
                            <div className="flex justify-end pt-1">
                                <Link to="/change-password" className="text-xs font-medium text-teal-700 hover:text-teal-800 hover:underline transition-colors">
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            className="w-full flex justify-center items-center py-2.5 sm:py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-700 transition-all duration-200 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Ingresando...' : 'Ingresar'}
                        </button>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">O continuar con</span>
                            </div>
                        </div>

                        {/* Social Login */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3">
                            <button
                                className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-xs sm:text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200"
                                type="button"
                            >
                                <img
                                    alt="Google Logo"
                                    className="w-4 h-4 sm:w-5 sm:h-5"
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDFOu649zNTJ_l1WuXiVXg5GkbOHTljh6_hmjMIUrEr3WQggp_M_wOdel54EvxUwGk9XtdcUaEPe3F8saS-Wh0X8Y3wCkEItSPagSX7WxpauW_INdfiaMkPkP7AasNa3jOLEk03tzgKH5RN3mQ39CQmYA-syPFaRYy2ALT-1EBHFN9Er4GTRWTAMycVoi2lqSJFiAFPR61COv-_KyhMREWo1nM2GMlBMWnc75EbyNM-zdg5q3a0F9mTOpwZu6ZJkH_JoL4VfBTsY9CV"
                                />
                                <span>Google</span>
                            </button>
                            <button
                                className="flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-2.5 border border-gray-200 rounded-lg bg-white text-xs sm:text-sm font-medium text-gray-900 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-200"
                                type="button"
                            >
                                <span className="material-symbols-outlined text-[18px] sm:text-[22px]">ios</span>
                                <span>Apple</span>
                            </button>
                        </div>
                    </form>
                </div>

                {/* Card Footer */}
                <div className="px-4 sm:px-8 py-4 sm:py-5 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-sm text-gray-600">
                        ¿No tienes una cuenta?{' '}
                        <Link to="/user" className="font-semibold text-teal-700 hover:text-teal-800 hover:underline transition-colors">
                            Regístrate aquí
                        </Link>
                    </p>
                </div>
            </div>



            {/* Trust Indicators / Footer Links */}
            <div className="hidden sm:flex absolute bottom-6 gap-4 sm:gap-6 text-xs text-gray-600/60">
                <Link to="#" className="hover:text-teal-700 transition-colors">Términos de Servicio</Link>
                <Link to="#" className="hover:text-teal-700 transition-colors">Política de Privacidad</Link>
                <Link to="#" className="hover:text-teal-700 transition-colors">Ayuda</Link>
            </div>

        </>
    );
};
