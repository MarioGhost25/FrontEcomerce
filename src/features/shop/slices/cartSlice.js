import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        quantity: 0,
        totalPrice: 0,

    },
    reducers: {

        addToCart: (state, action) =>{
            const { item, quantity, price } = action.payload; //desestructuramos el payload para obtener el item, la cantidad y el precio
            const normalizedPrice = Number(String(price).replace(/,/g, '')) || 0; // Convertimos el precio a número, eliminando comas si las hay
            const existingItem = state.items.find((cartItem) => cartItem.id === item.id); // Buscamos si el item ya existe en el carrito

            if (existingItem) {
                existingItem.quantity += quantity; // Si el item ya existe, aumentamos su cantidad
            } else {
                // Si el item no existe, lo agregamos al carrito con la cantidad y el precio normalizados
                state.items.push({ 
                    id: item.id,
                    name: item.name,
                    price: normalizedPrice,
                    quantity,
                });
            }

            // Actualizamos la cantidad total y el precio total del carrito
            state.quantity = state.items.reduce((acc, cartItem) => acc + cartItem.quantity, 0);
            // Calculamos el precio total sumando el precio de cada item multiplicado por su cantidad
            state.totalPrice = state.items.reduce(
                (acc, cartItem) => acc + cartItem.price * cartItem.quantity,
                0,
            );

                // Guardamos el estado del carrito en localStorage para persistencia
            localStorage.setItem('cartItems', JSON.stringify(state.items));
            
            


        }
        
    }


})

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;

export const selectCartItems = (state) => state.cart.items;