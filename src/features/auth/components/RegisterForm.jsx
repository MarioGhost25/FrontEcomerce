import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useRegisterMutation } from '../../../api/endpoints/userApi';
import { useForm } from '../../../hooks/useForm';
import { toast } from 'sonner';
import * as z from 'zod';
import { MailIcon, LockIcon, EyeIcon, EyeCloseIcon, ArrowRightIcon, UserIcon } from '../../../icons';

const registerSchema = z.object({
  name: z.string().trim().min(1, 'El nombre es requerido'),
  email: z.string().trim().email('Correo electronico invalido'),
  password: z.string().trim().min(8, 'La contraseña debe tener al menos 8 caracteres'),
  contactPhone: z.string().trim().min(1, 'El telefono es requerido').min(8, 'El telefono debe tener al menos 8 digitos'),
});

export const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [createRegister, { isLoading, error }] = useRegisterMutation();
  const navigate = useNavigate();

  const { name, email, password, contactPhone, onInputChange } = useForm({
    name: '',
    email: '',
    password: '',
    contactPhone: '',
  });

  const handleFieldChange = (e) => {
    onInputChange(e);


    if (fieldErrors[e.target.name]) {
      setFieldErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = { name, email, password, contactPhone };
    const validation = registerSchema.safeParse(userData);

    if (!validation.success) {
      const { fieldErrors: zodFieldErrors } = validation.error.flatten();
      setFieldErrors(zodFieldErrors);

      const firstError = Object.values(zodFieldErrors).flat().find(Boolean);
      toast.error(firstError || 'Revisa los campos del formulario');
      return;
    }

    setFieldErrors({});

    if (!acceptedTerms) {
      toast.error('Debes aceptar los términos y condiciones');
      return;
    }

    try {
      const res = await createRegister(validation.data).unwrap();

      if (res.accessToken) {
        localStorage.setItem('accessToken', JSON.stringify(res.accessToken));
        navigate('/');
      }

      toast.success('Usuario creado exitosamente ✅');

    } catch {
      toast.error(error?.data?.message || 'Error al crear el usuario ❌');
    }
  };

  return (


    <>

      {/* Abstract Background Decoration 
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-cyan-200/40 rounded-full blur-3xl -z-10 pointer-events-none"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-amber-200/60 rounded-full blur-3xl -z-10 pointer-events-none"></div>
      */}
      
      <div className="w-full max-w-[540px] bg-white rounded-xl sm:rounded-2xl shadow-xl border border-white/50 relative z-10 p-4 sm:p-8 overflow-hidden">
        {/* Left Side: Form */}
        <div className="max-w-md mx-auto w-full">
          <div className="mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Crear cuenta</h1>
            <p className="text-slate-500">Únete para ofertas exclusivas y seguimiento de pedidos.</p>
          </div>

          <form noValidate onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="name">
                Nombre completo
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <UserIcon className="w-5 h-5" />
                </div>
                <input
                  className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all outline-none"
                  id="name"
                  name="name"
                  placeholder="Juan Pérez"
                  type="text"
                  value={name}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              {fieldErrors.name?.[0] && (
                <p className="text-xs text-red-600">{fieldErrors.name[0]}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="email">
                Correo electrónico
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                  <MailIcon className="w-5 h-5" />
                </div>
                <input
                  className="w-full h-11 sm:h-12 pl-11 pr-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all outline-none"
                  id="email"
                  name="email"
                  placeholder="ejemplo@correo.com"
                  type="email"
                  value={email}
                  onChange={handleFieldChange}
                  required
                />
              </div>
              {fieldErrors.email?.[0] && (
                <p className="text-xs text-red-600">{fieldErrors.email[0]}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="password">
                Contraseña
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-teal-700 transition-colors">
                  <LockIcon className="w-5 h-5" />
                </div>
                <input
                  className="w-full h-11 sm:h-12 pl-11 pr-12 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all outline-none"
                  id="password"
                  name="password"
                  placeholder="Mínimo 8 caracteres"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handleFieldChange}
                  required
                  minLength={8}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
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
              {/* Password Strength Indicator (Simulated) */}
              <div className="flex gap-1 pt-1 h-1">
                <div className={`h-1 flex-1 rounded-full ${password.length >= 2 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${password.length >= 4 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${password.length >= 6 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
                <div className={`h-1 flex-1 rounded-full ${password.length >= 8 ? 'bg-green-500' : 'bg-slate-200'}`}></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Nivel de seguridad: {password.length < 4 ? 'Bajo' : password.length < 8 ? 'Medio' : 'Alto'}
              </p>
              {fieldErrors.password?.[0] && (
                <p className="text-xs text-red-600">{fieldErrors.password[0]}</p>
              )}
            </div>

            {/* Contact Phone Field */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-slate-700" htmlFor="contactPhone">
                Teléfono de contacto
              </label>
              <input
                className="w-full h-11 sm:h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:border-teal-700 focus:ring-2 focus:ring-teal-700/20 transition-all outline-none"
                id="contactPhone"
                name="contactPhone"
                placeholder="+1234567890"
                type="tel"
                value={contactPhone}
                onChange={handleFieldChange}
                required
              />
              {fieldErrors.contactPhone?.[0] && (
                <p className="text-xs text-red-600">{fieldErrors.contactPhone[0]}</p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start gap-3 pt-2">
              <div className="flex items-center h-5">
                <input
                  className="w-5 h-5 border-slate-300 rounded text-teal-700 focus:ring-teal-700/50 bg-slate-50"
                  id="terms"
                  type="checkbox"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
              </div>
              <label className="text-sm text-slate-600 select-none" htmlFor="terms">
                He leído y acepto los{' '}
                <a className="font-medium text-teal-700 hover:underline" href="#">
                  Términos del Servicio
                </a>{' '}
                y la{' '}
                <a className="font-medium text-teal-700 hover:underline" href="#">
                  Política de Privacidad
                </a>
                .
              </label>
            </div>

            {/* Submit Button */}
            <button
              className="w-full h-11 sm:h-12 mt-4 bg-teal-700 hover:bg-teal-800 active:scale-[0.98] text-white font-bold rounded-xl shadow-lg shadow-cyan-900/20 transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              type="submit"
              disabled={isLoading || !acceptedTerms}
            >
              <span>{isLoading ? 'Registrando...' : 'Registrarse'}</span>
              <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Social Login Divider 
                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-200"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-sm">O continúa con</span>
                  <div className="flex-grow border-t border-slate-200"></div>
                </div>

                {/* Social Buttons 
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className="h-11 flex items-center justify-center gap-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors bg-white text-slate-700 text-sm font-medium"
                    type="button"
                  >
                    <img
                      alt="Google Logo"
                      className="w-5 h-5"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBXhAkn5-nYNNhRzginr69gm_RI4PHW9rXj0Vx2_V64W308bLSTa5qzcqIvXbAF9HMUzRPuSPaFlE1d7R-8QBeasnpSsI3zApTvPX5DL_fSwYw47ZuW9c1NYn9o1PUNJdBbSC0O67gHuE2r1rKuBk_BP_2Rp5vBOMj7yhyr7C8bIT8DWSL2o3AtcV3NAvTzO87yQJEq0LxWp2gbmuPAnp7SlTMcEcdG5fjgyXIiMzolxgA_IDncm3GDhwxKilXRPdECOwvT3FH_XUjq"
                    />
                    Google
                  </button>
                  <button
                    className="h-11 flex items-center justify-center gap-2 rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors bg-white text-slate-700 text-sm font-medium"
                    type="button"
                  >
                    <img
                      alt="Facebook Logo"
                      className="w-5 h-5"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBmQx48DiVubboN35YIdwTExC-lsI7TMEsH1Dmty9Q0DYBBNGEm_LMw8_epbOFupFOgDnWTgjJIAia4_S_z98aMS-A9TmFjC8rGrLnNy1nlO3UBHhBkbjhDFQXUlFnpIoK6sWQER-VVyn3LOqqnc3zIbeZDI9rhIZFzj-sH3R1xRdQyH3_J_NeiMbnDsCQL_GK57O5MUELyYMOEzJmotswJCRc6O80DvMGrK0OSWPGyeQdwAtwFNtbP56XBjyryYRDkJm2gHh0mWj0m"
                    />
                    Facebook
                  </button>
                </div> */}
          </form>
        </div>
      </div>


      <div className="sm:hidden mt-8 text-center pb-8">
        <span className="text-sm text-slate-600">¿Ya tienes cuenta?</span>
        <Link to="/user" className="text-sm font-bold text-teal-700 ml-1">
          Iniciar Sesión
        </Link>
      </div>

    </>
  );
};
