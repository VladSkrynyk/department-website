// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//     baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500" }),
//     tagTypes: ["User"],
//     endpoints: (builder) => ({})
// });

//ver2
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// export const apiSlice = createApi({
//   reducerPath: "api",
//   baseQuery: fetchBaseQuery({
//     baseUrl: "http://localhost:3500/api",
//   }),
//   tagTypes: ["Auth"],
//   endpoints: () => ({}),
// });
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3500/api",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token; // Припустимо, що токен зберігається в Redux у `auth.token`
    if (token) {
      console.log(token);
      
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Auth", "Personalities"],
  endpoints: () => ({}),
});
