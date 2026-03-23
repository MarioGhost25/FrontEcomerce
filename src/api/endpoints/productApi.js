
import { apiSlice } from "../apiSlice";


export const productApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        uploadProductImage: builder.mutation({
            query: (formdata) => ({
                url: '/image/upload',
                method: 'POST',
                body: formdata
            })
        }),

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

export const {
    useUploadProductImageMutation,
    useCreateProductMutation,
    useGetProductQuery,
    useDeleteProductMutation
} = productApi;