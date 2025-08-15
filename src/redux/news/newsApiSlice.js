import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../api/apiSlice";

const newsAdapter = createEntityAdapter();

const initialState = newsAdapter.getInitialState();

export const newsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNews: builder.query({
      query: () => "/news",
      validateStatus: (response, result) =>
        response.status === 200 && !result.isError,
      keepUnusedDataFor: 5,
      transformResponse: (responseData) => {
        console.log("News response:", responseData);

        if (Array.isArray(responseData.news)) {
          const loadedNews = responseData.news.map((item) => ({
            ...item,
            id: item._id, // для RTK Entity
          }));
          return newsAdapter.setAll(initialState, loadedNews);
        } else {
          console.error("Expected array of news but got:", responseData);
          return newsAdapter.setAll(initialState, []);
        }
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "News", id: "LIST" },
            ...result.ids.map((id) => ({ type: "News", id })),
          ];
        } else return [{ type: "News", id: "LIST" }];
      },
    }),
    
    addNews: builder.mutation({
      query: (newNewsData) => ({
        url: "/news/add",
        method: "POST",
        body: newNewsData,
        formData: true, // важливо для FormData!
      }),
      invalidatesTags: [{ type: "News", id: "LIST" }],
    }),
    deleteNews: builder.mutation({
      query: (id) => ({
        url: `/news/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: "News", id: "LIST" }],
    }),
    updateNews: builder.mutation({
      query: ({ id, data }) => ({
        url: `/news/update/${id}`,
        method: 'POST',
        body: data,
        formData: true,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "News", id: arg.id },
        { type: "News", id: "LIST" },
      ],
    }),

    // Інші запити типу add/update/delete — пізніше
  }),
});

export const {
  useGetNewsQuery,
  useAddNewsMutation,
  useDeleteNewsMutation,
  useUpdateNewsMutation,
} = newsApiSlice;

// Вибірка з state
export const selectNewsResult = newsApiSlice.endpoints.getNews.select();

const selectNewsData = createSelector(
  selectNewsResult,
  (newsResult) => newsResult.data ?? initialState
);

export const {
  selectAll: selectAllNews,
  selectById: selectNewsById,
  selectIds: selectNewsIds,
} = newsAdapter.getSelectors((state) => selectNewsData(state));
