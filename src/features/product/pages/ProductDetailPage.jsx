import { Link, useParams } from 'react-router';
import { ChevronRight, CircleCheck, Star } from 'lucide-react';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import Button from '../../../components/ui/Button';
import { AddShoppingCartIcon, FavoriteIcon } from '../../../icons';

const ProductDetail = () => {
  const { id } = useParams();
  
  // Datos estáticos del producto (en producción vendría de una API)
  const product = {
    id: id || 1,
    name: 'Auriculares Premium Wireless Noise-Cancelling',
    price: '299.00',
    originalPrice: '349.99',
    description: 'Sonido de alta fidelidad con cancelación de ruido activa. Batería de hasta 30 horas de duración. Diseño ergonómico y cómodo para uso prolongado.',
    longDescription: 'Estos auriculares premium ofrecen una experiencia de audio excepcional con tecnología de cancelación de ruido de última generación. Perfectos para viajes, trabajo o entretenimiento en casa.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtLVf4NdoF5q0OSM_VHLN2mZ9w5GtIz9pkN7eFqctXZwCxeRieWtaHJtSQ74bPL42_b4UfdOWgKn-EczEeq1ZvwM6v-l3NsV3eZW3vldO5xNgeYEtt1TLJ8zxzynD_say68uxU6H8PkNbumts3mWBwtcv22K73ZadHHXZDAoxmwo-N0B6a6ZX23XnyuPsilYvISzDELpQpdf_Sa4WvTK-0Fvylaoqot2IlmEZ5-05_Ee1rA1OGQ2VncEuV6uhtrWOe7fWpQ-pTvN8',
    rating: 4.8,
    reviews: 120,
    inStock: true,
    stock: 15,
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-10 py-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="flex mb-6 text-sm">
          <ol className="inline-flex items-center space-x-2">
            <li>
              <Link className="text-gray-600 hover:text-teal-700 font-medium" to="/">
                Inicio
              </Link>
            </li>
            <li>
              <ChevronRight className="text-gray-600 text-sm mx-1" />
            </li>
            <li>
              <Link className="text-gray-600 hover:text-teal-700 font-medium" to="/products">
                Productos
              </Link>
            </li>
            <li>
              <ChevronRight className="text-[#637f88] text-sm mx-1" />
            </li>
            <li>
              <span className="text-gray-900 font-semibold">{product.name}</span>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-square rounded-xl overflow-hidden bg-gray-100">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 icon-filled text-amber-400" fill="currentColor" />
                  ))}
                </div>
                <span className="text-sm font-bold text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-400">({product.reviews} reseñas)</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4">
              {product.originalPrice && (
                <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
              )}
              <span className="text-4xl font-black text-teal-700">${product.price}</span>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed">{product.description}</p>
            <p className="text-gray-600 leading-relaxed">{product.longDescription}</p>

            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${product.inStock ? 'text-green-600' : 'text-red-600'}`}>
                {product.inStock ? `En stock (${product.stock} disponibles)` : 'Agotado'}
              </span>
            </div>

            <div className="flex gap-4 pt-4">
              <Button className="flex-1 h-14 text-lg">
                <AddShoppingCartIcon className="mr-2 w-5 h-5" />
                Agregar al Carrito
              </Button>
              <button className="size-14 rounded-lg border border-gray-300 hover:bg-gray-50 flex items-center justify-center">
                <FavoriteIcon className="text-gray-600 w-6 h-6" />
              </button>
            </div>

            <div className="pt-6 border-t border-gray-200">
              <h3 className="font-bold text-lg mb-4">Características</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center gap-2">
                  <CircleCheck className="text-teal-700 text-sm" />
                  Cancelación de ruido activa
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck className="text-teal-700 text-sm" />
                  Batería de 30 horas
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck className="text-teal-700 text-sm" />
                  Carga rápida USB-C
                </li>
                <li className="flex items-center gap-2">
                  <CircleCheck className="text-teal-700 text-sm" />
                  Compatible con Bluetooth 5.0
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;

