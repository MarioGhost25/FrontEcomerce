import { apiSlice } from "./apiSlice";
import { setCredentials } from '../slices/authSlice';

export const userApi = apiSlice.injectEndpoints({

    endpoints: (builder) => ({
        register: builder.mutation({
            query: (user) => ({
                url: 'auth/register',
                method: 'POST',
                body: user
            })
        }),

        login: builder.mutation({
            query: (credentials) => ({
                url: 'auth/login',
                method: 'POST',
                body: credentials,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log('Login response data:', data);
                    // Asumiendo que el backend devuelve { userId, token, ...rest }
                    dispatch(setCredentials({ 
                        userId: data.id, 
                        token: data.token 
                    }));
                } catch (err) {
                    console.log('Login failed:', err);
                }
            }
        }),

        getUser: builder.query({
            query: (userId) => ({
                url: `/auth/${userId}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
                console.log('Response from getUser:', response);
                // Asegurarnos de que siempre devolvemos un objeto con role
                return {
                    ...response,
                    // Si el backend devuelve user.role, lo usamos, si no, ponemos 'user'
                    role: response?.role || response?.user?.role || 'user'
                };
            },
            providesTags: ['User']
        }),

        updatePassword: builder.mutation({
            query: (passwordData) => ({
                url: 'auth/update-password',
                method: 'PUT',
                body: passwordData,   
            })
        })

    })

})

export const { useRegisterMutation, useLoginMutation, useGetUserQuery, useUpdatePasswordMutation } = userApi;