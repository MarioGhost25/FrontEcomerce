import { useRef } from 'react';
import { useGetProductQuery } from '../../../api/endpoints/productApi';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../shop/slices/cartSlice';
import { useAddProductsMutation, useCreateShopingCartMutation } from '../../../api/endpoints/shoping-cart.api';
import { selectCurrentCartId, selectCurrentUserId, setIdcart } from '../../auth/slices/authSlice';
import { useCategories } from '../../category/hooks/useCategories';
import { toast } from 'sonner';

export const useProducts = () => {
  const { data: products = [], isLoading, isError, error } = useGetProductQuery();
  const { categories } = useCategories();
  const [CreateShopingCart] = useCreateShopingCartMutation();
  const [AddProducts] = useAddProductsMutation();
  const dispatch = useDispatch();
  const userId = useSelector(selectCurrentUserId);
  const cartIdFromState = useSelector(selectCurrentCartId);
  const creatingCartPromiseRef = useRef(null);
  
  const errorMessage =
    typeof error?.data === 'string'
      ? error.data
      : error?.data?.message || error?.error || 'No se pudieron cargar los productos.'
  const normalizeCartId = (value) => {
    if (value === null || value === undefined) {
      return null;
    }

    const normalizedValue = String(value).trim();
    return !normalizedValue || normalizedValue === 'null' || normalizedValue === 'undefined'
      ? null
      : normalizedValue;
  };

  const createCartOnce = async (product) => {

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
            dispatch(setIdcart({ cartId }));
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

    creatingCartPromiseRef.current = AddProducts(payload)
      .unwrap()
      .finally(() => {
        creatingCartPromiseRef.current = null;
      });

    return creatingCartPromiseRef.current;

  }

  const handleShoppingCart = async (product) => {
    try {
      const cartId = normalizeCartId(cartIdFromState ?? localStorage.getItem('cartId'));
      if (!cartId || cartId === 'null') {
        await createCartOnce(product);
        dispatch(addToCart({ product: product, quantity: 1 }));
        return;
      }

      await addProductsToCart(product);
      toast.success('Producto agregado al carrito');
      return dispatch(addToCart({ product: product, quantity: 1 }));

    } catch {
      // Keep local cart UX responsive even if backend cart sync fails
      return null;
    }
  };

  return {
    products,
    categories,
    isLoading, 
    isError,
    errorMessage,
    handleShoppingCart,
    
  }
}
