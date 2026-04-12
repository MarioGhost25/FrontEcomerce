
import { apiSlice } from "../apiSlice";


export const categoryApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        

        createCategory: builder.mutation({
            query: (categoryData) => ({
                url: '/category',
                method: 'POST',
                body: categoryData
            }),
            invalidatesTags: ['Category']
        }),

        getAllCategories: builder.query({
            query: () => '/category',
            providesTags: ['Category']
        }),

    })

})

export const {
    useCreateCategoryMutation,
    useGetAllCategoriesQuery,
} = categoryApi;