import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


export const userApi = createApi({

    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://e-commerce.politewave-a8066950.eastus.azurecontainerapps.io/eco/auth',
        prepareHeaders: (headers) =>{
            const token = localStorage.getItem('token');
            if(token){
                headers.set('authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: '/register',
                method: 'POST',
                body: user
            })
        }),

        login: builder.mutation({
            query: (user) => ({
                url: '/login',
                method: 'POST',
                body: user,
            })
        }),

    })

})

export const {useRegisterMutation, useLoginMutation} = userApi;