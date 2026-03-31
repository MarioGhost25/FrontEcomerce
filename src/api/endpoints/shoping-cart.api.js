import { apiSlice } from "../apiSlice";


export const shopingCartApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        createShopingCart: builder.mutation({
            query: (shopingCartData) => ({
                url: '/shopping',
                method: 'POST',
                body: shopingCartData
            })
        }),

        addProducts: builder.mutation({
            query: (addProductsData) => ({
                url: 'shopping/add-products',
                method: 'POST',
                body: addProductsData
            })
        }),

        getCartbyId: builder.query({
            query: () => ({
                url: 'shopping/get-cart-by-user-id',
                method: 'GET',
            })
        })
    }),

})

export const { useCreateShopingCartMutation, useAddProductsMutation, useGetCartbyIdQuery } = shopingCartApi;