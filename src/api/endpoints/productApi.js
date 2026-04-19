import { apiSlice } from "../apiSlice";


export const productApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        uploadProductImage: builder.mutation({
            query: (formdata) => ({
                url: '/image/upload',
                method: 'POST',
                body: formdata
            }),
            invalidatesTags: ['Products']
        }),

        createProduct: builder.mutation({
            query: (productData) => ({
                url: '/products',
                method: 'POST',
                body: productData
            }),
            invalidatesTags: ['Products']
        }),

        updateProduct: builder.mutation({
            query: (productData) => ({
                url: `/products/${productData.id}`,
                method: 'PUT',
                body: productData
            })
        }),

        getProduct: builder.query({
            query: () => '/products',
            providesTags: ['Products']
        }),

        getProductById: builder.query({
            query: (id) => `/products/${id}`,
            providesTags: ['Products']
        }),

        deleteProduct: builder.mutation({
            query: ({ productId, category }) => ({
                url: `/products/${productId}/${category}`,
                method: 'DELETE'   
            }),
            invalidatesTags: ['Products']
            

        })

    })

})

export const {
    useUploadProductImageMutation,
    useCreateProductMutation,
    useUpdateProductMutation,
    useGetProductQuery,
    useGetProductByIdQuery,
    useDeleteProductMutation
} = productApi;