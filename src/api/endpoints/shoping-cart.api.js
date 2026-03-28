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

        getCartbyId: builder.query({
            queryFn: async (id, _api, _extraOptions, baseQuery) => {
                const normalizedId = String(id ?? '').trim();

                if (!normalizedId || normalizedId === 'undefined' || normalizedId === 'null') {
                    return {
                        error: {
                            status: 'CUSTOM_ERROR',
                            error: 'Missing shopping cart id',
                        },
                    };
                }

                return baseQuery({
                    url: `/shopping/${normalizedId}`,
                    method: 'GET',
                });
            }
        })
    })
})

export const { useCreateShopingCartMutation, useGetCartbyIdQuery } = shopingCartApi;