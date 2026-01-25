
import { apiSlice } from "./apiSlice";


export const productApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        createProduct: builder.mutation({
            query: (productData) => ({
                url: '/products',
                method: 'POST',
                body: productData
            })
        }),

        getProduct: builder.query({
            query: () => '/products',
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/products/${productId}`,
                method: 'DELETE'
            })

        })

    })

})

export const { useCreateProductMutation, useGetProductQuery, useDeleteProductMutation} = productApi;