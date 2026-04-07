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

        decreaseQuantity: builder.mutation({
            query: (decreaseQuantityData) => ({
                url: '/shopping/decrease-products-quantity',
                method: 'PATCH',
                body: decreaseQuantityData
            }),
            invalidatesTags: ['Cart']
           
        }),

        deleteProducts: builder.mutation({
            query: (deleteProductsData) => ({
                url: '/shopping/delete-products',
                method: 'DELETE',
                body: deleteProductsData
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

export const { 
    useCreateShopingCartMutation, 
    useAddProductsMutation, 
    useDecreaseQuantityMutation, 
    useDeleteProductsMutation, 
    useGetCartbyIdQuery 
} = shopingCartApi;