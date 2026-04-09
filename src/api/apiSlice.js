// src/app/api/apiSlice.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { logout, setCredentials } from '../features/auth/slices/authSlice';

const baseUrl = 'https://ecommerce-node-2a381861ec33.herokuapp.com/eco';
//const baseUrl = 'http://localhost:2000/eco';

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

const getHttpStatus = (error) => {
  if (!error) return null;

  if (typeof error.status === 'number') {
    return error.status;
  }

  if (typeof error.originalStatus === 'number') {
    return error.originalStatus;
  }

  return null;
};

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (getHttpStatus(result?.error) === 401) {
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
      const refreshStatus = getHttpStatus(refreshResult?.error);

      // Only log out when refresh is explicitly unauthorized/forbidden.
      if (refreshStatus === 401 || refreshStatus === 403) {
        api.dispatch(logout());
      }
    }
  }

  return result;
};

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Cart'],
  endpoints: () => ({}),
});
