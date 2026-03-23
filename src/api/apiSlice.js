// src/app/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../features/auth/slices/authSlice';

const baseUrl = 'https://ecommerce-node-2a381861ec33.herokuapp.com/eco';

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const accessToken = getState().auth?.accessToken;
    if (accessToken) {
      headers.set('authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    const refreshResult = await baseQuery(
      { url: 'auth/refresh', method: 'POST' },
      api,
      extraOptions,
    );

    const refreshData = refreshResult?.data;
    const refreshedAccessToken = refreshData?.accessToken ?? refreshData?.token;
    const refreshedUserId =
      refreshData?.id ??
      refreshData?.userId ??
      refreshData?.user?.id ??
      refreshData?.user?._id ??
      api.getState().auth?.userId;

    if (refreshedAccessToken) {
      api.dispatch(setCredentials({ userId: refreshedUserId, accessToken: refreshedAccessToken }));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});
