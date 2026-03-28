import { Link } from 'react-router';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import Button from '../../../components/ui/Button';

const ResetPassword = () => {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
            <div className="text-center mb-8">
              <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-primary text-3xl">lock_reset</span>
              </div>
              <h1 className="text-3xl font-black text-text-main mb-2">Restablecer Contraseña</h1>
              <p className="text-text-muted">
                Ingresa tu email y te enviaremos un enlace para restablecer tu contraseña
              </p>
            </div>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-text-main mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
                  placeholder="tu@email.com"
                />
              </div>

              <Button className="w-full h-12 text-lg">
                Enviar Enlace de Recuperación
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/user" className="text-sm text-primary font-bold hover:underline">
                ← Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ResetPassword;

