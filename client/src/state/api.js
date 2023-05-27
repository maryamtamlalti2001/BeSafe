import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_BASE_URL }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Admins",
    "Airquality",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getAdmins: build.query({
      query: () => "management/admins",
      providesTags: ["Admins"],
    }),
    getAir: build.query({
      query: () => "api/airquality",
      providesTags: ["Airquality"],
    }),
    

})
})

export const{
  useGetUserQuery,
  useGetAdminsQuery,
  useGetAirQuery,
}= api;

