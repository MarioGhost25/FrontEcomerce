import { apiSlice } from "../apiSlice";


export const shopingCartApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({

        createShopingCart: builder.mutation({
            query: (shopingCartData) => ({
                url: '/shopping',
                method: 'POST',
                body: shopingCartData
            }),
            invalidatesTags: ['Cart']
        }),

        addProducts: builder.mutation({
            query: (addProductsData) => ({
                url: '/shopping/add-products',
                method: 'POST',
                body: addProductsData
            }),
            invalidatesTags: ['Cart']
        }),

        getCartbyId: builder.query({
            query: () => ({
                url: 'shopping/get-cart-by-user-id',
                method: 'GET',
            }),
            providesTags: ['Cart']
        })
    }),

})

export const { useCreateShopingCartMutation, useAddProductsMutation, useGetCartbyIdQuery } = shopingCartApi;