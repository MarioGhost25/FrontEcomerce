import { Link } from 'react-router';
import { useSelector } from 'react-redux';
import { useGetCartbyIdQuery } from '../../../api/endpoints/shoping-cart.api';
import { ShoppingCartIcon } from '../../../icons';
//import { selectCartId } from '../slices/cartSlice';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import Button from '../../../components/ui/Button';

const Cart = () => {

  // const selectCardStorage = useSelector(selectCartId)
  // const { data: cartItems } = useGetCartbyIdQuery(selectCardStorage)
  // console.log('Cart Items:', cartItems);
  // Datos estáticos del carrito
  const cartItems = [
  // {
  //   id: 1,
  //   name: 'Auriculares Premium Wireless',
  //   price: '299.00',
  //   quantity: 1,
  //   image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBqtLVf4NdoF5q0OSM_VHLN2mZ9w5GtIz9pkN7eFqctXZwCxeRieWtaHJtSQ74bPL42_b4UfdOWgKn-EczEeq1ZvwM6v-l3NsV3eZW3vldO5xNgeYEtt1TLJ8zxzynD_say68uxU6H8PkNbumts3mWBwtcv22K73ZadHHXZDAoxmwo-N0B6a6ZX23XnyuPsilYvISzDELpQpdf_Sa4WvTK-0Fvylaoqot2IlmEZ5-05_Ee1rA1OGQ2VncEuV6uhtrWOe7fWpQ-pTvN8',
  // },
  // {
  //   id: 2,
  //   name: 'Smart Watch V2',
  //   price: '250.00',
  //   quantity: 1,
  //   image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBPoyLcefsM5NW-xLzuQrVxmhiizEwQX94lXXYxXx3q9usr-HHL-1IwYgD-OWao2iikQ0OeC1fOrDJRGuc6awwvZRunIl87khFClad_502OwwO5r6hWdfZVI4gUDpt-bTKtiXUn_CaRCsGWgtOR74IrF1ef0DxF9AAM5Qvo47J5YIXL2V-mTqgQKwsLrwf3TLvl89AHAYAAz0Oy2g9IrQg1opRd6MaqqGwml8WlnqDHYhcPW4YqKSIqkmWfNQ4TzstMWzEYL8xnT1kO',
  // },
  ];

 const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-10 py-8">
        <h1 className="text-3xl font-black text-text-main mb-8">Carrito de Compras</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-16">
            <span className="material-symbols-outlined text-6xl text-gray-300 mb-4"><ShoppingCartIcon /></span>
            <p className="text-xl text-gray-500 mb-4">Tu carrito está vacío</p>
            <Link to="/products">
              <Button className="w-full h-12 mb-4">Continuar Comprando</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-bold text-lg text-[#111618] mb-2">{item.name}</h3>
                      <p className="text-primary font-bold text-xl">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                        <button className="px-3 py-1 hover:bg-gray-100">-</button>
                        <span className="px-4 py-1">{item.quantity}</span>
                        <button className="px-3 py-1 hover:bg-gray-100">+</button>
                      </div>
                      <button className="text-red-500 hover:text-red-700 flex items-center gap-1">
                        <span className="material-symbols-outlined text-sm"></span>
                        Eliminar
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6 sticky top-24">
                <h2 className="font-bold text-xl text-[#111618] mb-6">Resumen del Pedido</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-[#637f88]">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[#637f88]">
                    <span>Envío</span>
                    <span>{shipping === 0 ? 'Gratis' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="pt-4 border-t border-gray-200 flex justify-between font-bold text-lg text-[#111618]">
                    <span>Total</span>
                    <span className="text-primary">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Button className="w-full h-12 mb-4">
                  Proceder al Pago
                </Button>
                <Link to="/products">
                  <Button variant="secondary" className="w-full h-12">
                    Continuar Comprando
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;

