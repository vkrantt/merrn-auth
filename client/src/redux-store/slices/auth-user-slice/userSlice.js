import { apiSlice } from "../apiSlice";
const USERS_URI = "/api/users";

export const usersAPIslice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URI}/auth`,
        method: "POST",
        credentials: 'include',
        body: data,
      }),
    }),
    createUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URI}/`,
        method: "POST",
        credentials: 'include',
        body: data,
      }),
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URI}/update`,
        method: "POST",
        credentials : 'include',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URI}/logout`,
        method: "POST",
        credentials : 'include',
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useCreateUserMutation,
  useUpdateProfileMutation,
} = usersAPIslice;
