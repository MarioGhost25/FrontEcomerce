import { setCredentials } from "../../features/auth";
import { apiSlice } from "../apiSlice";

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
                    const userId = data?.id ?? data?.userId ?? data?.user?.id ?? data?.user?._id;
                    const accessToken = data?.accessToken ?? data?.token;
                    const cartId = data?.cartId ?? data?.user?.cartId ?? data?.cart?.id ?? data?.cart?._id;

                    if (userId && accessToken) {
                        dispatch(setCredentials({ userId, accessToken, cartId }));
                    } else {
                        console.warn('No se pudieron extraer credenciales del login:', data);
                    }
                } catch (err) {
                    console.log('Login failed:', err);
                }
            }
        }),

        refreshToken: builder.mutation({
            query: () => ({
                url: 'auth/refresh',
                method: 'POST',
            })
        }),

        logoutUser: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            })
        }),



        getUser: builder.query({
            query: (userId) => ({
                url: `/auth/${userId}`,
                method: 'GET'
            }),
            transformResponse: (response) => {
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

export const {
    useRegisterMutation,
    useLoginMutation,
    useRefreshTokenMutation,
    useLogoutUserMutation,
    useGetUserQuery,
    useUpdatePasswordMutation,
} = userApi;