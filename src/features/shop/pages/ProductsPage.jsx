import { Link } from 'react-router';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { FavoriteIcon, AddShoppingCartIcon, ChevronLeftIcon, CheckIcon, ChevronRightIcon, KeyArrowDownIcon } from '../../../icons';

const Products = () => {
  // Datos estáticos de productos
  const products = [
    {
      id: 1,
      name: 'Auriculares Premium Wireless Noise-Cancelling',
      price: '299.00',
      originalPrice: '349.99',
      description: 'Sonido de alta fidelidad con 30h de batería.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtLVf4NdoF5q0OSM_VHLN2mZ9w5GtIz9pkN7eFqctXZwCxeRieWtaHJtSQ74bPL42_b4UfdOWgKn-EczEeq1ZvwM6v-l3NsV3eZW3vldO5xNgeYEtt1TLJ8zxzynD_say68uxU6H8PkNbumts3mWBwtcv22K73ZadHHXZDAoxmwo-N0B6a6ZX23XnyuPsilYvISzDELpQpdf_Sa4WvTK-0Fvylaoqot2IlmEZ5-05_Ee1rA1OGQ2VncEuV6uhtrWOe7fWpQ-pTvN8',
      rating: 4.8,
      reviews: 120,
      badge: 'Nuevo',
    },
    {
      id: 2,
      name: 'Cámara Instantánea Retro Edition',
      price: '120.00',
      description: 'Captura momentos al instante con estilo vintage.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8PyvD9y-Hk4tQdApJ6X1j_Y-o5KxG0WPdJykCuxlDZxXzkg5Mlg7rESIRJccaQ_UhVIHhJHiBg7Fg6BycgCoJHVjdb7EQ7fo1Xlmgoivl49Lt1GC_taolU2PQgzdBCjyOFTLzMogHfxxaDaLAkgM_eFMiG4-0366u-VKGyiTOCg-0L45uBM7BiN4UOwsxHT-JdFBIulVyGZaY6IZW0S2_8o1rXIdRuKB4dpgwFp1dbh9JRxNE352QrNw8POfJo35rO2e5oUg241H3',
      rating: 4.9,
      reviews: 85,
      badge: '-15%',
      badgeColor: 'red-50',
      badgeTextColor: 'red-600',
    },
    {
      id: 3,
      name: 'Smartwatch Series 5 Sport',
      price: '199.50',
      description: 'Monitor de salud, GPS y resistente al agua.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDX7Zk_tfXVOc_9X8e9i70Y2VKzafhgm3gKkEHObMQLMXppjpY3UdA6AWCTa7yIFjDt-w1zkY7K_437J90jHM8CPbUkgT-4crvFZrfVVoY6aWqJkds6CX-Fx2R-eJhSV3xBdYNK0AbByZxh3zXLQZSDddHQS_oUttIVVH6abSOC4c_kUXAkJbks1Z2abnpE8mdiK5j58rb25HOJ7P-8YfiKqMVwFaO3pUVgzGbJ-w7HKqbM72sIyzPD4_7FZUnlKsr4BsD0gWw6WMGE',
      rating: 4.5,
      reviews: 42,
    },
    {
      id: 4,
      name: 'Laptop Ultrabook Pro 14"',
      price: '1,299.00',
      description: 'Potencia en un diseño ultra delgado y ligero.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVu_g0t8PboPs0AyOY86rmBS1iEEi75MXXTXqFbRmtcCQJG5X3xna0Yi1T1nAMhdpUUZ4pDLSkMDvPTCd_ktvDf0AyRXvM5x0b6T0q8Erjyk-XMkOul7mEdql-xBxwsjtoEyCpR1enkbW58P9CmHHDe4QfyTGrXmS6oGiJibZ0ijSFTScRnvWg5pmg6LMOPxIgethn8tkgZOaKN9bZXR_l-NCuRJX_fKseCG1qyZgJKDAyIvt6UAzjRn2U2GrtR8zGSCFmtsqfcaPA',
      rating: 5.0,
      reviews: 10,
    },
    {
      id: 5,
      name: 'Asistente de Voz Inteligente Home',
      price: '89.99',
      description: 'Controla tu hogar inteligente con tu voz.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAtygguOpPFysG69opjX9lOgV_HprJZK_YpDV2u23_kIjAqJ2Wgd8XsqihFLpVxJUoAwqDTOYwQ8YOk5NfqaajXRTFYr72GtVdv-EVs2W1ij4bxrB9TY34krI-T6YIeV2oKTpqwzsrCvUwWRTgnKrxT_2SqE9zn8qH9TGAd0BlNbqPkafVP87o1RlDcOjTsp9waE_6ui_hi-6dVCCYe4iZyxIiNt3wxryMB8V1sdrQlcgqJbPHWP7Mg62l6nMl_Tbh_tiOT0rR9wxdL',
      rating: 4.6,
      reviews: 210,
      badge: 'Popular',
    },
    {
      id: 6,
      name: 'Gafas de Realidad Virtual VR-X',
      price: '399.00',
      description: 'Sumérgete en nuevos mundos con 4K.',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDoy9_h2HMdNJh9uAp_llCoev13nZcsopqoHCMKmNl8YJGySM_qCKFfmU0KV_2ctxXnaoI6C7jaJ2vEoX999suU8WWdmpopfn3wfc8O3-bshnexhW-FJbDcHIUjk8QOA0k7qNJdJaVEHY39yVpmdCervuRhed5xH6nYpLene-8Hg8BPA_ZG4WF0DBNNv1CNAxBqSyFhNEdwG19VF9NhE6Tr8HTW1s_7O7FKqjEsl_97Yn7ms-FOLgVS3X30XlYE_RZrPTxFV-TMCGp4',
      rating: 4.7,
      reviews: 67,
    },
  ];

  return (
    <div className="bg-white text-gray-900 font-display min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 lg:px-10 py-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex mb-6 text-sm">
          <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
            <li className="inline-flex items-center">
              <Link className="inline-flex items-center text-gray-600 hover:text-teal-700 font-medium" to="/">
                Inicio
              </Link>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-gray-600 text-sm mx-1">chevron_right</span>
                <Link className="text-gray-600 hover:text-teal-700 font-medium" to="/products">
                  Catálogo
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-gray-600 text-sm mx-1">chevron_right</span>
                <span className="text-gray-900 font-semibold">Tecnología</span>
              </div>
            </li>
          </ol>
        </nav>

        {/* Page Heading */}
        <div className="mb-8 bg-gradient-to-r from-amber-100/50 to-transparent p-6 rounded-xl border border-amber-100">
          <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2 tracking-tight">Tecnología y Gadgets</h1>
          <p className="text-gray-600 max-w-2xl">
            Explora nuestra colección seleccionada de los dispositivos más innovadores del mercado. Calidad garantizada y los mejores precios.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            {/* Mobile Filter Toggle */}
            <button className="lg:hidden w-full flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg font-bold shadow-sm">
              <span>Filtrar y Ordenar</span>
              <span className="material-symbols-outlined">tune</span>
            </button>

            {/* Filters Container */}
            <div className="hidden lg:block bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg text-gray-900">Filtros</h3>
                <button className="text-xs text-teal-700 font-medium hover:underline">Limpiar todo</button>
              </div>

              {/* Category Filter */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Categorías</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input className="peer size-4 appearance-none rounded border border-gray-300 checked:bg-teal-700 checked:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:ring-offset-1 transition-colors" type="checkbox"/>
                      <span className="material-symbols-outlined flex justify-center items-center absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs inset-0 m-auto"><CheckIcon /></span>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">Smartphones</span>
                    <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">120</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input defaultChecked className="peer size-4 appearance-none rounded border border-gray-300 checked:bg-teal-700 checked:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:ring-offset-1 transition-colors" type="checkbox"/>
                      <span className="material-symbols-outlined flex justify-center items-center absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs inset-0 m-auto"><CheckIcon /></span>
                    </div>
                    <span className="text-sm text-gray-900 font-medium group-hover:text-teal-700 transition-colors">Laptops</span>
                    <span className="ml-auto text-xs text-teal-700 bg-amber-100 px-2 py-0.5 rounded-full font-bold">45</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input className="peer size-4 appearance-none rounded border border-gray-300 checked:bg-teal-700 checked:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:ring-offset-1 transition-colors" type="checkbox"/>
                      <span className="material-symbols-outlined flex justify-center items-center absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs inset-0 m-auto"><CheckIcon /></span>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">Accesorios</span>
                    <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">86</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input className="peer size-4 appearance-none rounded border border-gray-300 checked:bg-teal-700 checked:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:ring-offset-1 transition-colors" type="checkbox"/>
                      <span className="material-symbols-outlined flex justify-center items-center absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs inset-0 m-auto"><CheckIcon /></span>
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">Audio</span>
                    <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">32</span>
                  </label>
                </div>
              </div>

              {/* Price Filter */}
              <div className="mb-8">
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Precio</h4>
                <div className="flex items-center gap-2 mb-4">
                  <div className="relative w-full">
                    <span className="absolute left-2 top-2 text-gray-400 text-xs">$</span>
                    <input className="w-full pl-5 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-teal-700 focus:border-teal-700 bg-gray-50" type="number" defaultValue="100"/>
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative w-full">
                    <span className="absolute left-2 top-2 text-gray-400 text-xs">$</span>
                    <input className="w-full pl-5 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-teal-700 focus:border-teal-700 bg-gray-50" type="number" defaultValue="5000"/>
                  </div>
                </div>
                <input className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-700" type="range"/>
              </div>

              {/* Popularity/Rating Filter */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Popularidad</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="size-4 text-teal-700 focus:ring-teal-700 border-gray-300" name="rating" type="radio"/>
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined icon-filled text-[18px]">star</span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">& más</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="size-4 text-teal-700 focus:ring-teal-700 border-gray-300" name="rating" type="radio"/>
                    <div className="flex text-amber-400">
                      {[...Array(4)].map((_, i) => (
                        <span key={i} className="material-symbols-outlined icon-filled text-[18px]">star</span>
                      ))}
                      <span className="material-symbols-outlined text-gray-300 text-[18px]">star</span>
                    </div>
                    <span className="text-xs text-gray-500">& más</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Promo Card Sidebar */}
            <div className="hidden lg:block bg-amber-100 rounded-xl p-6 text-center">
              <div className="bg-white size-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-amber-600">
                <span className="material-symbols-outlined">local_shipping</span>
              </div>
              <h5 className="font-bold text-gray-900 mb-1">Envío Gratis</h5>
              <p className="text-xs text-gray-600 mb-3">En pedidos superiores a $999</p>
              <Link className="text-xs font-bold text-teal-700 hover:underline" to="#">Ver detalles</Link>
            </div>
          </aside>

          {/* Product Grid Area */}
          <div className="flex-1">
            {/* Sorting Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-bold text-gray-900">{products.length}</span> productos encontrados
              </p>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Ordenar por:</span>
                <div className="relative">
                  <select className="appearance-none bg-white border border-gray-200 text-gray-900 text-sm rounded-lg focus:ring-teal-700 focus:border-teal-700 block p-2 pr-8 cursor-pointer shadow-sm">
                    <option>Relevancia</option>
                    <option>Precio: Menor a Mayor</option>
                    <option>Precio: Mayor a Menor</option>
                    <option>Más recientes</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <span className="material-symbols-outlined text-sm"><KeyArrowDownIcon /></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-teal-700/30 transition-all duration-300 flex flex-col">
                  <div className="relative h-56 w-full bg-gray-100 overflow-hidden">
                    {product.badge && (
                      <div className={`absolute top-3 left-3 z-10 ${product.badgeColor === 'red-50' ? 'bg-red-50 text-red-600' : 'bg-amber-100 text-amber-800'} text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide`}>
                        {product.badge}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 z-10">
                      <button className="size-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                        <FavoriteIcon className="w-[18px] h-[18px]" />
                      </button>
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <img 
                        alt={product.name} 
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500" 
                        src={product.image}
                      />
                    </Link>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="material-symbols-outlined icon-filled text-amber-400 text-[14px]">star</span>
                      <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                      <span className="text-xs text-gray-400">({product.reviews})</span>
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-bold text-gray-900 leading-tight mb-1 group-hover:text-teal-700 transition-colors">
                        {product.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-gray-500 mb-3 line-clamp-1">{product.description}</p>
                    <div className="mt-auto pt-3 border-t border-gray-200 flex items-center justify-between">
                      <div>
                        {product.originalPrice && (
                          <span className="block text-xs text-gray-400 line-through">{product.originalPrice}</span>
                        )}
                        <span className="block text-lg font-black text-teal-700">${product.price}</span>
                      </div>
                      <button className="bg-teal-700 hover:bg-teal-800 text-white rounded-lg p-2 transition-colors flex items-center justify-center gap-2 shadow-sm">
                        <AddShoppingCartIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center gap-1 bg-white p-2 rounded-full shadow-sm border border-gray-200">
                <a className="flex size-9 items-center justify-center rounded-full text-gray-900 hover:bg-gray-100 transition-colors" href="#">
                  <ChevronLeftIcon className="w-5 h-5" />
                </a>
                <a className="flex size-9 items-center justify-center rounded-full bg-teal-700 text-white font-bold text-sm shadow-md" href="#">1</a>
                <a className="flex size-9 items-center justify-center rounded-full text-gray-900 hover:bg-amber-100 hover:text-teal-700 font-medium text-sm transition-colors" href="#">2</a>
                <a className="flex size-9 items-center justify-center rounded-full text-gray-900 hover:bg-amber-100 hover:text-teal-700 font-medium text-sm transition-colors" href="#">3</a>
                <span className="flex size-9 items-center justify-center rounded-full text-gray-400 font-medium text-sm">...</span>
                <a className="flex size-9 items-center justify-center rounded-full text-gray-900 hover:bg-amber-100 hover:text-teal-700 font-medium text-sm transition-colors" href="#">12</a>
                <a className="flex size-9 items-center justify-center rounded-full text-gray-900 hover:bg-gray-100 transition-colors" href="#">
                  <ChevronRightIcon className='w-5 h-5  '/>
                </a>
              </nav>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Products;

