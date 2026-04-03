import { Link } from 'react-router';
import { Globe, MessageCircle, ShoppingBag } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white py-16">
      <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <ShoppingBag className="size-8" strokeWidth={2.2} />
              <h2 className="text-2xl font-black">E-Store</h2>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Tu tienda en línea de confianza. Ofrecemos calidad, estilo y los mejores precios del mercado.
            </p>
            <div className="flex gap-4">
              <a className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" href="#">
                <Globe className="size-4" strokeWidth={2.2} />
              </a>
              <a className="size-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors" href="#">
                <MessageCircle className="size-4" strokeWidth={2.2} />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Comprar</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              <li><Link className="hover:text-white hover:underline" to="/products">Nuevos Ingresos</Link></li>
              <li><Link className="hover:text-white hover:underline" to="/products">Ofertas</Link></li>
              <li><Link className="hover:text-white hover:underline" to="/products">Accesorios</Link></li>
              <li><Link className="hover:text-white hover:underline" to="#">Tarjetas de Regalo</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Ayuda</h3>
            <ul className="flex flex-col gap-3 text-sm text-white/80">
              <li><Link className="hover:text-white hover:underline" to="#">Estado del Pedido</Link></li>
              <li><Link className="hover:text-white hover:underline" to="#">Envíos y Entregas</Link></li>
              <li><Link className="hover:text-white hover:underline" to="#">Devoluciones</Link></li>
              <li><Link className="hover:text-white hover:underline" to="#">Contacto</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Suscríbete</h3>
            <p className="text-sm text-white/80 mb-4">Recibe las últimas noticias y ofertas especiales.</p>
            <div className="flex gap-2">
              <input 
                className="flex-1 rounded-lg bg-white/10 border-none text-white placeholder:text-white/50 text-sm px-4 focus:ring-2 focus:ring-accent-light" 
                placeholder="Tu email" 
                type="email"
              />
              <button className="bg-accent-light text-primary font-bold px-4 py-2 rounded-lg hover:bg-white transition-colors">
                Ok
              </button>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-white/60">
          <p>© 2024 E-Store Inc. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <Link className="hover:text-white" to="#">Privacidad</Link>
            <Link className="hover:text-white" to="#">Términos</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

