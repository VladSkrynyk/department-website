// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//     baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
//     tagTypes: ["User"],
//     endpoints: (builder) => ({})
// });

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3500/api",
  }),
  tagTypes: ["Auth"],
  endpoints: () => ({}),
});
