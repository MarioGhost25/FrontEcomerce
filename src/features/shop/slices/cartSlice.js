import { createSlice } from "@reduxjs/toolkit";


export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalPrice: 0,

    },
    // reducers:{
    //     addToCart: (state, action){
    //         const item = action.payload;
          
            
    //     }
    // }
})