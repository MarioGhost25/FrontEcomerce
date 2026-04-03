import { Link } from 'react-router';
import { useRef } from 'react';
import { SlidersHorizontal, Star } from 'lucide-react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import { FavoriteIcon, AddShoppingCartIcon, ChevronLeftIcon, CheckIcon, ChevronRightIcon, KeyArrowDownIcon, LocalShippingIcon } from '../../../icons';
import { useGetProductQuery } from '../../../api/endpoints/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../shop/slices/cartSlice';
import { useAddProductsMutation, useCreateShopingCartMutation } from '../../../api/endpoints/shoping-cart.api';
import { selectCurrentUserId } from '../../auth/slices/authSlice';

const CART_ID_STORAGE_KEY = 'shoppingCartId';
const INVALID_CART_IDS = new Set(['', 'undefined', 'null']);

const Products = () => {
  // Datos estáticos de productos
  const { data: products = [], isLoading, isError } = useGetProductQuery();
  console.log(products)

  const [CreateShopingCart] = useCreateShopingCartMutation();
  const [AddProducts] = useAddProductsMutation();
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);
  const creatingCartPromiseRef = useRef(null);

  const createCartOnce = async (product) => {
    const existingCartId = String(localStorage.getItem(CART_ID_STORAGE_KEY) ?? '').trim();
    if (!INVALID_CART_IDS.has(existingCartId)) return existingCartId;

    if (!creatingCartPromiseRef.current) {
      const productId = product?._id ?? product?.id;

      if (!userId || !productId) {
        return null;
      }

      const payload = {
        user: userId,
        products: [
          {
            product: productId,
            quantity: 1,
          },
        ],
      };

      creatingCartPromiseRef.current = CreateShopingCart(payload)
        .unwrap()
        .then((response) => {
          const cartId =
            response?.id ??
            response?._id ??
            response?.cartId ??
            response?.cart?.id ??
            response?.cart?._id;

          if (cartId) {
            localStorage.setItem(CART_ID_STORAGE_KEY, String(cartId));
          }

          return cartId ?? true;
        })
        .finally(() => {
          creatingCartPromiseRef.current = null;
        });
    }
    return creatingCartPromiseRef.current;
  };

  const addProductsToCart = (product) => {
    const { id } = product;

    const payload = {
        user: userId,
        products: [
          {
            product: id,
            quantity: 1,
          },
        ],
      };

    return creatingCartPromiseRef.current = AddProducts(payload).unwrap();

  }

  const handleShoppingCart = async (product) => {
    try {
      const cartId = localStorage.getItem(CART_ID_STORAGE_KEY);
      if(!cartId) {
        await createCartOnce(product);
        dispatch(addToCart({ product: product, quantity: 1}));
        return;
      }
      addProductsToCart(product);
      return dispatch(addToCart({ product: product, quantity: 1}));
      
    } catch(error) {
      // Keep local cart UX responsive even if backend cart sync fails
      console.log(error);
    }
  };

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
                <ChevronRightIcon className="text-gray-600 text-sm mx-1" />
                <Link className="text-gray-600 hover:text-teal-700 font-medium" to="/products">
                  Catálogo
                </Link>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <ChevronRightIcon className="text-gray-600 text-sm mx-1" />
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
              <SlidersHorizontal className="h-5 w-5" />
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
                      <input className="peer size-4 appearance-none rounded border border-gray-300 checked:bg-teal-700 checked:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:ring-offset-1 transition-colors" type="checkbox" />
                      <CheckIcon className="flex justify-center items-center absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs inset-0 m-auto" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">Smartphones</span>
                    <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">120</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input defaultChecked className="peer size-4 appearance-none rounded border border-gray-300 checked:bg-teal-700 checked:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:ring-offset-1 transition-colors" type="checkbox" />
                      <CheckIcon className="flex justify-center items-center absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs inset-0 m-auto" />
                    </div>
                    <span className="text-sm text-gray-900 font-medium group-hover:text-teal-700 transition-colors">Laptops</span>
                    <span className="ml-auto text-xs text-teal-700 bg-amber-100 px-2 py-0.5 rounded-full font-bold">45</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input className="peer size-4 appearance-none rounded border border-gray-300 checked:bg-teal-700 checked:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:ring-offset-1 transition-colors" type="checkbox" />
                      <CheckIcon className="flex justify-center items-center absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs inset-0 m-auto" />
                    </div>
                    <span className="text-sm text-gray-600 group-hover:text-teal-700 transition-colors">Accesorios</span>
                    <span className="ml-auto text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">86</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <div className="relative flex items-center">
                      <input className="peer size-4 appearance-none rounded border border-gray-300 checked:bg-teal-700 checked:border-teal-700 focus:ring-1 focus:ring-teal-700 focus:ring-offset-1 transition-colors" type="checkbox" />
                      <CheckIcon className="flex justify-center items-center absolute text-white opacity-0 peer-checked:opacity-100 pointer-events-none text-xs inset-0 m-auto" />
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
                    <input className="w-full pl-5 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-teal-700 focus:border-teal-700 bg-gray-50" type="number" defaultValue="100" />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative w-full">
                    <span className="absolute left-2 top-2 text-gray-400 text-xs">$</span>
                    <input className="w-full pl-5 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:ring-teal-700 focus:border-teal-700 bg-gray-50" type="number" defaultValue="5000" />
                  </div>
                </div>
                <input className="w-full h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-teal-700" type="range" />
              </div>

              {/* Popularity/Rating Filter */}
              <div>
                <h4 className="text-sm font-bold text-gray-900 mb-3 uppercase tracking-wider">Popularidad</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="size-4 text-teal-700 focus:ring-teal-700 border-gray-300" name="rating" type="radio" />
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-[18px] w-[18px] icon-filled text-amber-400" fill="currentColor" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">& más</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input className="size-4 text-teal-700 focus:ring-teal-700 border-gray-300" name="rating" type="radio" />
                    <div className="flex text-amber-400">
                      {[...Array(4)].map((_, i) => (
                        <Star key={i} className="h-[18px] w-[18px] icon-filled text-amber-400" fill="currentColor" />
                      ))}
                      <Star className="h-[18px] w-[18px] text-gray-300" fill="currentColor" />
                    </div>
                    <span className="text-xs text-gray-500">& más</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Promo Card Sidebar */}
            <div className="hidden lg:block bg-amber-100 rounded-xl p-6 text-center">
              <div className="bg-white size-12 rounded-full flex items-center justify-center mx-auto mb-3 shadow-sm text-amber-600">
                <LocalShippingIcon className="w-6 h-6" />
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
                      <KeyArrowDownIcon className="text-sm" />
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
                    )
                    }
                    <div className="absolute top-3 right-3 z-10">
                      <button className="size-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm">
                        <FavoriteIcon className="w-5 h-5" />
                      </button>
                    </div>
                    <Link to={`/products/${product.id}`}>
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        src={product.images}
                      />
                    </Link>
                  </div>
                  <div className="p-4 flex flex-col flex-grow">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-[14px] w-[14px] icon-filled text-amber-400" fill="currentColor" />
                      <span className="text-xs font-bold text-gray-900">{product.rating}</span>
                      {/* <span className="text-xs text-gray-400">({product.reviews})</span> */}
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
                      <button
                        className="bg-teal-700 hover:bg-teal-800 text-white rounded-lg p-2 transition-colors flex items-center justify-center gap-2 shadow-sm"
                        onClick={() => handleShoppingCart(product)}
                      >
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
                  <ChevronRightIcon className='w-5 h-5  ' />
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