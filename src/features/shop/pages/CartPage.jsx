import { Link } from 'react-router';
import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react';
import { useAddProductsMutation, useDecreaseQuantityMutation, useDeleteProductsMutation, useGetCartbyIdQuery } from '../../../api/endpoints/shoping-cart.api';
import Navbar from '../../../components/layout/Navbar';
import Footer from '../../../components/layout/Footer';
import Button from '../../../components/ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems, setCartFromServer } from '../slices/cartSlice';
import { useEffect } from 'react';

const Cart = () => {

  const dispatch = useDispatch();
  const [addProductsToCart, { isLoading: isAddingProduct }] = useAddProductsMutation();
  const [deleteProducts] = useDeleteProductsMutation();
  const [decreaseQuantity] = useDecreaseQuantityMutation();
  const { data, isLoading, refetch } = useGetCartbyIdQuery() //Mi unica fuente de la verdad
  const products = useSelector(selectCartItems);

  useEffect(() => {
    if (data?.products) {
      dispatch(setCartFromServer(data));
    }
  }, [data, dispatch]);



  const handledQuantity = async (item) => {
    const { product } = item;
    const productId = product?._id || product?.product?._id || product?.product?._id;

    if (!productId) return;

    const payload = {
      products: [
        {
          product: productId,
          quantity: 1,
        },
      ]
    };

    // Optimistic UI: actualiza cantidad y total al instante.
    dispatch(addToCart({ product: products, quantity: 1 }));

    try {
      await addProductsToCart(payload).unwrap();
      const refreshed = await refetch();
      const cartSnapshot = refreshed?.data;

      if (Array.isArray(cartSnapshot?.products)) {
        dispatch(setCartFromServer(cartSnapshot));
      }

    } catch (error) {
      console.error('Error al aumentar la cantidad:', error);

      // Rollback de estado optimista usando snapshot del backend.
      const refreshed = await refetch();
      const cartSnapshot = refreshed?.data;
      if (Array.isArray(cartSnapshot?.products)) {
        dispatch(setCartFromServer(cartSnapshot));
      }

    }

  }
  const handleDecreaseQuantity = async (item) => {
    if(item.quantity === 1 ) return handleRemoveProduct(item);
    const { product } = item;
    const payload = {
      products: [
        {
          _id: product?._id,
          quantity: 1,
        },
      ]
    };

    try {

      await decreaseQuantity(payload).unwrap();

      const refreshed = await refetch();
      const cartSnapshot = refreshed?.data;

      if (Array.isArray(cartSnapshot?.products)) {
        dispatch(setCartFromServer(cartSnapshot));
      }
    } catch (error) {
      console.error('Error al disminuir la cantidad:', error);

      // Rollback de estado optimista usando snapshot del backend.
      const refreshed = await refetch();
      const cartSnapshot = refreshed?.data;
      if (Array.isArray(cartSnapshot?.products)) {
        dispatch(setCartFromServer(cartSnapshot));
      }

    }


  }

  const handleRemoveProduct = async (item) => {
    try {

      const { product } = item;

      const payload = {
        products: [
          {
            _id: item?._id || product?._id,
          },
        ]
      };

      await deleteProducts(payload).unwrap();

      const refreshed = await refetch();
      const cartSnapshot = refreshed?.data;

      if (Array.isArray(cartSnapshot?.products)) {
        dispatch(setCartFromServer(cartSnapshot));
      }

    } catch (error) {
      console.error('Error al eliminar producto del carrito:', error);
    }
  }



  const getCartItemKey = (item, index) => {
    return item?._id ?? item?.id ?? item?.product?._id ?? item?.product?.id ?? `cart-item-${index}`;
  };



  const subtotal = products.reduce((sum, item) => {
    const linePrice = Number(item?.price ?? item?.product?.price ?? 0);
    return sum + linePrice * Number(item?.quantity ?? 0);
  }, 0);
  const shipping = subtotal > 50 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 lg:px-10 py-8">
        <h1 className="text-3xl font-black text-text-main mb-8">Carrito de Compras</h1>

        {isLoading ? (
          <div className="grid lg:col-span-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 2 }).map((_, index) => (
              <div key={index} className="aspect-[4/5] animate-pulse rounded-xl bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-4 mx-auto" />
            <p className="text-xl text-gray-500 mb-4">Tu carrito está vacío</p>
            <Link to="/products">
              <Button className="w-full h-12 mb-4">Continuar Comprando</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {products.map((item, index) => (
                <div key={getCartItemKey(item, index)} className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6">
                  <div className="w-24 h-24 rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    <img src={item.product?.images} alt={item.product?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between ">
                    <div>
                      <h3 className="font-bold text-lg text-[#111618] mb-2">{item.product?.name}</h3>
                      <p className="text-primary font-bold text-xl">${Number(item?.price ?? item?.product?.price ?? 0).toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-4 mt-4 sm:flex-row flex-col">
                      <div className="flex items-center gap-2 border border-gray-300 rounded-lg">
                        <button
                          onClick={() => handleDecreaseQuantity(item)}
                          className="px-3 py-1 hover:bg-gray-100"><Minus size={20} color='#000' /></button>
                        <span className="px-4 py-1 text-black">{item.quantity}</span>
                        <button
                          disabled={isAddingProduct}
                          onClick={() => handledQuantity(item)}
                          className="px-3 py-1 hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <Plus size={20} color='#000' />
                        </button>
                      </div>
                      <button
                        onClick={() => handleRemoveProduct(item)}
                        className="text-red-500 bg-red-100 hover:text-red-700 flex items-center gap-1">
                        <Trash2 className="h-4 w-4" />
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

