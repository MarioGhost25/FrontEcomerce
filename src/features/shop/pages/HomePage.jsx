import { Link } from 'react-router';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import Button from '../../../components/ui/Button';
import ProductGrid from '../components/ProductGrid';
import { ArrowRightIcon, CheckCircleIcon, LocalShippingIcon, SupportAgentIcon, VerifiedIcon } from '../../../icons';

const Home = () => {
  // Datos estáticos para productos destacados
  const featuredProducts = [
    {
      id: 1,
      name: 'Auriculares Pro',
      price: '120.00',
      description: 'Audio de alta fidelidad',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDlXShRZaOdpZVyFQVpvh4yee8-ElST19cVOQbU85l8QAAgov5zRO4fyjLacxZqyt4krgcXQVt-KdgVjJQLf_IRCxdMsFGKBQqVxiQQdJMQtHss_21r89cUMiLe3EJl5FDk9Tii-V04bzAmEgYjJvKib0D9QO7TV0mgBDpuj1CKWyXT95Y3kn_Q2ChfCXCmLW7tngJZkMT5pZXy2OpnSpyKpBSlr1zjUJqbnYl5fPFB10aTH7hCFt2fBj7LqWYBopy5D6tyFh6dIeLu',
    },
    {
      id: 2,
      name: 'Smart Watch V2',
      price: '250.00',
      description: 'Monitor de salud avanzado',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPoyLcefsM5NW-xLzuQrVxmhiizEwQX94lXXYxXx3q9usr-HHL-1IwYgD-OWao2iikQ0OeC1fOrDJRGuc6awwvZRunIl87khFClad_502OwwO5r6hWdfZVI4gUDpt-bTKtiXUn_CaRCsGWgtOR74IrF1ef0DxF9AAM5Qvo47J5YIXL2V-mTqgQKwsLrwf3TLvl89AHAYAAz0Oy2g9IrQg1opRd6MaqqGwml8WlnqDHYhcPW4YqKSIqkmWfNQ4TzstMWzEYL8xnT1kO',
    },
    {
      id: 3,
      name: 'Mochila Urbana',
      price: '85.00',
      description: 'Resistente al agua',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9rI39zLbZle6dXcZvlboUMsaf7TwKPtBP6jWR9Ckm3ZT0LoRWkxCD5wmF7xOU1r86wl0HaSlyftcnEblWYjwucxIkL-mb7zDp-r4TTx7LKtgWfAwO5DZfAFSdlaucnopupjoj6oEWrXWyW3gBH54EHYNQBRJ3PcG-0hcu9xy0vv2BalaFllq5HXg2V-7_4XbKDju9S2wNiIOsdE7WW7NdL6TggUJWQOa8h5HvAId-UdshRxeTeM3wrLctzbKHD61a-7FqXomRCn7c',
    },
    {
      id: 4,
      name: 'Zapatillas Runner',
      price: '95.00',
      description: 'Comodidad superior',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBLZi09JO8Zo1CwjwQIJdyMwM9NS7SfBfzMQ8FPZlyo_eSv8AA1JK_GaL3Ke4hhYii9UspFnQwh3dhfpQ_5fEGGZCtACieAGTsLrhGIvbhN07XlrP8qv-AKipENhY58WoHXbgNMj4vHap7snB6sLraLTwg2ReiQwF3aXVUXJPQUN6CuK8mq31QjvEtT7Zm5RzGdoWpDuGxJIZ5QMJ1iCTBnbn3xVNQY-RHmF_qwfVRIcKO62x5-ZM2JVc1X0xmuOeszGK6ipQx5QU5H',
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden">
      <Navbar />
      
      <main className="flex-1 flex flex-col">
        {/* Hero Section */}
        <section className="relative w-full px-6 py-12 md:px-12 lg:px-40 bg-accent-light/50">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              <div className="flex flex-col gap-6 lg:w-1/2 items-start text-left z-10">
                <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-semibold text-primary shadow-sm ring-1 ring-slate-100">
                  <span className="block size-2 rounded-full bg-primary animate-pulse"></span>
                  Nueva Colección 2024
                </div>
                <h1 className="text-text-main text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight">
                  Descubre el Estilo que <span className="text-primary">Te Define</span>
                </h1>
                <p className="text-text-muted text-lg sm:text-xl font-normal leading-relaxed max-w-lg">
                  La mejor selección de productos modernos con envíos rápidos a todo el país. Calidad garantizada en cada compra.
                </p>
                <div className="flex flex-wrap gap-4 pt-2">
                  <Link to="/products">
                    <Button className="h-12 px-8 transform hover:-translate-y-0.5">
                      Explorar Productos
                    </Button>
                  </Link>
                  <Button variant="secondary" className="h-12 px-8">
                    Ver Ofertas
                  </Button>
                </div>
                {/* Trust badges small */}
                <div className="flex items-center gap-6 pt-4 text-sm font-medium text-text-muted">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]"><VerifiedIcon /></span>
                    <span>Garantía de calidad</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[20px]"><LocalShippingIcon /></span>
                    <span>Envío Gratis &gt; $50</span>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 relative group">
                <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-accent-light rounded-2xl blur-xl opacity-70 group-hover:opacity-100 transition duration-500"></div>
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl shadow-2xl bg-white">
                  <div 
                    className="w-full h-full bg-center bg-no-repeat bg-cover transform transition duration-700 hover:scale-105" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuA3GobaC7OohONRlfa3TcAtf-aXIf8e7DoSqUYMgNbNkFCmizBUE6L0E-mKFDvyLdpdcs35Z9wBo29_Gt7AzZEBZc2ErXTGmKEXL3mi1w9v7jN5bJWOQVZg4tgJ9TaHjC3h6Y--8jnd6H-l9iCN9Vi0EnbeYS1EG-NqjVQvRt5bw-KbLcqqYBOY7Ec0u4v5KtXqeTVI6ez8tqmnQkGV2ZO-NL_habqfCnjayBa1DPv_UieUZR4iu5iDwxZR2KP-gwyzJZ1L_yLoIpd3")' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-40">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center gap-4 p-6 rounded-xl hover:bg-accent-light/30 transition-colors">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-4xl"><LocalShippingIcon /></span>
                </div>
                <h3 className="text-xl font-bold text-text-main">Envíos Rápidos</h3>
                <p className="text-text-muted">Recibe tus productos en 24-48 horas en todo el territorio nacional.</p>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 rounded-xl hover:bg-accent-light/30 transition-colors">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-4xl"><SupportAgentIcon /></span>
                </div>
                <h3 className="text-xl font-bold text-text-main">Soporte 24/7</h3>
                <p className="text-text-muted">Nuestro equipo está disponible para ayudarte en cualquier momento.</p>
              </div>
              <div className="flex flex-col items-center gap-4 p-6 rounded-xl hover:bg-accent-light/30 transition-colors">
                <div className="size-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
                  <span className="material-symbols-outlined text-4xl"><VerifiedIcon /></span>
                </div>
                <h3 className="text-xl font-bold text-text-main">Compra Segura</h3>
                <p className="text-text-muted">Tus pagos están protegidos con la más alta seguridad bancaria.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-20 bg-accent-light/30">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-40">
            <div className="flex items-end justify-between mb-10">
              <div>
                <h2 className="text-primary text-3xl font-black tracking-tight mb-2">Categorías Populares</h2>
                <p className="text-text-muted">Explora nuestras colecciones más buscadas</p>
              </div>
              <Link className="hidden sm:flex items-center gap-1 text-primary font-bold hover:underline" to="/products">
                Ver todas <span className="material-symbols-outlined text-sm"><ArrowRightIcon /></span>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Category 1 */}
              <Link className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-md" to="/products">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuB0Vn1eD4mbshSTWnW4TKCzvCcAclE8T2EqH2zbHI3p8znVxXVlCG49EFwWAzU4GcYReq4TvoAbnDY8BhzGsWFfi68bXnZO1ABYrPd8ocldraomeqzuTO2O_VXjNGTIAyATXyKNmMaKI_IqP_bcxbv6oOqb69GI-BcLgwrNuFID6HQjw8SaALdV-2YU9nQYPRq2lFLAPHLxqYA-dqirOVzB2oJxmBfIpCXn8NvAwIoNu4JiOShfrPF6YmrFNc6RI3nzg-Ojp2lkOIcw")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white text-xl font-bold mb-1">Tecnología</h3>
                  <div className="flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Explorar <span className="material-symbols-outlined text-sm ml-1"><ArrowRightIcon /></span>
                  </div>
                </div>
              </Link>
              {/* Category 2 */}
              <Link className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-md" to="/products">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAtrUzTTqgOTTxtLOJ-2wdOS3RWzvb-iyArLXX9WjW3DLKzWt-FaGs4MhcMFa3klUoVJxWWDWiTbpESyOPjlMaR2G5NgcaMIqM0aKBcUI35YkbAduVjlBnzHHKs4cWZh1x_6PKcZXMzNJfmU1RtxTxQlI60hYytqiDMxz-dB6mcFWYf8POYtBawwBUVWcEcqaPnKERtugRew04fXfd0fEv9DqNA1hJFi0DLEqd9fUkHXz-pIpkePDGjCso3FOikbEN6LMfyx7KoO1nE")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white text-xl font-bold mb-1">Moda</h3>
                  <div className="flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Explorar <span className="material-symbols-outlined text-sm ml-1"><ArrowRightIcon /></span>
                  </div>
                </div>
              </Link>
              {/* Category 3 */}
              <Link className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-md" to="/products">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuClJmvI2idr4WFFWdoCAZINc1wjxr7Z1DOCWCN-3FO0Q-FPAP1kOTaEHmI_JpJ0mT5bemVKfIvqMx-G5NeZGGjtOiQ1ecCVdV5oCWXMAjgnJqtMF-7cER9E_BJTewWBsI27oNneP_He-PCZPk8NhszOVM4Xt0gltnVibUoJMzKkPp5wrh0j84_19FiFk7LCa4_eZ_n2JcCosHOfpQjHfDqHYVIflJzTIOq335VcT7EXvQN9RMaUF3asRU59D_RSnMcjZuxyh13T0RsT")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white text-xl font-bold mb-1">Hogar</h3>
                  <div className="flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Explorar <span className="material-symbols-outlined text-sm ml-1"><ArrowRightIcon /></span>
                  </div>
                </div>
              </Link>
              {/* Category 4 */}
              <Link className="group relative overflow-hidden rounded-xl aspect-[4/5] shadow-md" to="/products">
                <div 
                  className="absolute inset-0 bg-cover bg-center transition duration-500 group-hover:scale-110" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBXjrHVQMdzbw8US9OsZ24U8mDGM6XtljXiRIhMLZeJjmOGm8ltPgakNlk1enzsxIq4a1bnX_IPaXGfAQCnplq7q0T1eSYa_lBLlvH8EizsRdokVXNAqT4XEuI1t6GWtuAMEWDbVx-OimuaCpLlGCuMgyRz6_8a55kE8lp3NrwKbjj0FRWe-CoQCkA3TzhLWzroeyTCy6MHbWMPDm_-1vFnQO8JJCz7ELaNbWJDBJZABlwuXPbRNNGi_kh3lbyFrDujo5VBK5CZ_0mp")' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-6 w-full">
                  <h3 className="text-white text-xl font-bold mb-1">Deportes</h3>
                  <div className="flex items-center text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                    Explorar <span className="material-symbols-outlined text-sm ml-1"><ArrowRightIcon /></span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-40">
            <h2 className="text-primary text-3xl font-black tracking-tight mb-8">Productos Destacados</h2>
            <ProductGrid products={featuredProducts} />
            <div className="mt-12 flex justify-center">
              <Link to="/products">
                <Button variant="outline" className="px-6 py-3">
                  Ver todos los productos
                  <span className="material-symbols-outlined ml-2"><ArrowRightIcon /></span>
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;

