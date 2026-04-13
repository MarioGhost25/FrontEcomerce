import { useEffect } from 'react'; 
import { useAddProductsMutation, useDecreaseQuantityMutation, useDeleteProductsMutation, useGetCartbyIdQuery } from '../../../api/endpoints/shoping-cart.api';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems, setCartFromServer } from '../slices/cartSlice';
import { selectIsAuthenticated } from '../../auth/slices/authSlice';
import { toast } from 'sonner';

export const useCart = () => {

    const dispatch = useDispatch();
    const [addProductsToCart, { isLoading: isAddingProduct }] = useAddProductsMutation();
    const [deleteProducts] = useDeleteProductsMutation();
    const [decreaseQuantity] = useDecreaseQuantityMutation();
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const { data, isLoading, refetch } = useGetCartbyIdQuery(undefined, { skip: !isAuthenticated }) //Mi unica fuente de la verdad
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
        if (item.quantity === 1) return handleRemoveProduct(item);
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
            toast.success('Producto eliminado del carrito');

            const refreshed = await refetch();
            const cartSnapshot = refreshed?.data;

            if (Array.isArray(cartSnapshot?.products)) {
                dispatch(setCartFromServer(cartSnapshot));
            }

        } catch (error) {
            console.error('Error al eliminar producto del carrito:', error);
            toast.error('Error al eliminar producto del carrito');
        }
    }



    const getCartItemKey = (item, index) => {
        return item?._id ?? item?.id ?? item?.product?._id ?? item?.product?.id ?? `cart-item-${index}`;
    };


    return {
        products,
        isLoading,
        isAddingProduct,
        handledQuantity,
        handleDecreaseQuantity,
        handleRemoveProduct,
        getCartItemKey,
        refetch, 

    }

}
